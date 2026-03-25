"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Wrench } from "lucide-react";

const tabs = [
  { id: "hardware", label: "Hardware", icon: Monitor },
  { id: "software", label: "Software", icon: Wrench },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function GadgetsFilter({
  hardware,
  software,
}: {
  hardware: React.ReactNode;
  software: React.ReactNode;
}) {
  const [active, setActive] = useState<TabId>("hardware");

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div className="inline-flex gap-1 rounded-full border border-border/40 bg-background/40 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl backdrop-saturate-150">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="relative inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
            >
              {active === tab.id && (
                <motion.span
                  layoutId="gadget-tab"
                  className="absolute inset-0 rounded-full bg-background/80 shadow-md shadow-black/10 border border-border/50 backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-2 transition-colors ${active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                <tab.icon className="size-4" />
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {active === "hardware" ? hardware : software}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
