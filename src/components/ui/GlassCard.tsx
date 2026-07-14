"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  animateHover?: boolean;
}

export function GlassCard({ children, className, animateHover = true, ...props }: GlassCardProps) {
  const baseClasses = "glass-card rounded-2xl p-6 overflow-hidden relative group";
  
  return animateHover ? (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(baseClasses, className)}
      {...(props as any)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-crimson)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  ) : (
    <div className={cn(baseClasses, className)} {...props}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
