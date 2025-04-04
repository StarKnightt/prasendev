"use client"

import React from "react";
import { motion } from "framer-motion";

export function FloatingCloud({ className, delay = 0, duration = 25 }: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x: "-120%", opacity: 0.8 }}
      animate={{ x: "110vw", opacity: [0.8, 1, 0.8] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        width="200"
        height="110"
        viewBox="0 0 200 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M170 60C165 42 150 30 130 30C120 30 115 32 110 36C100 18 85 5 65 5C35 5 10 30 10 60C10 61 10 62 10 63C5 67 2 75 2 85C2 100 15 110 30 110H170C180 110 190 100 190 90C190 78 180 68 170 60Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
      </svg>
    </motion.div>
  );
}

export function GhibliRain() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[15px] bg-white opacity-60"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -20 }}
          animate={{ y: "100vh" }}
          transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </motion.div>
  );
}

export function GhibliSkyBackground() {
  return (
    <>
      <FloatingCloud className="top-[10%] opacity-80" delay={0} duration={30} />
      <FloatingCloud className="top-[5%] opacity-85 scale-75" delay={7} duration={35} />
      <FloatingCloud className="top-[15%] opacity-75 scale-50" delay={3} duration={28} />
      <GhibliRain />
    </>
  );
}
