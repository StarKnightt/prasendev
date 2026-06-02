"use client";

import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Coffee } from "lucide-react";

const BMC_PROFILE = {
  name: "Prasenjit",
  handle: "prasen",
  avatar: "https://unavatar.io/buymeacoffee/prasen",
  tagline: "Love to create magic with code",
  supporters: 2,
};

export function BuyMeACoffeeHoverCard({ children }: { children: ReactNode }) {
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
              <AvatarImage src={BMC_PROFILE.avatar} alt={BMC_PROFILE.name} referrerPolicy="no-referrer" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate">{BMC_PROFILE.name}</p>
                <BmcIcon />
              </div>
              <p className="text-xs text-muted-foreground truncate">buymeacoffee.com/{BMC_PROFILE.handle}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {BMC_PROFILE.tagline}
          </p>
          <div className="flex items-center gap-3 pt-0.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Heart className="size-3.5 text-pink-500" />
              <span className="font-medium text-foreground">{BMC_PROFILE.supporters}</span>
              <span>Supporters</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Coffee className="size-3.5 text-amber-500" />
              <span className="font-medium text-foreground">Buy a coffee</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function BmcIcon() {
  return (
    <Coffee className="size-3.5 shrink-0 text-[#FFDD00]" />
  );
}
