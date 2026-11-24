"use client";

import type { CSSProperties } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "./use-in-view-once";

/*
 * Little pen sketches that draw themselves the first time they scroll into view,
 * stroke by stroke, like someone doodling in the margin of the page. A faint
 * turbulence filter wobbles every line so it reads as a nib on paper, not a vector.
 * An optional watercolour wash blooms in underneath.
 */

type Doodle = { vb: string; strokes: string[]; wash?: { d: string; tone: Tone } };
type Tone = "ochre" | "rose" | "sage" | "sky";

const DOODLES = {
  coffee: {
    vb: "0 0 64 64",
    wash: { d: "M12 34c2-8 14-10 22-9s16 3 15 12-7 16-19 16S10 44 12 34z", tone: "ochre" },
    strokes: [
      "M13 30c7-4 27-4 34 0-7 4-27 4-34 0",
      "M14 30c0 14 4 22 16 22s16-8 16-22",
      "M46 34c8-2 10 8 0 10",
      "M8 55c12 4 34 4 46-1",
      "M24 22c-4-5 4-8 0-14",
      "M32 21c-4-6 4-9 0-16",
      "M40 22c-4-5 4-8 0-13",
    ],
  },
  inkpot: {
    vb: "0 0 72 72",
    wash: { d: "M20 46c1-8 12-12 20-11s16 6 15 15-8 15-18 14-18-9-17-18z", tone: "sky" },
    strokes: [
      "M22 40v22c0 3 2 4 5 4h22c3 0 5-1 5-4V40c0-4-4-6-8-6H30c-4 0-8 2-8 6z",
      "M31 34v-7h14v7",
      "M29 27h18",
      "M24 50c10-2 18 2 28-1",
      "M38 31L61 4",
      "M61 4c-9 2-17 10-19 21 6-4 14-10 19-21z",
      "M57 9l-5 1.5M54 13l-6 2M51 17l-5 2",
    ],
  },
  clapper: {
    vb: "0 0 72 64",
    wash: { d: "M12 36c3-8 16-9 26-8s22 4 21 13-10 15-24 14-25-10-23-19z", tone: "rose" },
    strokes: [
      "M10 28h50v26H10z",
      "M10 28l-1-8 48-11 2 8",
      "M19 18l6 8M31 15l6 9M43 12l6 9",
      "M16 38h24M16 46h15",
      "M50 41a4 4 0 1 0 .1 0",
    ],
  },
  plane: {
    vb: "0 0 96 64",
    strokes: [
      "M6 50c10-6 18-2 24 3s14 6 16-4-8-14-14-6 4 16 16 12 18-18 26-24",
      "M60 22L90 8 74 34l-8-8z",
      "M90 8L66 26",
      "M66 26l-2 9 7-5",
    ],
  },
  sprig: {
    vb: "0 0 64 110",
    wash: { d: "M16 62c-4-14 4-34 16-40s20 8 18 26-6 34-18 36-12-8-16-22z", tone: "sage" },
    strokes: [
      "M31 106c-3-28 4-60-1-100",
      "M30 88c-10-4-16-12-16-20 8 2 14 10 16 20",
      "M31 74c11-4 17-12 17-20-8 2-15 10-17 20",
      "M30 58c-10-4-15-12-14-20 8 3 13 11 14 20",
      "M31 42c9-4 13-12 12-20-7 3-12 11-12 20",
      "M30 24c-6-3-9-9-8-15 5 2 8 8 8 15",
    ],
  },
  sparkles: {
    vb: "0 0 60 48",
    strokes: [
      "M16 4c1 8 2.5 9.5 10 10.5-7.5 1-9 2.5-10 10.5-1-8-2.5-9.5-10-10.5 7.5-1 9-2.5 10-10.5z",
      "M44 6c.6 4.5 1.5 5.4 5.5 6-4 .6-4.9 1.5-5.5 6-.6-4.5-1.5-5.4-5.5-6 4-.6 4.9-1.5 5.5-6z",
      "M38 28c.8 6 2 7.2 7.5 8-5.5.8-6.7 2-7.5 8-.8-6-2-7.2-7.5-8 5.5-.8 6.7-2 7.5-8z",
      "M10 36a1.6 1.6 0 1 0 .1 0",
    ],
  },
  moon: {
    vb: "0 0 56 56",
    wash: { d: "M10 28c0-11 9-19 19-19s17 9 16 19-8 18-18 18-17-7-17-18z", tone: "ochre" },
    strokes: [
      "M34 9c-10 1-18 9-18 19s8 18 18 19c-12 4-26-4-26-19S22 5 34 9z",
      "M44 14v6M41 17h6",
      "M46 34l3 3M49 34l-3 3",
    ],
  },
  arrow: {
    vb: "0 0 64 40",
    strokes: ["M4 34c14 4 34 0 50-22", "M45 12l10-2-1 10"],
  },
} satisfies Record<string, Doodle>;

