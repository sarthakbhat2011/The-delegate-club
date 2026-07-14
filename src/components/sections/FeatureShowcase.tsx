"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticText } from "@/components/ui/KineticText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    title: "Model UN Conferences",
    desc: "Engage in high-level geopolitical debate with delegates from across the globe.",
    color: "from-[var(--color-brand-black)] to-[var(--color-brand-charcoal)]",
    parallax: 0.1
  },
  {
    title: "Charity Auctions",
    desc: "Exclusive bidding events where luxury meets philanthropy.",
    color: "from-[var(--color-brand-charcoal)] to-[var(--color-brand-black)]",
    parallax: 0.15
  },
  {
    title: "Elite Hackathons",
    desc: "48 hours of intense coding, judged by top-tier venture capitalists.",
    color: "from-[var(--color-brand-primary)] to-[var(--color-brand-black)]",
    parallax: 0.2
  }
];

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

function InteractiveCard({ feature, index, cardRef }: { feature: any, index: number, cardRef: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative flex w-full flex-col justify-start overflow-hidden rounded-3xl p-8 glass-card shadow-2xl bg-gradient-to-br ${feature.color} border border-white/5 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white/20`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(212,175,55,0.08),
              transparent 80%
            )
          `,
        }}
      />
      {/* Ambient background number with subtle hover scale/move */}
      <div 
        className="absolute -right-10 -bottom-10 text-[12rem] font-serif italic text-white/[0.03] pointer-events-none select-none leading-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-4"
      >
        0{index + 1}
      </div>

      {/* Content wrapper with slight magnetic push on hover */}
      <div className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-2">
        <h3 className="text-3xl font-serif italic mb-4 text-[var(--color-brand-gold)] drop-shadow-md">
          {feature.title}
        </h3>
        <p className="text-[1.05rem] font-sans text-gray-300 font-light leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </div>
  );
}

export function FeatureShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-[var(--color-brand-black)]">
      
      <div className="text-center mb-20">
        <KineticText text="The Experience" className="text-5xl md:text-7xl mb-6" />
        <p className="text-gray-400 font-sans max-w-xl mx-auto px-4 text-lg">
          An ecosystem designed for those who shape the future.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <InteractiveCard 
              key={i} 
              feature={feature} 
              index={i} 
              cardRef={(el: any) => { cardsRef.current[i] = el; }} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
