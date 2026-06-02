"use client";

import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Image } from "lucide-react";

const INSTAGRAM_PROFILE = {
  name: "Star Knight",
  handle: "starknight_143",
  avatar: "/hi2.webp",
  bio: "22, Code 👨‍💻",
  followers: 389,
  posts: 0,
};

function StatPill({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number | string;
  label: string;
}) {
  const formatted =
    typeof value === "number"
      ? value >= 1_000_000
        ? `${(value / 1_000_000).toFixed(1)}M`
        : value >= 1_000
          ? `${(value / 1_000).toFixed(1)}k`
          : String(value)
      : value;
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="size-3.5" />
      <span className="font-medium text-foreground">{formatted}</span>
      <span>{label}</span>
    </div>
  );
}

export function InstagramHoverCard({ children }: { children: ReactNode }) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
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
              <AvatarImage src={INSTAGRAM_PROFILE.avatar} alt={INSTAGRAM_PROFILE.name} referrerPolicy="no-referrer" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate">{INSTAGRAM_PROFILE.name}</p>
                <InstagramIcon />
              </div>
              <p className="text-xs text-muted-foreground truncate">@{INSTAGRAM_PROFILE.handle}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {INSTAGRAM_PROFILE.bio}
          </p>
          <div className="flex items-center gap-3 pt-0.5">
            <StatPill icon={Users} value={INSTAGRAM_PROFILE.followers} label="Followers" />
            <StatPill icon={Image} value={INSTAGRAM_PROFILE.posts} label="Posts" />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function InstagramIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
