"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Gamepad2, Trophy, Clock } from "lucide-react";

interface SteamData {
  name: string;
  avatar: string;
  status: string;
  personastate: number;
  gameextrainfo: string | null;
  gameid: string | null;
  lastPlayed: {
    name: string;
    appid: string;
    playtime_forever: number;
  } | null;
  level: number;
  gamesCount: number;
  profileUrl: string;
}

export function SteamNowPlaying() {
  const [data, setData] = useState<SteamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchStatus() {
      try {
        const res = await fetch("/api/steam-stats");
        if (!res.ok) return;
        const json = await res.json();
        if (mounted) {
          setData(json);
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 120_000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading || !data) return null;

  const isPlaying = !!data.gameextrainfo;
  const gameName = isPlaying ? data.gameextrainfo : data.lastPlayed?.name;
  const gameId = isPlaying ? data.gameid : data.lastPlayed?.appid;

  if (!gameName) return null;

  const hoursPlayed = data.lastPlayed?.playtime_forever
    ? Math.round(data.lastPlayed.playtime_forever / 60)
    : null;

  return (
    <a
      href={data.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex w-full overflow-hidden rounded-xl border bg-card/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        isPlaying
          ? "border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-emerald-500/5"
          : data.personastate >= 1
            ? "border-border/40 hover:border-border/60"
            : "border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/5"
      }`}
    >
      {/* Game art with hover zoom + shimmer */}
      <div className="relative w-20 aspect-[3/4] shrink-0 bg-muted/30 overflow-hidden">
        {gameId ? (
          <>
            <Image
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId}/library_600x900.jpg`}
              alt={gameName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </>
        ) : (
          <div className="size-full flex items-center justify-center">
            <Gamepad2 className="size-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-between gap-2 px-3 py-2.5 sm:px-3.5 sm:py-3 min-w-0">
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Name + Status */}
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-medium truncate">{data.name}</p>
            {isPlaying ? (
              <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold text-emerald-500">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                In Game
              </span>
            ) : data.personastate >= 1 ? (
              <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold text-emerald-500">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-red-500/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold text-red-500">
                <span className="size-1.5 rounded-full bg-red-500" />
                Offline
              </span>
            )}
          </div>

          {/* Game name */}
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate leading-tight group-hover:text-primary transition-colors">
              {gameName}
            </p>
            {!isPlaying && (
              <p className="text-[10px] text-muted-foreground/50">(last played)</p>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Trophy className="size-3" />
              <span>Lvl {data.level}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Gamepad2 className="size-3" />
              <span>{data.gamesCount} games</span>
            </div>
            {!isPlaying && hoursPlayed !== null && hoursPlayed > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="size-3" />
                <span>{hoursPlayed}h</span>
              </div>
            )}
          </div>
        </div>

        {/* Steam icon */}
        <Icons.steam className="size-5 text-muted-foreground/20 shrink-0 group-hover:text-muted-foreground/40 transition-colors" />
      </div>
    </a>
  );
}
