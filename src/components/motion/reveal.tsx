"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "./use-in-view-once";

/*
 * Content settles onto the page like ink drying: a short rise and fade, no blur.
 * Pure CSS keyed off [data-inview], so nothing re-renders while it plays.
 */

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** seconds, to stagger siblings */
  delay?: number;
  yOffset?: number;
  /** accepted for drop-in compatibility; reveals always wait for the viewport */
  inView?: boolean;
};

export default function Reveal({ children, className, delay = 0, yOffset = 6 }: RevealProps) {
  const ref = useInViewOnce<HTMLDivElement>({ threshold: 0, rootMargin: "0px 0px -32px 0px" });
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${Math.round(delay * 1000)}ms`, "--reveal-y": `${yOffset}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** A line of text that is written across the page from left to right. */
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  delay?: number;
  yOffset?: number;
  as?: ElementType;
}) {
  const ref = useInViewOnce<HTMLElement>({ threshold: 0 });
  return (
    <Tag
      ref={ref}
      className={cn("reveal-write", className)}
      style={{ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties}
    >
      {text}
    </Tag>
  );
}
