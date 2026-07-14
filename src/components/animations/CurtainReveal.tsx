"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function CurtainReveal({ children, className, delay = 0 }: CurtainRevealProps) {
  return (
    <div className={cn("relative overflow-hidden w-full", className)}>
      {/* Left Curtain */}
      <motion.div
        initial={{ x: "0%" }}
        whileInView={{ x: "-100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay }}
        className="absolute top-0 left-0 w-1/2 h-full bg-[var(--color-brand-onyx)] z-10 origin-left border-r border-[var(--color-brand-silver)]/10"
      />
      {/* Right Curtain */}
      <motion.div
        initial={{ x: "0%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay }}
        className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-brand-onyx)] z-10 origin-right border-l border-[var(--color-brand-silver)]/10"
      />
      
      {/* Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.4 }}
        className="w-full h-full relative z-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
