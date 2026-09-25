"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `data-inview` on the element the first time it enters the viewport.
 * CSS keyed off that attribute does the animating, so nothing re-renders.
 */
export function useInViewOnce<T extends Element>(
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.5, rootMargin = "0px" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-inview", "");
        observer.disconnect();
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
