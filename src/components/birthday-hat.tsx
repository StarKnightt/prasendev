"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const BIRTHDAY_MONTH = 5; // June (0-indexed)
const BIRTHDAY_DATE = 27;

function PartyHat() {
  return (
    <svg
      width="54"
      height="70"
      viewBox="0 0 56 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))" }}
    >
      <defs>
        <linearGradient
          id="ph-body"
          x1="8"
          y1="6"
          x2="48"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <clipPath id="ph-cone">
          <path d="M28 5 L49 59 L7 59 Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#ph-cone)">
        <rect x="0" y="0" width="56" height="62" fill="url(#ph-body)" />
        <g stroke="#22d3ee" strokeWidth="6" strokeLinecap="round">
          <line x1="-8" y1="26" x2="40" y2="-12" />
          <line x1="2" y1="62" x2="64" y2="16" />
        </g>
        <g stroke="#fcd34d" strokeWidth="5" strokeLinecap="round">
          <line x1="-6" y1="46" x2="54" y2="2" />
          <line x1="12" y1="74" x2="72" y2="32" />
        </g>
      </g>

      {/* Brim */}
      <ellipse cx="28" cy="59" rx="22" ry="5.5" fill="#f472b6" />
      <ellipse cx="28" cy="57.5" rx="22" ry="5" fill="#fb7185" />

      {/* Pom-pom */}
      <circle cx="28" cy="6" r="6.5" fill="#fde68a" />
      <circle cx="26" cy="4.5" r="2" fill="#fffbeb" />
    </svg>
  );
}

export function BirthdayHat() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  // Date check runs after mount to avoid SSR/timezone hydration mismatches.
  useEffect(() => {
    const now = new Date();
    setShow(now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DATE);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20 origin-bottom"
      style={{ top: -50, left: 30 }}
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1, rotate: 0 }
          : { opacity: 1, scale: 1, rotate: [-5, 5, -5], y: [0, -2, 0] }
      }
      transition={
        reduce
          ? { duration: 0.3 }
          : {
              opacity: { duration: 0.4 },
              scale: { type: "spring", stiffness: 300, damping: 13 },
              rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }
      }
    >
      <PartyHat />
    </motion.div>
  );
}
