"use client";

import { useState, useCallback, ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlayCircle, Users } from "lucide-react";

interface YouTubeData {
  name: string;
  avatar: string;
  subscribers: number;
  videos: number;
}

function StatPill({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
}) {
  const formatted =
    value >= 1_000_000
      ? `${(value / 1_000_000).toFixed(1)}M`
      : value >= 1_000
        ? `${(value / 1_000).toFixed(1)}k`
        : String(value);
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="size-3.5" />
      <span className="font-medium text-foreground">{formatted}</span>
      <span>{label}</span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="size-10 rounded-full bg-muted" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 w-24 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
      </div>
    </div>
  );
}

let cachedData: YouTubeData | null = null;

export function YouTubeHoverCard({ children }: { children: ReactNode }) {
  const [data, setData] = useState<YouTubeData | null>(cachedData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    if (cachedData) {
      setData(cachedData);
      return;
    }
    if (loading) return;

    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/youtube-stats");
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      cachedData = json;
      setData(json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [loading]);

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
        className="w-fit min-w-0 border-border/60 bg-card/95 backdrop-blur-xl backdrop-saturate-150 shadow-xl"
      >
        {loading && !data ? (
          <Skeleton />
        ) : error && !data ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <PlayCircle className="size-4" />
            <span>Could not load channel</span>
          </div>
        ) : data ? (
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-border/50 shrink-0">
              <AvatarImage src={data.avatar} alt={data.name} referrerPolicy="no-referrer" />
              <AvatarFallback>{data.name?.[0] ?? "Y"}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate">{data.name}</p>
                <svg
                  className="size-3.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "#FF0000" }}
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814Z" />
                  <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568Z" fill="#fff" />
                </svg>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <StatPill icon={Users} value={data.subscribers} label="Subs" />
                <StatPill icon={PlayCircle} value={data.videos} label="Videos" />
              </div>
            </div>
          </div>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  );
}
