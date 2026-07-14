"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Stamp } from "lucide-react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;
    
    // Fallback for touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickTo for high performance following
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[9999]",
        "mix-blend-difference transform-gpu -translate-x-1/2 -translate-y-1/2 flex items-center justify-center",
        "transition-all duration-300 ease-out hidden md:flex",
        isHovering && "scale-150 bg-[var(--color-brand-onyx)] border-[var(--color-brand-silver)] backdrop-blur-sm mix-blend-normal"
      )}
      style={{ willChange: "transform" }}
    >
      <Stamp 
        className={cn(
          "w-3 h-3 text-white transition-opacity duration-300", 
          isHovering ? "opacity-100 text-[var(--color-brand-silver-light)]" : "opacity-0"
        )} 
      />
    </div>
  );
}
