"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

export function HeroMotion() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100svh] w-full overflow-hidden bg-transparent flex flex-col items-center justify-center pt-20"
    >
      {/* Background Palace Arches Overlay - Blend in dark and light modes */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] dark:opacity-[0.05] pointer-events-none mix-blend-overlay dark:mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598977123418-45f04b615e0e?q=80&w=1920&auto=format&fit=crop')" }}
      />

      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Giant background text outline */}
        <div className="absolute top-[10%] left-[-10%] w-[120%] opacity-[0.03] dark:opacity-[0.02] select-none flex whitespace-nowrap text-foreground">
           <span className="text-[20vw] font-black uppercase leading-none">SABHA</span>
        </div>
        
        {/* Floating Stained-Glass Badges */}
        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [-12, -8, -12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[8%] bg-amber-500/10 dark:bg-amber-500/5 backdrop-blur-md text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full px-5 py-2 shadow-[0_0_15px_-3px_rgba(217,119,6,0.3)] flex items-center gap-2 rotate-[-12deg]"
        >
          <span className="font-black text-base animate-spin-slow inline-block">☸</span>
          <span className="font-extrabold uppercase tracking-widest text-xs">Royal Court</span>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 12, 0], rotate: [8, 12, 8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[25%] right-[8%] bg-emerald-500/10 dark:bg-emerald-500/5 backdrop-blur-md border border-emerald-500/30 rounded-full px-5 py-2 shadow-[0_0_15px_-3px_rgba(5,150,105,0.3)] flex items-center gap-2 rotate-[8deg] text-emerald-600 dark:text-emerald-400"
        >
          <span className="font-black text-sm">✦</span>
          <span className="font-extrabold uppercase tracking-widest text-xs">The Royal Darbar</span>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center w-full px-4 max-w-7xl mx-auto text-center mt-12"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="flex flex-col items-center"
        >
          <h1 className="font-sans font-black text-4xl xs:text-5xl sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem] leading-[1.05] tracking-tighter text-black dark:text-white uppercase mb-6 flex flex-col items-center gap-1 select-none">
            {/* "The" with tilted terracotta card behind 'T' */}
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="inline-block transition-transform duration-200 cursor-default bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500 bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 2px 8px rgba(225, 29, 72, 0.15))" }}
            >
              The
            </motion.span>

            {/* "Delegate" with saffron shadow */}
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="inline-block transition-transform duration-200 cursor-default bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-400 dark:to-rose-400 bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 2px 8px rgba(217, 119, 6, 0.15))" }}
            >
              Delegate
            </motion.span>

            {/* "Club" with saffron shadow */}
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="inline-block transition-transform duration-200 cursor-default bg-gradient-to-r from-rose-500 to-amber-500 dark:from-rose-500 dark:to-amber-300 bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 2px 8px rgba(225, 29, 72, 0.15))" }}
            >
              Club
            </motion.span>
          </h1>
          
          <p className="max-w-2xl text-base md:text-xl font-bold text-zinc-700 dark:text-zinc-300 tracking-tight leading-snug mb-10">
            A royal court of debate run by Gen Z. We host elite assemblies, engineer state-of-the-art tech, and curate soulful Sufi concert nights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-base font-black uppercase tracking-widest px-8 py-4 rounded-2xl border border-white/20 shadow-[0_4px_20px_-2px_rgba(225,29,72,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer">
              Join the Court
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md text-black dark:text-white text-base font-black uppercase tracking-widest px-8 py-4 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer">
              Our Legacy
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Infinite Marquee Banner at bottom of hero - Translucent glass strip */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden border-y border-black/10 dark:border-white/10 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md py-3.5 z-20 flex whitespace-nowrap transform -rotate-1">
        <div className="animate-marquee inline-block font-black uppercase text-sm tracking-widest text-black dark:text-zinc-300">
          <span className="mx-6 text-rose-500 dark:text-rose-400">• DIPLOMATIC COUNCILS</span>
          <span className="mx-6 text-amber-500 dark:text-amber-400">• HACKATHONS</span>
          <span className="mx-6 text-indigo-500 dark:text-indigo-400">• SUFI NIGHT CONCERTS</span>
          <span className="mx-6 text-emerald-500 dark:text-emerald-400">• DHOL BEATS</span>
          <span className="mx-6 text-rose-500 dark:text-rose-400">• SHARK TANK</span>
          <span className="mx-6 text-amber-500 dark:text-amber-400">• DIPLOMATIC COUNCILS</span>
          <span className="mx-6 text-indigo-500 dark:text-indigo-400">• HACKATHONS</span>
          <span className="mx-6 text-emerald-500 dark:text-emerald-400">• SUFI NIGHT CONCERTS</span>
        </div>
      </div>
    </section>
  );
}
