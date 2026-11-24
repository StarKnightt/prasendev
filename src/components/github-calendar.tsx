"use client";

import React from "react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { isHalloweenDate } from "@/lib/season";

// Sepia ink washes on paper: the empty day is a faint pressed square,
// busy days soak darker until they read as solid ink.
const CALENDAR_THEME = {
  dark: ["#26201a", "#4a3c2c", "#7a6246", "#b3956b", "#ead8b4"],
  light: ["#e2d6bf", "#cdb38c", "#a6845a", "#6f5236", "#2f2116"],
};

const HALLOWEEN_CALENDAR_THEME = {
  dark: ['#1a1410', '#4a2410', '#9a3f12', '#e05a14', '#f5a524'],
  light: ['#f3ebe3', '#f5c48a', '#e07820', '#c2410c', '#7c2d12'],
};

export function GithubContributions({ plain = false }: { plain?: boolean }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [halloween, setHalloween] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setHalloween(isHalloweenDate());
  }, []);

  const calendarTheme = halloween ? HALLOWEEN_CALENDAR_THEME : CALENDAR_THEME;

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
            theme={calendarTheme}
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
      <motion.div
        className={`w-full overflow-hidden rounded-lg border border-border/70 bg-card/50 p-4 ${containerHeight}`}
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
              theme={calendarTheme}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}