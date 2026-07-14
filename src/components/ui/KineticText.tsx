"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  text: string;
  className?: string;
  as?: any;
  delay?: number;
}

export function KineticText({ text, className, as: Component = "h2", delay = 0 }: KineticTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    if (!containerRef.current) return;
    
    // Select all the span wrappers we created below
    const chars = containerRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "back.out(1.7)",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [delay]);

  // Split text into words and then characters for styling and animation
  return (
    <Component
      ref={containerRef}
      className={cn(
        "font-serif italic leading-[1.2]",
        "drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]",
        className
      )}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="char inline-block origin-bottom transform-gpu bg-gradient-to-br from-[#FFFFFF] via-[#E8E8E8] to-[#A0A0A0] text-transparent bg-clip-text pb-2 px-[1px]"
              style={{ display: "inline-block" }} // Required for transform
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
}
