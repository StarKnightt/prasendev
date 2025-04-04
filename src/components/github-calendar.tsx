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

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  if (!mounted) {
    return (
      <div className="w-full h-[160px] rounded-xl bg-muted animate-pulse" />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
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
        className="w-full overflow-hidden rounded-xl bg-card hover:shadow-lg transition-shadow duration-300 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 hover:scale-[1.02] transition-transform duration-300">
          <GitHubCalendar
            username="Dev-Huang1"
            colorScheme={resolvedTheme as "light" | "dark"}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
          />
        </div>
      </motion.div>
    </div>
  );
}
