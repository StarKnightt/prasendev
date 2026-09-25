"use client";

import type { CSSProperties, ReactElement } from "react";
import { useInViewOnce } from "./use-in-view-once";

export type StatGlyphKind = "signal" | "spark" | "merge" | "bars";

const d = (delay: number, dur = 420) =>
  ({ "--draw-delay": `${delay}ms`, "--draw-dur": `${dur}ms` }) as CSSProperties;

const ACCENT = "text-amber-500 dark:text-amber-400";

function Signal() {
  return (
    <>
      <circle className="motion-pop" style={d(120)} cx="5.6" cy="18.4" r="1.5" fill="currentColor" stroke="none" />
      <g className="glyph-signal-arc">
        <path className="motion-draw" style={d(220)} pathLength={1} d="M5.9 13c3-.1 5.4 2.2 5.3 5.4" />
      </g>
      <g className="glyph-signal-arc">
        <path className="motion-draw" style={d(340)} pathLength={1} d="M5.7 8.1c5.9-.3 10.6 4.5 10.4 10.4" />
      </g>
      <g className="glyph-signal-arc">
        <path className="motion-draw" style={d(460)} pathLength={1} d="M5.8 3.3c8.6-.2 15.4 6.6 15.2 15.3" />
      </g>
    </>
  );
}

const RAYS = [
  "M12 12.2 12.4 3.4",
  "M12 12.2l7.2-6",
  "M12 12.2l8.7 1.3",
  "M12 12.2l4.1 8.1",
  "M12 12.2l-3.4 8.4",
  "M12 12.2l-8.3 2.4",
  "M12 12.2 4.5 6.3",
];

function Spark() {
  return (
    <g className={`glyph-spark ${ACCENT}`}>
      {RAYS.map((ray, i) => (
        <path key={ray} className="motion-draw" style={d(120 + i * 55, 260)} pathLength={1} d={ray} />
      ))}
    </g>
  );
}

function Merge() {
  return (
    <>
      <path className="motion-draw" style={d(120, 380)} pathLength={1} d="M7 3.6c-.2 5.6.2 11.3 0 16.9" />
      <circle className="motion-pop" style={d(380)} cx="17" cy="5" r="1.9" />
      <path className="motion-draw" style={d(440, 420)} pathLength={1} d="M16.9 7c.2 5-3.3 7.7-9.6 8.6" />
      <g className="glyph-merge-dot">
        <circle className={`motion-pop ${ACCENT}`} style={d(860)} cx="7" cy="15.6" r="1.7" fill="currentColor" stroke="none" />
      </g>
    </>
  );
}

function Bars() {
  return (
    <>
      <path className="motion-draw" style={d(120, 360)} pathLength={1} d="M3.4 20.4c5.7-.3 11.4.2 17.2-.1" />
      <g className="glyph-bar">
        <path className="motion-draw" style={d(300, 240)} pathLength={1} d="M7 19.2c.1-1.5-.1-3 0-4.6" />
      </g>
      <g className="glyph-bar">
        <path className="motion-draw" style={d(400, 280)} pathLength={1} d="M12 19.2c-.1-2.9.1-5.8 0-8.8" />
      </g>
      <g className={`glyph-bar ${ACCENT}`}>
        <path className="motion-draw" style={d(500, 320)} pathLength={1} d="M17 19.2c.1-4.5-.1-9 .1-13.6" />
      </g>
    </>
  );
}

const GLYPHS: Record<StatGlyphKind, () => ReactElement> = {
  signal: Signal,
  spark: Spark,
  merge: Merge,
  bars: Bars,
};

export function StatGlyph({ kind }: { kind: StatGlyphKind }) {
  const ref = useInViewOnce<SVGSVGElement>({ threshold: 0.8 });
  const Glyph = GLYPHS[kind];
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stat-glyph shrink-0 overflow-visible text-muted-foreground"
    >
      <Glyph />
    </svg>
  );
}
