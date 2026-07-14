"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
}

export function MagneticButton({ 
  children, 
  className, 
  magneticStrength = 0.5,
  ...props 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * magneticStrength);
      yTo(y * magneticStrength);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      xTo(0);
      yTo(0);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [magneticStrength]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden glass-card px-8 py-4 rounded-full font-sans font-medium text-lg tracking-wide",
        "transition-all duration-300 ease-in-out",
        isHovered && "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-[1.02] bg-white/5 text-white",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Gold-Foil Hover Sweep */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent",
          "translate-x-[-150%] skew-x-[-30deg] transition-transform duration-700 ease-in-out z-0 pointer-events-none",
          isHovered && "translate-x-[150%]"
        )}
      />
    </button>
  );
}
