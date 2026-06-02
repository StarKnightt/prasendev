"use client";

import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

const VERCEL_PROFILE = {
  name: "Prasenjit Nayak",
  handle: "starknightt",
  avatar: "https://unavatar.io/github/StarKnightt",
  tagline: "22, Engineer, freelancer",
  prompts: 550,
};

export function VercelHoverCard({ children }: { children: ReactNode }) {
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
        className="w-fit max-w-[260px] min-w-0 border-border/60 bg-card/95 backdrop-blur-xl backdrop-saturate-150 shadow-xl"
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-border/50 shrink-0">
              <AvatarImage src={VERCEL_PROFILE.avatar} alt={VERCEL_PROFILE.name} referrerPolicy="no-referrer" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate">{VERCEL_PROFILE.name}</p>
                <VercelIcon />
              </div>
              <p className="text-xs text-muted-foreground truncate">v0.dev/@{VERCEL_PROFILE.handle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
            <Sparkles className="size-3.5" />
            <span className="font-medium text-foreground">{VERCEL_PROFILE.prompts}</span>
            <span>Total prompts</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function VercelIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
  );
}
