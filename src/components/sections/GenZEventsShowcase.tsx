"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Terminal, Music, Gavel, TrendingUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  {
    id: "mun",
    title: "Model UN",
    subtitle: "Global Diplomacy, Local Drip.",
    icon: Globe,
    color: "bg-[var(--color-brand-saffron)]",
    description: "Step into the shoes of global leaders. High stakes, intense debates, and midnight crisis committees.",
  },
  {
    id: "hackathon",
    title: "Hackathons",
    subtitle: "Sleep is a myth.",
    icon: Terminal,
    color: "bg-[var(--color-brand-emerald)]",
    description: "48 hours of pure coding adrenaline. Build the next big thing, consume excessive caffeine, and pitch to industry titans.",
  },

  {
    id: "auction",
    title: "Auctions",
    subtitle: "Going once. Going twice.",
    icon: Gavel,
    color: "bg-[var(--color-brand-marigold)]",
    description: "High society meets Gen Z chaos. Bid on exclusive merch, rare art, and once-in-a-lifetime experiences.",
  },
  {
    id: "sharktank",
    title: "Shark Tank",
    subtitle: "Pitch or perish.",
    icon: TrendingUp,
    color: "bg-[var(--color-brand-saffron)]",
    description: "Got an idea? Pitch it to our panel of ruthless judges. Secure funding, mentorship, and ultimate bragging rights.",
  },
];

export function GenZEventsShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[var(--color-brand-khaki-sand)] relative z-10 border-t-2 border-black overflow-hidden">
      {/* Background stone carvings texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1920&auto=format&fit=crop')" }}
      />
      {/* Background dot pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              Not Just <br/> <span className="text-[var(--color-brand-saffron)]">Another Club.</span>
            </h2>
            <p className="text-xl font-bold text-gray-500 max-w-md">
              We curate experiences that break the mold. Pick your arena.
            </p>
          </div>
          <button className="self-start md:self-end text-lg font-bold uppercase border-b-4 border-black hover:text-[var(--color-brand-hot-pink)] hover:border-[var(--color-brand-hot-pink)] transition-colors flex items-center gap-2 pb-1">
            View Calendar <ArrowUpRight className="w-5 h-5" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => {
            const Icon = event.icon;
            // Make the first two cards span more columns if we want a bento box look, 
            // or just keep them uniform. Let's make the first one wide on large screens.
            const isLarge = i === 0;
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "group relative bg-white border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:translate-x-[-2px] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col",
                  isLarge ? "md:col-span-2 lg:col-span-2" : ""
                )}
              >
                {/* Expandable color background on hover */}
                <div 
                  className={cn(
                    "absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-10 transition-transform duration-500 ease-out origin-top-right",
                    event.color,
                    hoveredId === event.id ? "scale-[15]" : "scale-100"
                  )}
                />
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className={cn(
                    "p-4 rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all",
                    hoveredId === event.id ? "text-black" : ""
                  )}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className={cn(
                    "w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform duration-300",
                    hoveredId === event.id ? "rotate-45" : ""
                  )}>
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className={cn(
                    "text-3xl font-black uppercase tracking-tight mb-2 transition-colors",
                    hoveredId === event.id ? "text-white" : "text-black"
                  )}>
                    {event.title}
                  </h3>
                  <p className={cn(
                    "font-bold text-lg mb-2 transition-colors",
                    hoveredId === event.id ? "text-white/90" : "text-[var(--color-brand-electric-blue)]"
                  )}>
                    {event.subtitle}
                  </p>
                  <p className={cn(
                    "font-medium transition-colors line-clamp-2",
                    hoveredId === event.id ? "text-white/80" : "text-gray-600"
                  )}>
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
