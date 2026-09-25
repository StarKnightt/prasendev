/** Three tiny bars that bob while a game is running. Static under reduced motion. */
export function Equalizer({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`equalizer inline-flex h-2.5 items-end gap-[1.5px] ${className ?? ""}`}>
      <span className="h-full w-[2px] origin-bottom rounded-full bg-current" />
      <span className="h-full w-[2px] origin-bottom rounded-full bg-current" />
      <span className="h-full w-[2px] origin-bottom rounded-full bg-current" />
    </span>
  );
}
