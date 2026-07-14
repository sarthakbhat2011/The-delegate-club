"use client";

import { useRef, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scale, Gavel, MonitorPlay, Users, Award } from "lucide-react";

const pillars = [
  {
    title: "Model UN",
    description: "Flagship conferences featuring high-stakes crisis committees and international delegations.",
    icon: <Award className="w-8 h-8 text-[var(--color-brand-crimson-light)]" />,
  },
  {
    title: "Auctions",
    description: "Curated bidding lots for charity, emphasizing exclusivity and luxury.",
    icon: <Gavel className="w-8 h-8 text-[var(--color-brand-gold)]" />,
  },
  {
    title: "Hackathons",
    description: "Intense builder culture sprints with elite mentors and substantial prize pools.",
    icon: <MonitorPlay className="w-8 h-8 text-[var(--color-brand-crimson)]" />,
  },
  {
    title: "Programmes",
    description: "Immersive leadership tracks designed to forge the next generation of industry titans.",
    icon: <Scale className="w-8 h-8 text-[var(--color-brand-gold)]" />,
  },
  {
    title: "Socials",
    description: "Exclusive networking featuring Sufi Nights, pitch sessions, and black-tie galas.",
    icon: <Users className="w-8 h-8 text-[var(--color-brand-crimson-light)]" />,
  },
];

export function EventsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="events" className="relative py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif italic mb-4">The Pillars</h2>
            <p className="text-gray-400 font-sans max-w-xl text-lg">
              Experiences engineered for the exceptional.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={pillar.title} ref={(el) => { cardsRef.current[idx] = el; }}>
              <motion.div
                whileHover={{ scale: 1.03, y: -10, rotateY: 5, rotateX: 2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="h-full"
              >
                <GlassCard className="h-full flex flex-col justify-between group shadow-2xl shadow-black/50">
                  <div className="mb-8 p-3 rounded-xl bg-white/5 w-fit border border-white/5 group-hover:border-[var(--color-brand-crimson)]/30 transition-colors">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif italic mb-3 group-hover:text-[var(--color-brand-gold)] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-400 font-sans font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
