"use client";

import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectPlay } from "@/data/resume";

interface Props {
  title: string;
  play: ProjectPlay;
}

export function PlayButton({ title, play }: Props) {
  const [open, setOpen] = useState(false);

  const pill = (
    <Badge className="flex gap-2 px-2 py-1 text-[10px]">
      <Play className="size-3" />
      Play
    </Badge>
  );

  if (play.mode === "external") {
    return (
      <a
        href={play.url}
        target="_blank"
        rel="noopener noreferrer"
        title={play.note}
        aria-label={`Play ${title} in a new tab`}
      >
        {pill}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={play.note}
        aria-label={`Play ${title}`}
        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {pill}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-5xl gap-0 overflow-hidden p-0 sm:rounded-xl">
          <div className="flex flex-col gap-0.5 border-b border-border/60 px-4 py-3 pr-12">
            <DialogTitle className="text-sm font-semibold">{title}</DialogTitle>
            <DialogDescription className="text-xs">
              {play.note ?? "Desktop, keyboard and mouse."}
            </DialogDescription>
          </div>
          <div className="aspect-video w-full bg-black">
            {open && (
              <iframe
                src={play.url}
                title={title}
                className="h-full w-full border-0"
                allow="fullscreen; autoplay"
                loading="lazy"
              />
            )}
          </div>
          <div className="flex items-center justify-end px-4 py-2">
            <a
              href={play.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Open full screen
              <ExternalLink className="size-3" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
