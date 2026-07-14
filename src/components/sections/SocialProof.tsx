"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticText } from "@/components/ui/KineticText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
  {
    quote: "The connections I made here secured our Series A. Simply unparalleled.",
    author: "Elena R.",
    title: "Founder & CEO"
  },
  {
    quote: "Every event feels like stepping into a cinematic masterpiece.",
    author: "Marcus T.",
    title: "Creative Director"
  },
  {
    quote: "The Shark Tank pitch was rigorous, exclusive, and exactly what we needed.",
    author: "Sarah J.",
    title: "Angel Investor"
  }
];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    if (!sectionRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0, rotateY: 15 },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-[var(--color-brand-charcoal)] relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <KineticText text="Word of Mouth" className="text-5xl md:text-6xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className={cn(
                "glass-card p-10 rounded-2xl relative overflow-hidden group cursor-default",
                "perspective-1000 transform-gpu"
              )}
            >
              {/* Gold-Foil Hover Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent translate-x-[-150%] skew-x-[-30deg] transition-transform duration-700 ease-in-out z-0 pointer-events-none group-hover:translate-x-[150%]" />
              
              <div className="relative z-10">
                <div className="text-[#D4AF37] text-4xl font-serif italic mb-6">"</div>
                <p className="text-xl font-serif italic text-gray-200 mb-8 leading-relaxed">
                  {t.quote}
                </p>
                <div>
                  <div className="font-sans font-medium text-white">{t.author}</div>
                  <div className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-gray-500 mt-1">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