export type DoodleKind = keyof typeof DOODLES;

const TONE: Record<Tone, string> = {
  ochre: "hsl(var(--wash-ochre))",
  rose: "hsl(var(--wash-rose))",
  sage: "hsl(var(--wash-sage))",
  sky: "hsl(var(--wash-sky))",
};

export function InkDoodle({
  kind,
  className,
  delay = 0,
  speed = 1,
}: {
  kind: DoodleKind;
  className?: string;
  /** ms before the first stroke starts */
  delay?: number;
  /** >1 draws slower */
  speed?: number;
}) {
  const ref = useInViewOnce<SVGSVGElement>({ threshold: 0.6 });
  const id = useId().replace(/:/g, "");
  const doodle: Doodle = DOODLES[kind];
  const step = 260 * speed;
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={doodle.vb}
      fill="none"
      className={cn("ink-doodle pointer-events-none overflow-visible", className)}
    >
      <defs>
        <filter id={`nib-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
        </filter>
        {doodle.wash && (
          <filter id={`wash-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="10" result="d" />
            <feGaussianBlur in="d" stdDeviation="1.4" />
          </filter>
        )}
      </defs>
      {doodle.wash && (
        <g filter={`url(#wash-${id})`} className="ink-wash" style={{ "--draw-delay": `${delay}ms` } as CSSProperties}>
          <path d={doodle.wash.d} fill={TONE[doodle.wash.tone]} opacity={0.55} />
          <path d={doodle.wash.d} fill="none" stroke={TONE[doodle.wash.tone]} strokeWidth={2.5} opacity={0.5} />
        </g>
      )}
      <g
        filter={`url(#nib-${id})`}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {doodle.strokes.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            className="motion-draw"
            style={
              {
                "--draw-delay": `${delay + 200 + i * step}ms`,
                "--draw-dur": `${Math.round(420 * speed)}ms`,
              } as CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * A loose watercolour bloom: pigment pooled darker at the rim, paler in the middle,
 * edges eaten by the paper. Fades in once, then sits still.
 */
export function WatercolorWash({
  tone,
  className,
  seed = 3,
  delay = 0,
}: {
  tone: Tone;
  className?: string;
  seed?: number;
  delay?: number;
}) {
  const ref = useInViewOnce<SVGSVGElement>({ threshold: 0.2 });
  const id = useId().replace(/:/g, "");
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 200 200"
      className={cn("wc-wash pointer-events-none overflow-visible", className)}
    >
      <defs>
        <filter id={`wc-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" result="d" />
          <feGaussianBlur in="d" stdDeviation="2.2" />
        </filter>
        <radialGradient id={`pool-${id}`}>
          <stop offset="30%" stopColor={TONE[tone]} stopOpacity="0.22" />
          <stop offset="85%" stopColor={TONE[tone]} stopOpacity="0.42" />
          <stop offset="100%" stopColor={TONE[tone]} stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <g filter={`url(#wc-${id})`} className="ink-wash" style={{ "--draw-delay": `${delay}ms` } as CSSProperties}>
        <path d="M28 108c-6-38 22-74 66-76s78 20 76 60-26 70-70 72-66-18-72-56z" fill={`url(#pool-${id})`} />
        <path d="M120 150c10-8 30-6 34 6s-10 22-24 18-16-16-10-24z" fill={TONE[tone]} opacity="0.28" />
        <circle cx="40" cy="160" r="6" fill={TONE[tone]} opacity="0.35" />
        <circle cx="168" cy="44" r="4" fill={TONE[tone]} opacity="0.3" />
      </g>
    </svg>
  );
}

/** A coffee-cup ring someone left on the page. Static. */
export function CoffeeRing({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={cn("pointer-events-none", className)}>
      <defs>
        <filter id={`ring-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.6" />
        </filter>
      </defs>
      <g filter={`url(#ring-${id})`} fill="none" stroke="hsl(var(--wash-coffee))">
        <circle cx="60" cy="60" r="46" strokeWidth="3.2" opacity="0.5" />
        <circle cx="60" cy="60" r="43" strokeWidth="1.2" opacity="0.35" />
        <path d="M20 46c-6 20 2 44 22 54" strokeWidth="5" opacity="0.25" strokeLinecap="round" />
      </g>
    </svg>
  );
}
