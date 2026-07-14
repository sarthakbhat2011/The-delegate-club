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
      className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--color-brand-khaki-sand)] flex flex-col items-center justify-center pt-20"
    >
      {/* Background Palace Arches Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.2] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598977123418-45f04b615e0e?q=80&w=1920&auto=format&fit=crop')" }}
      />

      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Giant background text outline */}
        <div className="absolute top-[10%] left-[-10%] w-[120%] opacity-[0.02] select-none flex whitespace-nowrap text-black">
           <span className="text-[20vw] font-black uppercase leading-none">SABHA</span>
        </div>
        
        {/* Floating Gen Z / Heritage Badges */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] bg-[var(--color-brand-saffron)] text-black border-2 border-black rounded-full px-6 py-2 shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center gap-2 rotate-[-12deg]"
        >
          <span className="font-black text-lg animate-spin-slow inline-block">☸</span>
          <span className="font-bold uppercase tracking-tight text-sm">Royal Court</span>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[25%] right-[10%] bg-[var(--color-brand-emerald)] border-2 border-black rounded-full px-6 py-2 shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center gap-2 rotate-[8deg] text-white"
        >
          <span className="font-black text-sm">✦</span>
          <span className="font-bold uppercase tracking-tight text-sm">The Royal Darbar</span>
        </motion.div>
        
        {/* Soft heritage color gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-brand-saffron)] mix-blend-multiply filter blur-[120px] opacity-15 animate-[pulse_8s_infinite_alternate]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[var(--color-brand-emerald)] mix-blend-multiply filter blur-[140px] opacity-15 animate-[pulse_10s_infinite_alternate_reverse]" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center w-full px-4 max-w-7xl mx-auto text-center mt-12"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="flex flex-col items-center"
        >
          <h1 className="font-sans font-black text-6xl sm:text-7xl md:text-[6.5rem] lg:text-[8.5rem] leading-[1.1] tracking-tighter text-black uppercase mb-6 flex flex-col items-center gap-3">
            {/* "The" with tilted terracotta card behind 'T' */}
            <motion.span 
              whileHover={{ y: -6 }}
              className="inline-block transition-transform duration-200 cursor-default select-none"
              style={{ textShadow: "2.5px 2.5px 0px #FF9933, 5px 5px 0px #1D1E2C" }}
            >
              The
            </motion.span>

            {/* "Delegate" with saffron shadow */}
            <motion.span 
              whileHover={{ y: -6 }}
              className="inline-block text-black transition-transform duration-200 cursor-default select-none"
              style={{ textShadow: "2.5px 2.5px 0px #FF9933, 5px 5px 0px #1D1E2C" }}
            >
              Delegate
            </motion.span>

            {/* "Club" with saffron shadow */}
            <motion.span 
              whileHover={{ y: -6 }}
              className="inline-block text-black transition-transform duration-200 cursor-default select-none"
              style={{ textShadow: "2.5px 2.5px 0px #FF9933, 5px 5px 0px #1D1E2C" }}
            >
              Club
            </motion.span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-2xl font-bold text-gray-700 tracking-tight leading-snug mb-10">
            A royal court of debate run by Gen Z. We host elite assemblies, engineer state-of-the-art tech, and curate soulful Sufi concert nights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-black text-white text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-xl border-2 border-black shadow-[6px_6px_0px_var(--color-brand-saffron)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_var(--color-brand-saffron)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-2 group cursor-pointer">
              Join the Court
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-black text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center cursor-pointer">
              Our Legacy
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Infinite Marquee Banner at bottom of hero */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden border-y-2 border-black bg-[var(--color-brand-marigold)] py-3 z-20 flex whitespace-nowrap transform -rotate-1">
        <div className="animate-marquee inline-block font-black uppercase text-xl tracking-tight text-black">
          <span className="mx-4">• DIPLOMATIC COUNCILS</span>
          <span className="mx-4">• HACKATHONS</span>
          <span className="mx-4">• SUFI NIGHT CONCERTS</span>
          <span className="mx-4">• DHOL BEATS</span>
          <span className="mx-4">• SHARK TANK</span>
          <span className="mx-4">• DIPLOMATIC COUNCILS</span>
          <span className="mx-4">• HACKATHONS</span>
          <span className="mx-4">• SUFI NIGHT CONCERTS</span>
          <span className="mx-4">• DHOL BEATS</span>
          <span className="mx-4">• SHARK TANK</span>
          <span className="mx-4">• DIPLOMATIC COUNCILS</span>
          <span className="mx-4">• HACKATHONS</span>
          <span className="mx-4">• SUFI NIGHT CONCERTS</span>
          <span className="mx-4">• DHOL BEATS</span>
          <span className="mx-4">• SHARK TANK</span>
        </div>
      </div>
    </section>
  );
}
