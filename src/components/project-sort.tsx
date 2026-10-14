"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SORT_OPTIONS, parseSortKey, sortKeys, type SortItem, type SortKey } from "@/lib/project-sort";
import { cn } from "@/lib/utils";

type SortState = { sort: SortKey; setSort: (sort: SortKey) => void; animate: boolean };

const SortContext = createContext<SortState | null>(null);

function useSort() {
  const ctx = useContext(SortContext);
  if (!ctx) throw new Error("ProjectSort components must be inside <ProjectSortProvider>");
  return ctx;
}

/** Server HTML always renders "featured"; the ?sort= param is applied after mount so hydration matches. */
export function ProjectSortProvider({ children }: { children: ReactNode }) {
  const [sort, setSortState] = useState<SortKey>("featured");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setSortState(parseSortKey(new URLSearchParams(window.location.search).get("sort")));
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const value = useMemo<SortState>(
    () => ({
      sort,
      animate,
      setSort: (next) => {
        setSortState(next);
        const url = new URL(window.location.href);
        if (next === "featured") url.searchParams.delete("sort");
        else url.searchParams.set("sort", next);
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      },
    }),
    [sort, animate]
  );

  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
}

export function ProjectSortSelect({ label = "Sort projects", className }: { label?: string; className?: string }) {
  const { sort, setSort } = useSort();
  return (
    <Select value={sort} onValueChange={(v) => setSort(parseSortKey(v))}>
      <SelectTrigger
        aria-label={label}
        className={cn(
          "h-7 w-auto gap-1.5 border-border/60 bg-transparent px-2 text-xs text-muted-foreground shadow-none transition-colors hover:text-foreground focus:ring-1 [&>svg:last-child]:hidden",
          className
        )}
      >
        <ArrowUpDown className="size-3.5 shrink-0" aria-hidden />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[8rem]">
        {SORT_OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value} className="text-xs">
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** `children` must be in the same order as `items`. */
export function ProjectSortGrid({
  items,
  children,
  className,
}: {
  items: readonly SortItem[];
  children: ReactNode[];
  className?: string;
}) {
  const { sort, animate } = useSort();
  const byKey = new Map(items.map((item, i) => [item.key, children[i]]));
  const order = useMemo(() => sortKeys(items, sort), [items, sort]);

  return (
    <div className={className}>
      {order.map((key) => (
        <motion.div
          key={key}
          layout={animate ? "position" : false}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        >
          {byKey.get(key)}
        </motion.div>
      ))}
    </div>
  );
}
