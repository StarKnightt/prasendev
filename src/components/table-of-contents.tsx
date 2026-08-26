"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/data/blog";

export function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null
  );

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visibility = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          visibility.set(entry.target.id, entry.isIntersecting)
        );
        const firstVisible = elements.find((el) => visibility.get(el.id));
        if (firstVisible) {
          setActiveId(firstVisible.id);
          return;
        }
        const above = elements.filter(
          (el) => el.getBoundingClientRect().top < 100
        );
        if (above.length > 0) {
          setActiveId(above[above.length - 1].id);
        }
      },
      { rootMargin: "-96px 0px -60% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <aside className="hidden xl:block absolute right-0 top-0 h-full w-40">
      <nav
        aria-label="Table of contents"
        className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
          On this page
        </p>
        <ul className="mt-3 space-y-2 border-l border-border/50 pl-3">
          {headings.map((heading) => (
            <li key={heading.id} className={heading.level === 3 ? "pl-3" : undefined}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  "block text-[13px] leading-snug transition-colors",
                  activeId === heading.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
