"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ClosingBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    if (!textRef.current || !containerRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-40 flex items-center justify-center bg-[var(--color-brand-charcoal)] overflow-hidden">
      
      {/* Dramatic Gold-Foil Sweep Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent skew-x-[-20deg] translate-x-[-150%] animate-[shimmer_5s_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-black)] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 text-center px-4" ref={textRef}>
        <h2 
          className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-10 text-[#E8E8E8] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] pb-4 pr-4 leading-tight"
        >
          Ready to take your seat?
        </h2>
        <MagneticButton magneticStrength={0.5} className="bg-[var(--color-brand-black)] border-[#D4AF37]/50 hover:border-[#D4AF37]">
          Submit Application
        </MagneticButton>
      </div>

    </section>
  );
}
