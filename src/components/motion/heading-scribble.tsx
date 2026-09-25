"use client";

import type { CSSProperties } from "react";
import { useInViewOnce } from "./use-in-view-once";

type Scribble = { w: number; strokes: string[] };

// Each viewBox is roughly its heading's rendered width so the stroke isn't stretched
const SCRIBBLES: Record<string, Scribble> = {
  swoosh: {
    w: 140,
    strokes: ["M2 6.6c18-2.6 36-2.9 54-1.3s35 2.4 52 .5c10-1.2 20-1.6 30-.9"],
  },
  flick: {
    w: 112,
    strokes: ["M3 7.4C25 5.5 49 4.3 73 4.7c12.2.2 24.2.9 35.8 2.1"],
  },
  double: {
    w: 180,
    strokes: ["M2 4.9c40-1.7 88-2.3 176-.5", "M28 8.5c38-1.3 80-1.5 124-.4"],
  },
  wave: {
    w: 76,
    strokes: [
      "M2 6c4-3.4 8-3.4 12 0s8 3.4 12 0 8-3.4 12 0 8 3.4 12 0 8-3.4 12 0 8 3.4 12 0",
    ],
  },
};

export type ScribbleKind = keyof typeof SCRIBBLES;

export function HeadingScribble({ kind }: { kind: ScribbleKind }) {
  const ref = useInViewOnce<SVGSVGElement>({ threshold: 0.9 });
  const { w, strokes } = SCRIBBLES[kind];
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={`0 0 ${w} 10`}
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      className="pointer-events-none absolute left-[-2%] top-full -mt-1 h-2.5 w-[104%] overflow-visible text-amber-500/90 dark:text-amber-400/90"
    >
      {strokes.map((stroke, i) => (
        <path
          key={stroke}
          className="motion-draw"
          pathLength={1}
          d={stroke}
          style={
            {
              "--draw-delay": `${250 + i * 320}ms`,
              "--draw-dur": "620ms",
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}
