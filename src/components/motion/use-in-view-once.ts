"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `data-inview` on the element when it enters the viewport.
 * CSS keyed off that attribute does the animating, so nothing re-renders.
 * With `repeat`, the attribute is removed again when the element leaves,
 * so the animation replays every time it comes back into view.
 */
export function useInViewOnce<T extends Element>(
  options: { threshold?: number; rootMargin?: string; repeat?: boolean } = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.5, rootMargin = "0px", repeat = false } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold * 0.99) {
          el.setAttribute("data-inview", "");
          if (!repeat) observer.disconnect();
        } else if (repeat && !entry.isIntersecting) {
          // reset only once it is fully out of view, so nothing vanishes mid-glance
          el.removeAttribute("data-inview");
        }
      },
      { threshold: repeat ? [0, threshold] : threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, repeat]);

  return ref;
}
