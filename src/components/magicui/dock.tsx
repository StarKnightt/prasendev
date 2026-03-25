"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { PropsWithChildren, useRef, useEffect, useState, useCallback, useId } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full"
);

function smoothStep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function roundedRectSDF(px: number, py: number, hw: number, hh: number, r: number) {
  const qx = Math.abs(px) - hw + r;
  const qy = Math.abs(py) - hh + r;
  return Math.min(Math.max(qx, qy), 0) + Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2) - r;
}

function LiquidGlassFilter({ id, width, height }: { id: string; width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>("");
  const [scale, setScale] = useState(0);

  const generateDisplacementMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = width;
    const h = height;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = new Uint8ClampedArray(w * h * 4);
    const rawValues: number[] = [];
    let maxScale = 0;

    const aspectW = 0.48;
    const aspectH = 0.3;

    for (let i = 0; i < w * h; i++) {
      const x = i % w;
      const y = Math.floor(i / w);
      const uvx = x / w - 0.5;
      const uvy = y / h - 0.5;

      const dist = roundedRectSDF(uvx, uvy, aspectW, aspectH, 0.5);
      const displacement = smoothStep(0.6, 0, dist - 0.1);
      const scaled = smoothStep(0, 1, displacement);

      const dx = uvx * scaled * w;
      const dy = uvy * scaled * h;

      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5;

    let idx = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[idx++] / maxScale + 0.5;
      const g = rawValues[idx++] / maxScale + 0.5;
      data[i] = r * 255;
      data[i + 1] = g * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    ctx.putImageData(new ImageData(data, w, h), 0, 0);
    setDataUrl(canvas.toDataURL());
    setScale(maxScale);
  }, [width, height]);

  useEffect(() => {
    generateDisplacementMap();
  }, [generateDisplacementMap]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter
            id={id}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width={width}
            height={height}
          >
            {dataUrl && (
              <feImage
                xlinkHref={dataUrl}
                width={width}
                height={height}
                result="dispMap"
              />
            )}
            <feDisplacementMap
              in="SourceGraphic"
              in2="dispMap"
              xChannelSelector="R"
              yChannelSelector="G"
              scale={scale}
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref
  ) => {
    const mousex = useMotionValue(Infinity);
    const [isMobile, setIsMobile] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 400, height: 64 });
    const containerRef = useRef<HTMLDivElement>(null);
    const filterId = useId().replace(/:/g, "_") + "_glass";

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDimensions({
            width: Math.round(entry.contentRect.width) + 20,
            height: Math.round(entry.contentRect.height) + 20,
          });
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isMobile) {
        mousex.set(e.pageX);
      }
    };

    const handleMouseLeave = () => {
      if (!isMobile) {
        mousex.set(Infinity);
      }
    };

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            mousex,
            magnification,
            distance,
          } as DockIconProps);
        }
        return child;
      });
    };

    return (
      <>
        <LiquidGlassFilter
          id={filterId}
          width={dimensions.width}
          height={dimensions.height}
        />
        <motion.div
          ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          {...props}
          className={cn(dockVariants({ className }), "max-h-14 sm:max-h-none")}
          style={{
            backdropFilter: `url(#${filterId}) blur(16px) saturate(1.6) contrast(1.1) brightness(1.05)`,
            WebkitBackdropFilter: `url(#${filterId}) blur(16px) saturate(1.6) contrast(1.1) brightness(1.05)`,
            boxShadow:
              "0 4px 24px -4px rgba(0,0,0,0.12), inset 0 -1px 2px rgba(255,255,255,0.1), inset 0 1px 2px rgba(255,255,255,0.15)",
          }}
        >
          {renderChildren()}
        </motion.div>
      </>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mousex?: any;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mousex,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMotionValue = useMotionValue(Infinity);
  const actualMousex = mousex || defaultMotionValue;

  const distanceCalc = useTransform(actualMousex, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        "max-sm:hover:*:scale-100 sm:hover:*:scale-110",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
