"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Receipt } from "@/components/receipt";

interface Props {
  company: string;
  title: string;
  period: string;
  impact?: string;
  description?: string;
  badges?: readonly string[];
  links?: readonly { type: string; href: string; icon?: ReactNode }[];
  redacted?: boolean;
}

export function ExperienceItem({
  company,
  title,
  period,
  impact,
  description,
  badges,
  links,
  redacted,
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[9rem_1fr]">
      <span className="pt-0.5 font-mono text-xs text-muted-foreground">{period}</span>
      <div className="min-w-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
        >
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-x-2 text-[15px] font-medium">
              <span className={cn(redacted && "select-none blur-[3px]")}>{company}</span>
              {badges?.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border px-1.5 py-px font-mono text-[10px] font-normal text-muted-foreground"
                >
                  {badge}
                </span>
              ))}
            </span>
            <span className="mt-0.5 block text-sm text-muted-foreground">{title}</span>
            {impact && (
              <span className="mt-1.5 block text-sm text-foreground/80">{impact}</span>
            )}
          </span>
          <Plus
            aria-hidden
            className={cn(
              "mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover:text-foreground",
              open && "rotate-45"
            )}
          />
        </button>
        <div
          id={panelId}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden" inert={!open}>
            <p className="pt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            {links && links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {links.map((link) => (
                  <Receipt key={link.href} href={link.href} icon={link.icon}>
                    {link.type}
                  </Receipt>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
