"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, {
  PropsWithChildren,
  useRef,
  useEffect,
  useState,
  useId,
} from "react";

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

/**
 * Only Chromium applies SVG filters inside backdrop-filter.
 * Safari (incl. every iOS browser) and Firefox get the frosted-blur fallback.
 */
function supportsLiquidGlass(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isFirefox = /firefox|fxios/i.test(ua);
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari =
    /safari/i.test(ua) && !/chrome|chromium|crios|edg|opr|android/i.test(ua);
  return !isFirefox && !isIOS && !isSafari;
}

/**
 * Builds a displacement map shaped like a convex lens for the pill:
 * neutral gray (no refraction) in the center, with the bend concentrated
 * along the rim — red encodes X offset, green encodes Y offset.
 */
function generateLensMap(width: number, height: number): string | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const image = ctx.createImageData(width, height);
  const data = image.data;

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2;
  const hw = Math.max(width / 2 - radius, 0);
  const hh = Math.max(height / 2 - radius, 0);
  const rimWidth = radius * 1.1;

  let i = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5 - cx;
      const py = y + 0.5 - cy;

      // signed distance to the pill border (negative inside)
      const qx = Math.abs(px) - hw;
      const qy = Math.abs(py) - hh;
      const dist =
        Math.min(Math.max(qx, qy), 0) +
        Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
        radius;

      // 0 deep inside -> 1 at the border, smoothstep-eased
      let rim = 0;
      if (dist > -rimWidth) {
        const t = Math.min(Math.max(1 + dist / rimWidth, 0), 1);
        rim = t * t * (3 - 2 * t);
      }

      const nx = px / (width / 2);
      const ny = py / (height / 2);

      data[i++] = Math.round(128 + nx * rim * 110);
      data[i++] = Math.round(128 + ny * rim * 110);
      data[i++] = 128;
      data[i++] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

interface LensState {
  width: number;
  height: number;
  map: string;
}

/**
 * Refraction with chromatic aberration: the backdrop is displaced three
 * times at slightly different strengths, one per color channel, then the
 * channels are recombined — edges pick up a subtle prismatic fringe.
 */
function LiquidGlassFilter({ id, lens }: { id: string; lens: LensState }) {
  const scale = 32;
  const chroma = 7;
  return (
    <svg aria-hidden="true" width={0} height={0} className="absolute">
      <defs>
        <filter
          id={id}
          x="0"
          y="0"
          width={lens.width}
          height={lens.height}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={lens.map}
            x="0"
            y="0"
            width={lens.width}
            height={lens.height}
            result="map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale={scale + chroma}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispR"
          />
          <feColorMatrix
            in="dispR"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="chR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispG"
          />
          <feColorMatrix
            in="dispG"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="chG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale={scale - chroma}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispB"
          />
          <feColorMatrix
            in="dispB"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="chB"
          />
          <feBlend in="chR" in2="chG" mode="screen" result="rg" />
          <feBlend in="rg" in2="chB" mode="screen" result="rgb" />
          <feGaussianBlur in="rgb" stdDeviation="0.35" />
        </filter>
      </defs>
    </svg>
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
    const containerRef = useRef<HTMLDivElement>(null);

    const rawId = useId();
    const filterId = `liquid-lens-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
    const [liquidOk, setLiquidOk] = useState(false);
    const [lens, setLens] = useState<LensState | null>(null);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
      setLiquidOk(supportsLiquidGlass());
    }, []);

    // Regenerate the lens map whenever the dock's layout size changes
    // (e.g. icon magnification). Throttled to one regen per frame and
    // bucketed to 4px so hover wiggle doesn't thrash the canvas.
    useEffect(() => {
      if (!liquidOk) return;
      const node = containerRef.current;
      if (!node) return;

      let frame = 0;
      let lastKey = "";

      const regenerate = () => {
        frame = 0;
        const w = Math.round(node.offsetWidth / 4) * 4;
        const h = Math.round(node.offsetHeight / 4) * 4;
        if (w < 8 || h < 8) return;
        const key = `${w}x${h}`;
        if (key === lastKey) return;
        const map = generateLensMap(w, h);
        if (!map) return;
        lastKey = key;
        setLens({ width: w, height: h, map });
      };

      regenerate();
      const observer = new ResizeObserver(() => {
        if (frame) return;
        frame = requestAnimationFrame(regenerate);
      });
      observer.observe(node);
      return () => {
        observer.disconnect();
        if (frame) cancelAnimationFrame(frame);
      };
    }, [liquidOk]);

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

    const liquidActive = liquidOk && lens !== null;
    const glassFilter = liquidActive
      ? `url(#${filterId}) blur(2px) saturate(1.8) brightness(1.04)`
      : "blur(16px) saturate(1.6)";

    return (
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
          backdropFilter: glassFilter,
          WebkitBackdropFilter: glassFilter,
          boxShadow: liquidActive
            ? "0 8px 32px -8px rgba(0,0,0,0.22), inset 0 1px 1.5px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(255,255,255,0.12), inset 1.5px 0 1.5px rgba(255,255,255,0.1), inset -1.5px 0 1.5px rgba(255,255,255,0.1)"
            : "0 4px 24px -4px rgba(0,0,0,0.12), inset 0 -1px 2px rgba(255,255,255,0.1), inset 0 1px 2px rgba(255,255,255,0.15)",
        }}
      >
        {liquidActive && lens && (
          <LiquidGlassFilter id={filterId} lens={lens} />
        )}
        {renderChildren()}
      </motion.div>
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
