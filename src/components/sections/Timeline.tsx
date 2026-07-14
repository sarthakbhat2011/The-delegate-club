"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  { year: "2022", title: "The Royal Decree", desc: "The Delegates Club was officially founded, bringing together the sharpest minds for our inaugural Model UN." },
  { year: "2023", title: "The First Hackathon", desc: "We launched our flagship 48-hour hackathon, partnering with top-tier VCs to fund student innovations." },
  { year: "2024", title: "Shark Tank & Galas", desc: "Expanded our repertoire to include a massively successful Shark Tank event and our signature Sufi Night." },
  { year: "2026", title: "The Future", desc: "Reimagined as the absolute pinnacle of university societies. Where diplomacy meets drip." }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-[var(--color-brand-charcoal)]/30">
      <div className="max-w-4xl mx-auto px-4 relative">
        <h2 className="text-4xl md:text-6xl font-serif text-center mb-20 text-[var(--color-brand-gold)]">The Royal History</h2>
        
        {/* Central Line */}
        <div className="absolute left-1/2 top-40 bottom-0 w-1 bg-[var(--color-brand-gold)]/20 -translate-x-1/2 hidden md:block">
          <motion.div 
            className="w-full bg-gradient-to-b from-[var(--color-brand-gold)] to-[var(--color-brand-burgundy)]" 
            style={{ height: lineHeight }} 
          />
        </div>

        <div className="space-y-24 relative z-10">
          {milestones.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Space for the other side */}
                <div className="hidden md:block w-[45%]" />
                
                {/* Node */}
                <div className="w-10 h-10 rounded-full border-4 border-[var(--color-brand-black)] bg-[var(--color-brand-gold)] shadow-[0_0_20px_rgba(212,175,55,0.6)] z-20 my-4 md:my-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-brand-burgundy)]" />
                </div>

                {/* Content */}
                <div className="w-full md:w-[45%] glass-panel p-8 rounded-2xl border-t-[var(--color-brand-gold)]/50 border-t-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-5xl font-serif italic text-[var(--color-brand-gold)]/30 absolute -top-4 -right-4 font-black">{item.year}</span>
                  <h3 className="text-3xl font-serif text-white mb-3 relative z-10">{item.title}</h3>
                  <p className="text-[var(--color-brand-silver)] font-sans relative z-10">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
