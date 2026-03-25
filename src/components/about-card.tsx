"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";

export function AboutCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl">
      <MagicCard
        className="rounded-xl"
        gradientSize={250}
        gradientOpacity={0.15}
        gradientFrom="#9E7AFF"
        gradientTo="#FE8BBB"
      >
        <div className="relative overflow-hidden rounded-xl p-5 sm:p-6">
          {children}
          <BorderBeam
            size={80}
            duration={8}
            colorFrom="#9E7AFF"
            colorTo="#FE8BBB"
            delay={2}
          />
        </div>
      </MagicCard>
    </div>
  );
}
