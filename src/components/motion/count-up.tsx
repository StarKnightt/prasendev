"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const DURATION = 1100;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function parse(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  const decimals = num.split(".")[1]?.length ?? 0;
  return { prefix, target: Number(num), suffix, decimals };
}

/**
 * Counts numeric stats up once on first view. Small ordinals ("2x", "PR #3")
 * stay static since counting to them reads as noise.
 */
export function CountUp({ value, delay = 250 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parse(value);
  const animate = parsed !== null && parsed.target >= 10;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !animate || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { prefix, target, suffix, decimals } = parsed;
    const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
    el.textContent = format(0);

    let frame = 0;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / DURATION, 1);
            el.textContent = t === 1 ? value : format(target * easeOutExpo(t));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.8 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
