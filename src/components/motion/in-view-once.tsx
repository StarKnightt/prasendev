"use client";

import type { ReactNode } from "react";
import { useInViewOnce } from "./use-in-view-once";

/** Client wrapper so server-rendered SVG can key its CSS animation off [data-inview]. */
export function InViewOnce({
  children,
  className,
  threshold,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useInViewOnce<HTMLDivElement>({ threshold });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
