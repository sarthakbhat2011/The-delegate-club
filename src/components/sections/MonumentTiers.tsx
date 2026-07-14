"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

interface Tier {
  id: number;
  domain: string;
  href: string;
  subtitle: string;
  description: string;
  color: string;
  glow: string;
  symbol: string;
}

const tiers: Tier[] = [
  {
    id: 5,
    domain: "Legacy",
    href: "/about",
    subtitle: "The Court Heritage & Archives",
    description: "Delve into the roots of the club, established in 2015. Our foundational values, code of honor, and governing charter.",
    color: "bg-[var(--color-brand-saffron)]",
    glow: "shadow-[0_0_25px_rgba(255,153,51,0.6)] border-[var(--color-brand-saffron)]",
    symbol: "👑"
  },
  {
    id: 4,
    domain: "Events",
    href: "/events",
    subtitle: "The Assembly of Scholars",
    description: "Diplomatic Model UN simulations, high-adrenaline hackathons, soulful Sufi concert nights, and live entrepreneurial pitches.",
    color: "bg-[var(--color-brand-marigold)]",
    glow: "shadow-[0_0_25px_rgba(255,195,0,0.6)] border-[var(--color-brand-marigold)]",
    symbol: "🏛"
  },
  {
    id: 3,
    domain: "Archives",
    href: "/gallery",
    subtitle: "Visual Chronicles & Memorabilia",
    description: "A digital gallery showcasing moments from our past assemblies, Sufi concerts, elite auctions, and prestigious guest lectures.",
    color: "bg-[var(--color-brand-terracotta)]",
    glow: "shadow-[0_0_25px_rgba(193,92,61,0.6)] border-[var(--color-brand-terracotta)]",
    symbol: "🖼"
  },
  {
    id: 2,
    domain: "Gazette",
    href: "/news",
    subtitle: "Sutra of the Court (Updates)",
    description: "Stay updated with our latest press releases, debate briefs, society bulletins, policy papers, and upcoming registration notices.",
    color: "bg-[var(--color-brand-electric-blue)]",
    glow: "shadow-[0_0_25px_rgba(37,99,235,0.6)] border-[var(--color-brand-electric-blue)]",
    symbol: "📰"
  },
  {
    id: 1,
    domain: "Join",
    href: "/join",
    subtitle: "Court Entry & Application Gate",
    description: "Enter the court of delegates. File your application, verify credentials, and join the elite network of student leaders.",
    color: "bg-[var(--color-brand-emerald)]",
    glow: "shadow-[0_0_25px_rgba(19,136,8,0.6)] border-[var(--color-brand-emerald)]",
    symbol: "🔑"
  }
];

