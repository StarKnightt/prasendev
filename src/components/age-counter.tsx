"use client";

import { useEffect, useState } from "react";

export function AgeCounter() {
  const [years, setYears] = useState<string>("0.000000000");

  useEffect(() => {
    const calculateYears = () => {
      
      const birthDate = new Date('2003-06-27T04:00:00');
      
      // Current time
      const now = new Date();
      
      // Calculate age in milliseconds, then convert to years
      // 1 year = 365.25 days (accounting for leap years)
      // 1 day = 24 hours, 1 hour = 60 minutes, 1 minute = 60 seconds, 1 second = 1000 milliseconds
      const ageInYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      
      return ageInYears.toFixed(9);
    };

   
    setYears(calculateYears());

    // Update every 50ms for smoother animation (20 times per second)
    const interval = setInterval(() => {
      setYears(calculateYears());
    }, 50);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm font-bold">
      been on earth for {years} years
    </div>
  );
}

// I hope you guys understand this code, if you don't, please ask me.