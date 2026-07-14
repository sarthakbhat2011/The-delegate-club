"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <div className={cn("flex flex-wrap items-center gap-4 text-center font-sans", className)}>
      <div className="flex flex-col">
        <span className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-[var(--color-brand-silver-dark)]">{String(timeLeft.days).padStart(2, "0")}</span>
        <span className="text-[10px] md:text-xs tracking-[0.2em] text-[var(--color-brand-silver)] uppercase mt-1">Days</span>
      </div>
      <div className="text-2xl text-[var(--color-brand-silver)] font-light pb-4">:</div>
      <div className="flex flex-col">
        <span className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-[var(--color-brand-silver-dark)]">{String(timeLeft.hours).padStart(2, "0")}</span>
        <span className="text-[10px] md:text-xs tracking-[0.2em] text-[var(--color-brand-silver)] uppercase mt-1">Hours</span>
      </div>
      <div className="text-2xl text-[var(--color-brand-silver)] font-light pb-4">:</div>
      <div className="flex flex-col">
        <span className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-[var(--color-brand-silver-dark)]">{String(timeLeft.minutes).padStart(2, "0")}</span>
        <span className="text-[10px] md:text-xs tracking-[0.2em] text-[var(--color-brand-silver)] uppercase mt-1">Mins</span>
      </div>
      <div className="text-2xl text-[var(--color-brand-silver)] font-light pb-4">:</div>
      <div className="flex flex-col w-12">
        <span className="text-3xl md:text-4xl font-bold text-[var(--color-brand-electric-violet)] tabular-nums">{String(timeLeft.seconds).padStart(2, "0")}</span>
        <span className="text-[10px] md:text-xs tracking-[0.2em] text-[var(--color-brand-silver)] uppercase mt-1">Secs</span>
      </div>
    </div>
  );
}