export function MonumentTiers() {
  const [activeTierId, setActiveTierId] = useState<number>(3); // Defaults to central tier

  const activeTier = tiers.find(t => t.id === activeTierId) || tiers[2];

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--color-brand-deep-indigo)] text-white border-t-2 border-black">
      {/* Subtle mandala background pattern spinning slowly */}
      <div className="absolute top-[20%] left-[-20%] w-[60vw] h-[60vw] rounded-full border border-white/5 opacity-10 pointer-events-none animate-spin-slow flex items-center justify-center">
        <div className="w-[80%] h-[80%] rounded-full border border-dashed border-white/10" />
        <div className="w-[50%] h-[50%] rounded-full border border-white/15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--color-brand-saffron)] font-bold uppercase tracking-wider text-sm inline-flex items-center gap-2 mb-3"
          >
            <Compass className="w-4 h-4 animate-spin-slow" /> Structural Navigation Hub
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            The Great <span className="text-[var(--color-brand-marigold)]">Monument</span> of Domains
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            Explore the different chambers of The Delegate Club styled as a monumental multi-tiered tower representing our organization's core domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          {/* Left Side: Interactive Monument Tower */}
          <div className="lg:col-span-6 flex flex-col items-center justify-end h-full pt-8">
            <div className="relative flex flex-col items-center w-full max-w-[450px]">
              
              {/* Stacked tiers narrowing upwards resembling a Gopuram temple tower */}
              {tiers.map((tier) => {
                const isActive = activeTierId === tier.id;
                
                // Narrowing width formula based on floor height
                // Floor 5: 50% width, Floor 1: 100% width
                const widthPercent = 50 + (tier.id - 1) * 12.5;

                return (
                  <motion.div
                    key={tier.id}
                    onClick={() => setActiveTierId(tier.id)}
                    className="relative cursor-pointer w-full group mb-2"
                    style={{ width: `${widthPercent}%` }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* The Tier Floor Structure */}
                    <div 
                      className={`h-16 md:h-20 border-2 border-black rounded-xl ${tier.color} transition-all duration-300 flex items-center justify-between px-6 md:px-8 relative overflow-hidden text-black shadow-[4px_4px_0px_rgba(0,0,0,0.5)] ${isActive ? tier.glow : "hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)]"}`}
                    >
                      {/* Indian Carving Lines background overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none opacity-40" />

                      {/* Floor Pillar Details left and right */}
                      <div className="absolute left-1 top-2 bottom-2 w-1.5 bg-black/20 rounded" />
                      <div className="absolute right-1 top-2 bottom-2 w-1.5 bg-black/20 rounded" />

                      {/* Floor content */}
                      <div className="flex items-center gap-3 relative z-10">
                        <span className="w-8 h-8 rounded-full border border-black/30 flex items-center justify-center font-black text-xs bg-white/20 select-none">
                          {tier.id}F
                        </span>
                        <span 
                          className="font-sans font-black text-lg md:text-xl uppercase tracking-wider text-black"
                          style={{ textShadow: "1.5px 1.5px 0px #FF9933, 3px 3px 0px #1D1E2C" }}
                        >
                          {tier.domain}
                        </span>
                      </div>

                      {/* Icon Indicator */}
                      <div className="relative z-10 flex items-center gap-2">
                        <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                          {tier.symbol}
                        </span>
                      </div>
                    </div>

                    {/* Left/Right Floating Flags/Glows */}
                    {isActive && (
                      <>
                        <div className="absolute left-[-24px] top-[30%] w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-[var(--color-brand-marigold)] border-b-[8px] border-b-transparent animate-pulse" />
                        <div className="absolute right-[-24px] top-[30%] w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[var(--color-brand-marigold)] border-b-[8px] border-b-transparent animate-pulse" />
                      </>
                    )}
                  </motion.div>
                );
              })}
              
              {/* Pedestal Base of the Monument */}
              <div className="w-[105%] h-5 bg-black border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.5)] z-0" />
              <div className="w-[110%] h-3 bg-[var(--color-brand-slate)]/40 rounded-lg mt-1 z-0" />
            </div>
          </div>

          {/* Right Side: Active Floor Chamber Details */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            <div className="glass-card border-2 border-white/10 rounded-3xl p-8 md:p-12 relative bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col min-h-[380px] justify-between">
              
              {/* Subtle background floor number vector glow */}
              <div className="absolute top-6 right-6 w-32 h-32 text-white/5 opacity-10 font-sans font-black text-8xl pointer-events-none select-none flex items-center justify-center">
                0{activeTier.id}
              </div>

              <div>
                {/* Active floor label */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1.5 rounded-full border-2 border-black text-black font-black text-xs ${activeTier.color} shadow-[2px_2px_0px_rgba(0,0,0,1)]`}>
                    FLOOR {activeTier.id}
                  </span>
                  <span className="text-[var(--color-brand-marigold)] font-bold text-sm tracking-widest uppercase">
                    CHAMBER OF {activeTier.domain}
                  </span>
                </div>

                {/* Subtitle */}
                <h3 className="text-3xl font-black tracking-tight mb-4 text-white uppercase">
                  {activeTier.subtitle}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {activeTier.description}
                </p>
              </div>

              {/* Action Button */}
              <div>
                <Link href={activeTier.href}>
                  <button 
                    className={`border-2 border-black text-black text-md font-extrabold uppercase tracking-wide px-8 py-4 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2 group cursor-pointer ${activeTier.color}`}
                  >
                    Enter Chamber
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
