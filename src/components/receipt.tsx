import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const receiptClass =
  "inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-[color,border-color,transform] duration-150 ease-out hover:border-foreground/30 hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3";

export function Receipt({
  href,
  icon,
  children,
  className,
}: {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const external = !href.startsWith("/") && !href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(receiptClass, className)}
    >
      {icon}
      {children}
    </a>
  );
}
