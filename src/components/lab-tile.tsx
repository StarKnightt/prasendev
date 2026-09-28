import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PlayButton } from "./play-button";
import type { Project } from "@/data/resume";

export function LabTile({ title, href, tagline, description, technologies, links, image, play }: Project) {
  const model = technologies.find((t) => t.startsWith("Claude"));
  const receipts = [
    ...links.filter((link) => link.type !== "Website" && link.type !== "Source"),
    ...links.filter((link) => link.type === "Source"),
  ];

  return (
    <div className="group flex h-full flex-col">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg border border-border/60"
      >
        <Image
          src={image}
          alt={title}
          width={640}
          height={360}
          sizes="(min-width: 640px) 320px, 100vw"
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="mt-3 flex items-center justify-between gap-2">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm font-semibold tracking-tight"
        >
          {title}
        </Link>
        {model && (
          <span className="shrink-0 rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            {model}
          </span>
        )}
      </div>
      <p className="mt-1 text-pretty text-xs text-muted-foreground">{tagline ?? description}</p>
      {(play || receipts.length > 0) && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {play && <PlayButton title={title} play={play} />}
          {receipts.map((link) => (
            <Link href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
              <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                {link.icon}
                {link.type}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
