"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

// Center of each row's first line: li py-5 (20px) + half of the 15px/22px company line
const DOT_OFFSET = 31;

type Layout = { top: number; height: number; dots: number[] };

/**
 * Wraps the Experience <ol>. Draws a hairline down the gutter between the
 * date column (9rem) and the content column (gap-x-8) as the list scrolls
 * through, and fills each row's dot when the line reaches it.
 */
export function ExperienceTimeline({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fractions = useRef<number[]>([]);
  const [layout, setLayout] = useState<Layout | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const list = wrap?.querySelector("ol");
    if (!wrap || !list) return;

    const measure = () => {
      const ys = Array.from(list.children).map((li) => (li as HTMLElement).offsetTop + DOT_OFFSET);
      if (ys.length < 2) return;
      const top = ys[0];
      const height = ys[ys.length - 1] - top;
      fractions.current = ys.map((y) => (y - top) / height);
      setLayout({ top, height, dots: ys });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  const sync = (value: number) => {
    fractions.current.forEach((f, i) => {
      dotRefs.current[i]?.toggleAttribute("data-reached", reduce || value >= f - 0.001);
    });
  };

  useMotionValueEvent(progress, "change", sync);
  useEffect(() => {
    sync(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, reduce]);

  return (
    <div ref={wrapRef} className="relative">
      {children}
      {layout && (
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
          <motion.span
            className="absolute left-[10rem] w-px origin-top -translate-x-1/2 bg-foreground/25"
            style={{ top: layout.top, height: layout.height, scaleY: reduce ? 1 : progress }}
          />
          {layout.dots.map((y, i) => (
            <span
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="timeline-dot absolute left-[10rem] size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-background"
              style={{ top: y }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
