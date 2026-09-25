"use client";

import { useState, useCallback, ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen } from "lucide-react";

const MEDIUM_PROFILE = {
  name: "Prasenjit",
  handle: "prasenx",
  avatar: "/prasen.webp",
  description: "Writing on Medium",
  url: "https://medium.com/@prasenx",
};

const FEED_CAP = 10;

interface MediumData {
  count: number;
  latest: { title: string; link: string; pubDate: string } | null;
}

let cachedData: MediumData | null = null;
let failed = false;

export function MediumHoverCard({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MediumData | null>(cachedData);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (cachedData || failed || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/medium");
      if (!res.ok) throw new Error("Failed");
      const json: MediumData = await res.json();
      if (typeof json.count !== "number") throw new Error("Failed");
      cachedData = json;
      setData(json);
    } catch {
      failed = true;
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const stories = data
    ? `${data.count >= FEED_CAP ? `${FEED_CAP}+` : data.count}`
    : null;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild onMouseEnter={fetchData}>
        {children}
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        sideOffset={8}
        align="center"
        collisionPadding={16}
        className="w-fit max-w-[280px] min-w-0 border-border/60 bg-card/95 backdrop-blur-xl backdrop-saturate-150 shadow-xl"
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-border/50 shrink-0">
              <AvatarImage src={MEDIUM_PROFILE.avatar} alt={MEDIUM_PROFILE.name} referrerPolicy="no-referrer" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate">{MEDIUM_PROFILE.name}</p>
                <MediumIcon />
              </div>
              <p className="text-xs text-muted-foreground truncate">@{MEDIUM_PROFILE.handle}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {MEDIUM_PROFILE.description}
          </p>
          {loading && !data ? (
            <div className="space-y-1.5 animate-pulse">
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
            </div>
          ) : data?.latest ? (
            <a
              href={data.latest.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium leading-relaxed text-foreground line-clamp-2 underline-offset-4 hover:underline"
            >
              {data.latest.title}
            </a>
          ) : null}
          <div className="flex items-center gap-3 pt-0.5">
            {stories && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BookOpen className="size-3.5" />
                <span className="font-medium text-foreground">{stories}</span>
                <span>{data?.count === 1 ? "Story" : "Stories"}</span>
              </div>
            )}
            <a
              href={MEDIUM_PROFILE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              View profile
            </a>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function MediumIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}
