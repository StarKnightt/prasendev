import { cn } from "@/lib/utils";

/** Lucide flask-conical that tilts and bubbles while its parent link is hovered or focused. */
export function LabFlaskIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lab-flask overflow-visible", className)}
    >
      <g className="lab-flask-body">
        <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
        <path d="M6.453 15h11.094" />
        <path d="M8.5 2h7" />
        <circle className="lab-flask-bubble" cx="10.5" cy="18.5" r="1" />
        <circle className="lab-flask-bubble" cx="13.5" cy="18" r="0.75" />
      </g>
    </svg>
  );
}
