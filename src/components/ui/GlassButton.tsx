"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export function GlassButton({ children, className, variant = "primary", ...props }: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden px-8 py-3 rounded-full font-sans font-medium tracking-wide transition-all duration-300",
        variant === "primary"
          ? "bg-[var(--color-brand-crimson)]/30 text-white border border-white/50 hover:bg-[var(--color-brand-crimson)]/50"
          : "glass-card text-[var(--color-foreground)] hover:text-white hover:border-[var(--color-brand-gold)]",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
