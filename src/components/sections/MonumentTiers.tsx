"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tier {
  id: number;
  domain: string;
  href: string;
  subtitle: string;
  description: string;
  color: string;
  glow: string;
  symbol: string;
  accent: string;
}

const tiers: Tier[] = [
  {
    id: 5,
    domain: "Legacy",
    href: "/about",
    subtitle: "The Court Heritage & Archives",
    description: "Delve into the roots of the club, established in 2015. Our foundational values, code of honor, and governing charter.",
    color: "bg-amber-500/20 dark:bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400",
    glow: "glow-amber",
    symbol: "👑",
    accent: "text-amber-500 dark:text-amber-400"
  },
  {
    id: 4,
    domain: "Events",
    href: "/events",
    subtitle: "The Assembly of Scholars",
    description: "Diplomatic Model UN simulations, high-adrenaline hackathons, soulful Sufi concert nights, and live entrepreneurial pitches.",
    color: "bg-blue-500/20 dark:bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400",
    glow: "glow-sapphire",
    symbol: "🏛",
    accent: "text-blue-500 dark:text-blue-400"
  },
  {
    id: 3,
    domain: "Archives",
    href: "/gallery",
    subtitle: "Visual Chronicles & Memorabilia",
    description: "A digital gallery showcasing moments from our past assemblies, Sufi concerts, elite auctions, and prestigious guest lectures.",
    color: "bg-rose-500/20 dark:bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400",
    glow: "glow-ruby",
    symbol: "🖼",
    accent: "text-rose-500 dark:text-rose-400"
  },
  {
    id: 2,
    domain: "Gazette",
    href: "/news",
    subtitle: "Sutra of the Court (Updates)",
    description: "Stay updated with our latest press releases, debate briefs, society bulletins, policy papers, and upcoming registration notices.",
    color: "bg-purple-500/20 dark:bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400",
    glow: "glow-amethyst",
    symbol: "📰",
    accent: "text-purple-500 dark:text-purple-400"
  },
  {
    id: 1,
    domain: "Join",
    href: "/join",
    subtitle: "Court Entry & Application Gate",
    description: "Enter the court of delegates. File your application, verify credentials, and join the elite network of student leaders.",
    color: "bg-emerald-500/20 dark:bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400",
    glow: "glow-emerald",
    symbol: "🔑",
    accent: "text-emerald-500 dark:text-emerald-400"
  }
];

export function MonumentTiers() {
  const [activeTierId, setActiveTierId] = useState<number>(3); // Defaults to central tier

  const activeTier = tiers.find(t => t.id === activeTierId) || tiers[2];

  return (
    <section className="py-24 relative overflow-hidden bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md border-t border-black/10 dark:border-white/10 text-foreground">
      {/* Subtle mandala background pattern spinning slowly */}
      <div className="absolute top-[20%] left-[-20%] w-[60vw] h-[60vw] rounded-full border border-black/5 dark:border-white/5 opacity-5 pointer-events-none animate-spin-slow flex items-center justify-center">
        <div className="w-[80%] h-[80%] rounded-full border border-dashed border-black/10 dark:border-white/10" />
        <div className="w-[50%] h-[50%] rounded-full border border-black/10 dark:border-white/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-rose-500 dark:text-rose-400 font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 mb-3"
          >
            <Compass className="w-4 h-4 animate-spin-slow" /> Structural Navigation Hub
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            The Great <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">Monument</span> of Domains
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-bold text-sm tracking-wide">
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
                    className="relative cursor-pointer w-full group mb-3"
                    style={{ width: `${widthPercent}%` }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* The Tier Floor Structure */}
                    <div 
                      className={cn(
                        "h-16 md:h-20 border rounded-2xl transition-all duration-300 flex items-center justify-between px-6 md:px-8 relative overflow-hidden backdrop-blur-md shadow-sm",
                        tier.color,
                        isActive 
                          ? `${tier.glow} border-black/40 dark:border-white/40 scale-102` 
                          : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                      )}
                    >
                      {/* Stained Glass Glow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-40" />

                      {/* Floor Pillar Details left and right */}
                      <div className="absolute left-1.5 top-3 bottom-3 w-1 bg-black/10 dark:bg-white/10 rounded" />
                      <div className="absolute right-1.5 top-3 bottom-3 w-1 bg-black/10 dark:bg-white/10 rounded" />

                      {/* Floor content */}
                      <div className="flex items-center gap-3 relative z-10">
                        <span className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-black text-xs bg-white/20 dark:bg-black/20 select-none text-foreground">
                          {tier.id}F
                        </span>
                        <span className="font-sans font-black text-base md:text-lg uppercase tracking-widest text-foreground">
                          {tier.domain}
                        </span>
                      </div>

                      {/* Icon Indicator */}
                      <div className="relative z-10 flex items-center gap-2">
                        <span className="text-xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                          {tier.symbol}
                        </span>
                      </div>
                    </div>

                    {/* Left/Right Floating Flags/Glows */}
                    {isActive && (
                      <>
                        <div className="absolute left-[-16px] top-[40%] w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-rose-500 border-b-[6px] border-b-transparent animate-pulse" />
                        <div className="absolute right-[-16px] top-[40%] w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-rose-500 border-b-[6px] border-b-transparent animate-pulse" />
                      </>
                    )}
                  </motion.div>
                );
              })}
              
              {/* Pedestal Base of the Monument */}
              <div className="w-[105%] h-4 bg-zinc-950 dark:bg-zinc-800 border border-black/20 rounded-xl shadow-md z-0" />
              <div className="w-[110%] h-2.5 bg-zinc-400/20 dark:bg-zinc-800/40 rounded-lg mt-1.5 z-0" />
            </div>
          </div>

          {/* Right Side: Active Floor Chamber Details */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            <div className="stained-glass border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 relative bg-white/40 dark:bg-zinc-950/40 backdrop-blur-2xl shadow-2xl flex flex-col min-h-[380px] justify-between overflow-hidden">
              
              {/* Large backdrop watermark number */}
              <div className="absolute top-6 right-6 w-32 h-32 text-black/5 dark:text-white/5 font-sans font-black text-[7rem] pointer-events-none select-none flex items-center justify-center">
                0{activeTier.id}
              </div>

              <div>
                {/* Active floor label */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1.5 rounded-xl border border-black/10 dark:border-white/10 font-black text-xs uppercase ${activeTier.color}`}>
                    FLOOR {activeTier.id}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400 font-black text-xs tracking-widest uppercase">
                    CHAMBER OF {activeTier.domain}
                  </span>
                </div>

                {/* Subtitle */}
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-foreground uppercase">
                  {activeTier.subtitle}
                </h3>

                {/* Description */}
                <p className="text-zinc-700 dark:text-zinc-300 text-base md:text-lg font-medium leading-relaxed mb-8">
                  {activeTier.description}
                </p>
              </div>

              {/* Action Button */}
              <div>
                <Link href={activeTier.href}>
                  <button 
                    className={cn(
                      "border border-black/10 dark:border-white/10 text-white text-sm font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer",
                      activeTier.id === 5 && "bg-amber-600 hover:bg-amber-700",
                      activeTier.id === 4 && "bg-blue-600 hover:bg-blue-700",
                      activeTier.id === 3 && "bg-rose-600 hover:bg-rose-700",
                      activeTier.id === 2 && "bg-purple-600 hover:bg-purple-700",
                      activeTier.id === 1 && "bg-emerald-600 hover:bg-emerald-700"
                    )}
                  >
                    Enter Chamber
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
