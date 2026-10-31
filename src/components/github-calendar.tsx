"use client";

import React from "react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";

const CALENDAR_THEME = {
  dark: ['#1a1410', '#4a2410', '#9a3f12', '#e05a14', '#f5a524'],
  light: ['#f3ebe3', '#f5c48a', '#e07820', '#c2410c', '#7c2d12'],
};

export function GithubContributions({ plain = false }: { plain?: boolean }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (plain) {
    return (
      <div className="min-h-[150px] overflow-x-auto text-muted-foreground">
        {mounted ? (
          <GitHubCalendar
            username="StarKnightt"
            colorScheme={resolvedTheme as "light" | "dark"}
            fontSize={11}
            blockSize={11}
            blockMargin={4}
            theme={CALENDAR_THEME}
          />
        ) : (
          <div className="h-[150px] w-full rounded-lg bg-muted/50" />
        )}
      </div>
    );
  }

  // Fixed container height to prevent layout shift
  const containerHeight = "min-h-[200px]";

  return (
    <div className={`relative overflow-hidden rounded-xl ${containerHeight}`}>
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-orange-400 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-amber-300 to-transparent"
      />
      <motion.div
        className={`w-full overflow-hidden rounded-xl border border-border/60 bg-card/40 p-4 transition-all duration-300 hover:border-border hover:bg-card/70 hover:shadow-lg ${containerHeight}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {!mounted ? (
          <div className="w-full h-[160px] rounded-lg bg-muted/50 animate-pulse" />
        ) : (
          <div className="overflow-x-auto p-4 -mx-1">
            <GitHubCalendar
              username="StarKnightt"
              colorScheme={resolvedTheme as "light" | "dark"}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              theme={CALENDAR_THEME}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}