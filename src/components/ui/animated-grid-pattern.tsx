"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState, useCallback } from "react";

import { cn } from "@/lib/utils";

interface Square {
  id: string;
  pos: [number, number]; // [x, y] coordinates
}

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export default function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Square[]>([]);

  const generateSquares = (count: number): Square[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `square-${i}`,
      pos: [
        Math.floor(Math.random() * 20), // x coordinate
        Math.floor(Math.random() * 20), // y coordinate
      ],
    }));
  };

  const updateSquarePosition = (id: string) => {
    setSquares(prev => prev.map(square => {
      if (square.id === id) {
        return {
          ...square,
          pos: [
            Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 20),
          ],
        };
      }
      return square;
    }));
  };

  // Update squares to animate in
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  // Resize observer to update container dimensions
  useEffect(() => {
    const currentContainer = containerRef.current;
    
    const resizeObserver = new ResizeObserver(() => {
      if (currentContainer) {
        const rect = currentContainer.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    });

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array since we only want to set up the observer once

  return (
    <div ref={containerRef} className={className}>
      <svg
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
          className,
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(({ pos: [x, y], id }, index) => (
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: maxOpacity }}
              transition={{
                duration,
                repeat: 1,
                delay: index * 0.1,
                repeatType: "reverse",
              }}
              onAnimationComplete={() => updateSquarePosition(id)}
              key={`${x}-${y}-${index}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
              fill="currentColor"
              strokeWidth="0"
            />
          ))}
        </svg>
      </svg>
    </div>
  );
}
