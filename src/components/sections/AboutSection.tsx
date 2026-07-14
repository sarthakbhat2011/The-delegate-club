"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const stats = [
  { value: "5+", label: "Years Running" },
  { value: "10k+", label: "Delegates" },
  { value: "50+", label: "Elite Events" },
  { value: "12", label: "Global Chapters" },
];

export function AboutSection() {
  return (
    <section className="relative py-20 px-6 z-10 bg-gradient-to-b from-transparent to-[var(--color-brand-charcoal)]/50">
      <div className="max-w-7xl mx-auto">
        <GlassCard className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-4 !p-10 !bg-white/5 border-t border-b border-l-0 border-r-0 border-[var(--color-brand-gold)]/20 !rounded-none">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-serif italic mb-4 text-[var(--color-brand-gold)]">Our Mission</h2>
            <p className="text-gray-300 font-sans font-light leading-relaxed">
              We curate unparalleled environments where ambition meets opportunity. 
              The Delegates Club exists to identify, connect, and elevate the vanguard of tomorrow's leadership.
            </p>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 w-full">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center border-l border-white/10 first:border-l-0"
              >
                <div className="text-4xl md:text-5xl font-serif italic text-white mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-[var(--color-brand-crimson)] font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
