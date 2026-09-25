const STAR =
  "M12 2.8c.6 4.8 3.4 8 8.6 9.1-5 .9-8.1 4-8.9 9.3-.7-5.2-3.7-8.4-8.9-9.2 5.1-1 8.4-4.2 9.2-9.2z";

const DOODLES = [
  { className: "right-0 top-1 size-4 text-amber-500 dark:text-amber-400", d: STAR },
  { className: "-left-1 top-[58%] size-2.5 text-foreground/60", d: STAR },
  { className: "left-3 top-0 size-2 text-foreground/50", d: "M12 5.5c3.8-.2 6.6 2.9 6.4 6.6-.2 3.6-3.3 6.3-6.8 6.1-3.6-.2-6.2-3.3-6-6.8.2-3.3 3-5.8 6.4-5.9" },
  { className: "-right-1 bottom-3 size-3 text-foreground/60", d: "M12 4.5c.2 5 .1 10-.2 15M4.6 12.2c5-.3 9.9-.2 14.8.1" },
];

/** Sketchy sparkles that drift around the avatar while it's hovered. */
export function AvatarDoodles() {
  return (
    <span aria-hidden className="pointer-events-none absolute -inset-4">
      {DOODLES.map((doodle, i) => (
        <span key={i} className={`avatar-doodle absolute ${doodle.className}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="avatar-doodle-drift size-full overflow-visible"
          >
            <path d={doodle.d} vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      ))}
    </span>
  );
}
