/** Outline flask with bubbles drifting out of the mouth. Bubbles sit still under reduced motion. */
export function LabBeaker() {
  return (
    <svg
      aria-hidden
      data-lab-beaker
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 overflow-visible text-muted-foreground"
    >
      <path d="M9.2 3.6c1.9-.2 3.8-.1 5.6 0" />
      <path d="M10.2 3.9c.1 2.1-.1 4.2.1 6.3l-4.8 8.2c-.8 1.4.1 2.4 1.6 2.4 3.3.1 6.6-.1 9.9 0 1.5 0 2.4-1 1.6-2.4l-4.9-8.2c.1-2.1-.1-4.2 0-6.3" />
      <path className="text-amber-500 dark:text-amber-400" d="M7.7 15.6c2.9-.5 5.8.4 8.6-.1" />
      <circle className="lab-bubble" cx="11.3" cy="1.2" r="0.9" />
      <circle className="lab-bubble" cx="13.4" cy="0.4" r="0.65" />
      <circle className="lab-bubble" cx="12.1" cy="-1.3" r="0.5" />
    </svg>
  );
}
