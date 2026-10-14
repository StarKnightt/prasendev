import { cn } from "@/lib/utils";

/** Lucide flask-conical that tilts and lets bubbles rise from its mouth while its parent link is hovered or focused. */
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
      </g>
      <g strokeWidth={1.5}>
        <circle className="lab-flask-bubble" cx="12" cy="-1" r="2" />
        <circle className="lab-flask-bubble" cx="14.5" cy="-1.5" r="1.5" />
        <circle className="lab-flask-bubble" cx="9.75" cy="-0.5" r="1.25" />
      </g>
    </svg>
  );
}
