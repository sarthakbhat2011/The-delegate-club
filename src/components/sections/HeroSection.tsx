"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BlurText } from "@/components/ui/BlurText";


export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex overflow-hidden items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/renaissance_bg.png"
          alt="Classical Renaissance Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>



      {/* Main Animated Text Overlay */}
      <div className="relative z-20 text-center w-full px-6 flex justify-center pointer-events-none">
        <BlurText
          text="The Delegates Club"
          delay={150}
          animateBy="words"
          direction="bottom"
          className="text-6xl md:text-8xl lg:text-[9rem] font-serif italic text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] bg-[linear-gradient(135deg,#FFFFFF_0%,#C0C0C0_50%,#808080_100%)]"
        />
      </div>

      {/* Tech Overlays - Bounding Boxes */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-[20%] left-[30%] w-32 h-40 border border-white/30 flex items-start justify-start p-1 backdrop-blur-[2px]"
        >
          <div className="text-[8px] font-mono text-white/70 bg-white/10 px-1 backdrop-blur-md">
            ID: 0.1429
          </div>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-[40%] right-[25%] w-24 h-24 border border-[var(--color-brand-crimson)]/50 flex items-start justify-start p-1 backdrop-blur-[2px]"
        >
          <div className="text-[8px] font-mono text-[var(--color-brand-crimson-light)] bg-black/20 px-1 backdrop-blur-md">
            TRGT: 1.4286
          </div>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-brand-crimson)]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-brand-crimson)]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-brand-crimson)]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-brand-crimson)]" />
        </motion.div>

        {/* Censor / Pixelated Bar Mock */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute top-[35%] left-[45%] w-16 h-8 bg-black/30 backdrop-blur-[10px] border border-white/10"
        />
      </div>
    </section>
  );
}
