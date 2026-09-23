import { ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmailButton({
  href = "mailto:hi@prasen.dev",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label="Email Prasenjit"
      className={cn(
        "group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-sm ring-1 ring-foreground/10 transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-foreground/90 hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-background/25 to-transparent animate-sheen motion-reduce:hidden"
      />
      <Mail className="relative size-4 transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:-rotate-12" />
      <span className="relative">Email me</span>
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <ArrowRight
        aria-hidden
        className="relative -ml-2 size-4 w-0 opacity-0 transition-all duration-200 ease-out group-hover:ml-0 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-0 group-focus-visible:w-4 group-focus-visible:opacity-100"
      />
    </a>
  );
}
