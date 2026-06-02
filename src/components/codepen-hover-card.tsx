"use client";

import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Code2 } from "lucide-react";

const CODEPEN_PROFILE = {
  name: "Prasen",
  username: "StarKnightt",
  avatar: "https://unavatar.io/codepen/StarKnightt",
  bio: "Hey, I'm Prasenjit who loves to do some magic with code.",
  followers: 319,
};

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

export function CodePenHoverCard({ children }: { children: ReactNode }) {
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
              <AvatarImage src={CODEPEN_PROFILE.avatar} alt={CODEPEN_PROFILE.name} referrerPolicy="no-referrer" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate">{CODEPEN_PROFILE.name}</p>
                <CodePenIcon />
              </div>
              <p className="text-xs text-muted-foreground truncate">@{CODEPEN_PROFILE.username}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {CODEPEN_PROFILE.bio}
          </p>
          <div className="flex items-center gap-3 pt-0.5">
            <StatPill icon={Users} value={CODEPEN_PROFILE.followers} label="Followers" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Code2 className="size-3.5" />
              <span className="font-medium text-foreground">India</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function CodePenIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.144 13.067v-2.134L16.55 12zm1.856 1.018V9.915L12 4 4 9.915v4.17l8 5.915 8-5.915zM12 16.54l-5.567-4.12 5.567-4.12 5.567 4.12L12 16.54zM5.856 13.067 4 12v1.067l1.856 1.067v-1.067zM12 7.46l5.567 4.12L12 15.7 6.433 11.58 12 7.46z" />
    </svg>
  );
}
