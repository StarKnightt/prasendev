"use client";

import { useState, useCallback, ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DISCORD_USER_ID = "878205528570990602";

interface LanyardData {
  displayName: string;
  username: string;
  avatar: string;
  status: string;
  customStatus: string | null;
  activity: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  online: "bg-emerald-500",
  idle: "bg-amber-500",
  dnd: "bg-red-500",
  offline: "bg-zinc-400",
};

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

let cachedData: LanyardData | null = null;
let cachedAt = 0;
const CACHE_TTL = 30 * 1000;

export function DiscordHoverCard({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LanyardData | null>(cachedData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    const isFresh = cachedData && Date.now() - cachedAt < CACHE_TTL;
    if (isFresh) {
      setData(cachedData);
      return;
    }
    if (loading) return;

    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      const d = json.data;

      const avatarHash = d.discord_user.avatar;
      const avatarUrl = avatarHash
        ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${avatarHash}${avatarHash.startsWith("a_") ? ".gif" : ".png"}?size=128`
        : "https://unavatar.io/github/StarKnightt";

      const customStatus = d.activities?.find((a: any) => a.type === 4)?.state || null;

      const result: LanyardData = {
        displayName: d.discord_user.display_name || d.discord_user.global_name || "Prasen",
        username: d.discord_user.username,
        avatar: avatarUrl,
        status: d.discord_status || "offline",
        customStatus,
        activity: null,
      };

      cachedData = result;
      cachedAt = Date.now();
      setData(result);
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
        className="w-fit max-w-[280px] min-w-0 border-border/60 bg-card/95 backdrop-blur-xl backdrop-saturate-150 shadow-xl"
      >
        {loading && !data ? (
          <Skeleton />
        ) : error && !data ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DiscordIcon />
            <span>Could not load profile</span>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="size-10 border border-border/50 shrink-0">
                  <AvatarImage src={data.avatar} alt={data.displayName} referrerPolicy="no-referrer" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${STATUS_COLORS[data.status] ?? "bg-zinc-400"}`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold truncate">{data.displayName}</p>
                  <DiscordIcon />
                </div>
                <p className="text-xs text-muted-foreground truncate">{data.username}</p>
              </div>
            </div>
            {(data.customStatus || data.activity) && (
              <p className="text-xs text-muted-foreground leading-relaxed truncate">
                {data.customStatus || data.activity}
              </p>
            )}
          </div>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  );
}

function DiscordIcon() {
  return (
    <svg className="size-3.5 shrink-0 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
