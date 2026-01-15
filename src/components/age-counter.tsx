"use client";

import { useEffect, useState } from "react";

const calculateYears = () => {
  const birthDate = new Date('2003-06-27T04:00:00');
  const now = new Date();
  const ageInYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return ageInYears.toFixed(9);
};

export function AgeCounter() {
  const [years, setYears] = useState<string | null>(null);

  useEffect(() => {
    // Only calculate on client to avoid hydration mismatch
    setYears(calculateYears());
    
    const interval = setInterval(() => {
      setYears(calculateYears());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Show placeholder until mounted to prevent hydration mismatch
  if (years === null) {
    return (
      <div className="text-sm font-bold min-h-[20px]">
        <span className="tabular-nums opacity-0">been on earth for 00.000000000 years</span>
      </div>
    );
  }

  return (
    <div className="text-sm font-bold min-h-[20px]">
      <span className="tabular-nums">
        been on earth for {years} years
      </span>
    </div>
  );
}

// I hope you guys understand this code, if you don't, please ask me.