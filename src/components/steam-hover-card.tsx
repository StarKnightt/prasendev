"use client";

import { useState, useCallback, ReactNode } from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { Gamepad2, Trophy, MonitorPlay } from "lucide-react";

interface SteamData {
  name: string;
  avatar: string;
  status: string;
  personastate: number;
  gameextrainfo: string | null;
  gameid: string | null;
  level: number;
  gamesCount: number;
  profileUrl: string;
}

const STATUS_COLORS: Record<number, string> = {
  0: "bg-zinc-400",
  1: "bg-emerald-500",
  2: "bg-red-500",
  3: "bg-amber-500",
  4: "bg-amber-500",
  5: "bg-cyan-500",
  6: "bg-cyan-500",
};

function Skeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-muted" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 w-24 rounded bg-muted" />
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
      </div>
    </div>
  );
}

let cachedData: SteamData | null = null;
let cachedAt = 0;
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

export function SteamHoverCard({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SteamData | null>(cachedData);
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
      const res = await fetch("/api/steam-stats");
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      cachedData = json;
      cachedAt = Date.now();
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
        align="start"
        collisionPadding={16}
        className="w-72 border-border/60 bg-card/95 backdrop-blur-xl backdrop-saturate-150 shadow-xl"
      >
        {loading && !data ? (
          <Skeleton />
        ) : error && !data ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icons.steam className="size-4" />
            <span>Could not load profile</span>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="size-10 border border-border/50">
                  <AvatarImage src={data.avatar} alt={data.name} />
                  <AvatarFallback>{data.name?.[0] ?? "S"}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${STATUS_COLORS[data.personastate] ?? "bg-zinc-400"}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{data.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {data.gameextrainfo
                    ? `Playing ${data.gameextrainfo}`
                    : data.status}
                </p>
              </div>
              <Icons.steam className="size-4 text-muted-foreground shrink-0" />
            </div>
            {data.gameextrainfo && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-2.5 py-1.5">
                {data.gameid ? (
                  <Image
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${data.gameid}/capsule_184x69.jpg`}
                    alt={data.gameextrainfo}
                    width={20}
                    height={20}
                    className="size-5 rounded object-cover shrink-0"
                    unoptimized
                  />
                ) : (
                  <MonitorPlay className="size-3.5 text-emerald-500 shrink-0" />
                )}
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 truncate">
                  Playing {data.gameextrainfo}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 pt-0.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Trophy className="size-3.5" />
                <span className="font-medium text-foreground">
                  {data.level}
                </span>
                <span>Level</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Gamepad2 className="size-3.5" />
                <span className="font-medium text-foreground">
                  {data.gamesCount}
                </span>
                <span>Games</span>
              </div>
            </div>
          </div>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  );
}