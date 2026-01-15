"use client";

import React from "react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";

export function GithubContributions() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fixed container height to prevent layout shift
  const containerHeight = "min-h-[200px]";

  return (
    <div className={`relative overflow-hidden rounded-xl ${containerHeight}`}>
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-purple-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-pink-500 to-transparent"
      />
      <motion.div
        className={`w-full overflow-hidden rounded-xl bg-card hover:shadow-lg transition-shadow duration-300 p-4 ${containerHeight}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {!mounted ? (
          <div className="w-full h-[160px] rounded-lg bg-muted/50 animate-pulse" />
        ) : (
          <div className="p-4 hover:scale-[1.02] transition-transform duration-300">
            <GitHubCalendar
              username="StarKnightt"
              colorScheme={resolvedTheme as "light" | "dark"}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}