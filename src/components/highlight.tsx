"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";

export type HighlightType = "highlight" | "circle" | "underline";

interface HighlightProps {
  type: HighlightType;
  children: ReactNode;
  /** Draw order within a group of marks; each one waits for the previous to finish */
  order?: number;
  color?: string;
  strokeWidth?: number;
  padding?: number | [number, number] | [number, number, number, number];
  iterations?: number;
  animationDuration?: number;
}

type Theme = "light" | "dark";

// "amber": translucent marker in both themes. "muted": monochrome marker (foreground @ ~18%) on dark.
const HIGHLIGHT_VARIANT: "amber" | "muted" = "amber";

const HIGHLIGHT_COLOR: Record<typeof HIGHLIGHT_VARIANT | "muted", Record<Theme, string>> = {
  amber: { light: "rgba(253, 224, 71, 0.55)", dark: "rgba(251, 191, 36, 0.35)" },
  muted: { light: "rgba(253, 224, 71, 0.55)", dark: "rgba(250, 250, 250, 0.18)" }, // --foreground (0 0% 98%) @ 18%
};

const STROKE_COLOR: Record<Theme, string> = { light: "#f59e0b", dark: "#fbbf24" };

const PRESETS: Record<HighlightType, { strokeWidth: number; padding: HighlightProps["padding"] }> = {
  highlight: { strokeWidth: 1, padding: [1, 2] },
  circle: { strokeWidth: 1.5, padding: [3, 4] },
  underline: { strokeWidth: 1.5, padding: 2 },
};

const BASE_DELAY = 600;

function pickColor(type: HighlightType, theme: Theme) {
  return type === "highlight" ? HIGHLIGHT_COLOR[HIGHLIGHT_VARIANT][theme] : STROKE_COLOR[theme];
}

export function Highlight({
  type,
  children,
  order = 0,
  color,
  strokeWidth,
  padding,
  iterations = 2,
  animationDuration = 700,
}: HighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const { resolvedTheme } = useTheme();
  const theme: Theme = resolvedTheme === "dark" ? "dark" : "light";
  const resolvedColor = color ?? pickColor(type, theme);
  const colorRef = useRef(resolvedColor);
  colorRef.current = resolvedColor;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const preset = PRESETS[type];
    const annotation = annotate(el, {
      type,
      multiline: true,
      iterations,
      animate: !reduced,
      animationDuration,
      color: colorRef.current,
      strokeWidth: strokeWidth ?? preset.strokeWidth,
      padding: padding ?? preset.padding,
    });
    annotationRef.current = annotation;

    let timer: number | undefined;
    let frame: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const delay = reduced ? 0 : BASE_DELAY + order * animationDuration * 0.8;
        timer = window.setTimeout(() => {
          frame = window.requestAnimationFrame(() => annotation.show());
        }, delay);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      annotation.remove();
      annotationRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, order, strokeWidth, JSON.stringify(padding), iterations, animationDuration]);

  // Theme change: swap the color in place (rough-notation redraws if already showing)
  useEffect(() => {
    const annotation = annotationRef.current;
    if (annotation && annotation.color !== resolvedColor) annotation.color = resolvedColor;
  }, [resolvedColor]);

  return (
    <span className={type === "circle" ? "rough-mark relative mx-1" : "rough-mark relative"}>
      {/* z-[1] keeps the glyphs above the absolutely-positioned SVG rough-notation inserts */}
      <span ref={ref} className="relative z-[1]">
        {children}
      </span>
    </span>
  );
}
