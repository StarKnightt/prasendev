"use client";

import { useEffect, useRef, type ReactNode } from "react";

const STEP_MS = 14;
const CELL_MS = 420;

/**
 * Fades the contribution cells in as a diagonal wave (week + weekday) the
 * first time the calendar is on screen with real data. Skips the library's
 * loading skeleton, plays once, and leaves cells untouched under reduced motion.
 */
export function ContributionsWave({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let maxDelay = 0;
    let doneTimer = 0;

    const finishLater = () => {
      if (!el.hasAttribute("data-wave") || !el.hasAttribute("data-inview") || doneTimer) return;
      doneTimer = window.setTimeout(() => {
        el.setAttribute("data-wave-done", "");
        mutations.disconnect();
      }, maxDelay + CELL_MS + 100);
    };

    const arm = () => {
      const weeks = Array.from(
        el.querySelectorAll<SVGGElement>(".react-activity-calendar__calendar > g")
      ).filter((g) => g.querySelector(":scope > rect"));
      const first = weeks[0]?.querySelector("rect");
      // The loading skeleton has no month labels and an inline pulse animation
      const loaded = el.querySelector(".react-activity-calendar__calendar text");
      if (!first || !loaded || first.style.animationName.includes("loading")) return;
      weeks.forEach((week, w) => {
        week.querySelectorAll(":scope > rect").forEach((cell) => {
          const style = (cell as SVGElement).style;
          if (style.getPropertyValue("--wave-d")) return;
          const day = Math.round(Number(cell.getAttribute("y")) / 15) || 0;
          const delay = (w + day) * STEP_MS;
          maxDelay = Math.max(maxDelay, delay);
          style.setProperty("--wave-d", `${delay}ms`);
        });
      });
      el.setAttribute("data-wave", "");
      finishLater();
    };

    const mutations = new MutationObserver(arm);
    mutations.observe(el, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
    arm();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-inview", "");
        io.disconnect();
        finishLater();
      },
      { threshold: 0.25 }
    );
    io.observe(el);

    return () => {
      mutations.disconnect();
      io.disconnect();
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div ref={ref} className="contrib-wave">
      {children}
    </div>
  );
}
