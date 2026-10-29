"use client"

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCloud({ className, delay = 0, duration = 20 }: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x: "-100%" }}
      animate={{ x: "100vw" }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: delay,
      }}
    >
      <svg
        width="180"
        height="100"
        viewBox="0 0 180 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M165.243 57.95C161.019 41.214 146.761 29.099 129.764 29.099C123.221 29.099 116.883 30.815 111.427 34.003C102.94 16.002 85.085 3.998 64.757 3.998C35.269 3.998 11.262 27.899 11.262 57.261C11.262 58.189 11.288 59.112 11.339 60.03C4.75 65.508 0.5 74.19 0.5 83.9C0.5 100.063 13.55 113 29.85 113H158.65C169.798 113 178.845 104.024 178.845 92.962C178.845 79.988 173.209 69.077 165.243 57.95Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
      </svg>
    </motion.div>
  );
}

export function GhibliSpirit({ className }: { className?: string }) {
  return (
    <motion.div
      className={`${className} floating-animation`}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <svg
        width="40"
        height="50"
        viewBox="0 0 40 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2C16.2 2 13.5 5.8 13.5 10.5C13.5 15.2 16.2 19 20 19C23.8 19 26.5 15.2 26.5 10.5C26.5 5.8 23.8 2 20 2Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
        <path
          d="M19.9999 17C16.6862 17 14.5 22.3726 14.5 29C14.5 35.6274 16.6862 41 19.9999 41C23.3137 41 25.5 35.6274 25.5 29C25.5 22.3726 23.3137 17 19.9999 17Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
        <ellipse cx="17" cy="9" rx="1.5" ry="2" fill="black" />
        <ellipse cx="23" cy="9" rx="1.5" ry="2" fill="black" />
      </svg>
    </motion.div>
  );
}

export function LeafDecoration({ className }: { className?: string }) {
  return (
    <div className={`${className} absolute pointer-events-none`}>
      <svg
        width="100"
        height="80"
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.5 2C14.5 15.5 10.5 35 23.5 48C36.5 61 61.5 58 78 47C94.5 36 94.5 13 78 5C61.5 -3 32.5 -11.5 23.5 2Z"
          fill="#A5D6A7"
          fillOpacity="0.2"
        />
      </svg>
    </div>
  );
}

function CloudPool({ index }: { index: number }) {
  // Using the exact same cloud patterns as the original
  const cloudPatterns = [
    { className: "top-[10%] opacity-80", delay: 0, duration: 20 },
    { className: "top-[5%] opacity-90 scale-75", delay: 7, duration: 25 },
    { className: "top-[15%] opacity-70 scale-50", delay: 3, duration: 18 },
  ];

  const pattern = cloudPatterns[index % cloudPatterns.length];
  return (
    <FloatingCloud 
      className={pattern.className}
      delay={pattern.delay}
      duration={pattern.duration}
    />
  );
}

export function GhibliSkyBackground() {
  const [isVisible, setIsVisible] = useState(true);
  const CLOUD_COUNT = 4; //cloud count

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <>
            {Array.from({ length: CLOUD_COUNT }).map((_, index) => (
              <CloudPool key={index} index={index} />
            ))}
          </>     
        )}
      </AnimatePresence>
      <GhibliSpirit className="absolute top-[20%] right-[15%]" />
      <GhibliSpirit className="absolute bottom-[30%] left-[10%] scale-75" />
      <LeafDecoration className="top-[5%] right-[5%] rotate-45" />
      <LeafDecoration className="bottom-[10%] left-[5%] rotate-12" />
    </div>
  );
}