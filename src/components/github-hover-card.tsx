"use client";

import { useState, useCallback, ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { Users, GitFork } from "lucide-react";

interface GitHubData {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
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
    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
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
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-muted" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 w-24 rounded bg-muted" />
          <div className="h-3 w-20 rounded bg-muted" />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-3/4 rounded bg-muted" />
      </div>
      <div className="flex gap-4">
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
      </div>
    </div>
  );
}

let cachedData: GitHubData | null = null;

export function GitHubHoverCard({ children }: { children: ReactNode }) {
  const [data, setData] = useState<GitHubData | null>(cachedData);
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
      const res = await fetch("/api/github-stats");
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
        align="start"
        collisionPadding={16}
        className="w-72 border-border/60 bg-card/95 backdrop-blur-xl backdrop-saturate-150 shadow-xl"
      >
        {loading && !data ? (
          <Skeleton />
        ) : error && !data ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icons.github className="size-4" />
            <span>Could not load profile</span>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border border-border/50">
                <AvatarImage src={data.avatar_url} alt={data.name} />
                <AvatarFallback>{data.name?.[0] ?? "G"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold truncate">{data.name}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  @{data.login}
                </p>
              </div>
              <Icons.github className="size-4 text-muted-foreground shrink-0" />
            </div>

            {data.bio && (
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {data.bio}
              </p>
            )}

            <div className="flex items-center gap-4 pt-0.5">
              <StatPill icon={Users} value={data.followers} label="Followers" />
              <StatPill
                icon={GitFork}
                value={data.following}
                label="Following"
              />
            </div>
          </div>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  );
}
