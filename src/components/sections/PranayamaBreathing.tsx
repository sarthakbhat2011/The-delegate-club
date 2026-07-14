"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, X, Heart, ShieldAlert } from "lucide-react";

export function PranayamaBreathing() {
  const [isOpen, setIsOpen] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold (In)" | "Exhale" | "Hold (Out)">("Inhale");
  const [secondsRemaining, setSecondsRemaining] = useState(4);

  // Box breathing: 4s Inhale, 4s Hold, 4s Exhale, 4s Hold
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Switch phase
          setBreathPhase((currentPhase) => {
            switch (currentPhase) {
              case "Inhale":
                return "Hold (In)";
              case "Hold (In)":
                return "Exhale";
              case "Exhale":
                return "Hold (Out)";
              case "Hold (Out)":
                return "Inhale";
            }
          });
          return 4; // 4 seconds per phase
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, breathPhase]);

  // Visual scaling of the lotus based on breathing phase
  const getScale = () => {
    switch (breathPhase) {
      case "Inhale":
        return 1.4; // Expanding
      case "Hold (In)":
        return 1.4; // Maintaining peak size
      case "Exhale":
        return 0.8; // Shrinking
      case "Hold (Out)":
        return 0.8; // Maintaining small size
    }
  };

  const getPhaseColor = () => {
    switch (breathPhase) {
      case "Inhale":
        return "text-[var(--color-brand-saffron)]";
      case "Hold (In)":
        return "text-[var(--color-brand-marigold)]";
      case "Exhale":
        return "text-[var(--color-brand-terracotta)]";
      case "Hold (Out)":
        return "text-[var(--color-brand-emerald)]";
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[var(--color-brand-saffron)] border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer group"
          whileHover={{ scale: 1.05 }}
        >
          <Activity className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
        </motion.button>
      </div>

      {/* Expanded Breathing Widget Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="w-full max-w-[400px] bg-[var(--color-brand-deep-indigo)] border-2 border-black rounded-3xl p-8 relative text-white shadow-[8px_8px_0px_rgba(0,0,0,1)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[var(--color-brand-saffron)] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
                  🧘 Pranayama Space
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  Breathing Resonance
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Take a moment to center your focus. inspired by box breathing.
                </p>
              </div>

              {/* Breathing Circle Area */}
              <div className="h-[220px] flex items-center justify-center relative my-8">
                {/* Expanding/contracting backdrop glow */}
                <motion.div
                  animate={{
                    scale: getScale(),
                    opacity: [0.15, 0.3, 0.15]
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  className="absolute w-36 h-36 rounded-full bg-[var(--color-brand-marigold)] filter blur-[40px] -z-10"
                />

                {/* Animated Lotus representation */}
                <motion.div
                  animate={{ scale: getScale() }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  className="w-32 h-32 rounded-full border-4 border-black bg-[var(--color-brand-khaki-sand)] flex items-center justify-center relative shadow-lg"
                >
                  {/* Decorative Lotus Petals (SVG) */}
                  <svg className="absolute w-[140%] h-[140%] fill-[var(--color-brand-saffron)]/20 stroke-black stroke-[0.7] animate-spin-slow pointer-events-none" viewBox="0 0 100 100">
                    <path d="M50,15 C45,35 55,35 50,15 Z" transform="rotate(0 50 50)" />
                    <path d="M50,15 C45,35 55,35 50,15 Z" transform="rotate(45 50 50)" />
                    <path d="M50,15 C45,35 55,35 50,15 Z" transform="rotate(90 50 50)" />
                    <path d="M50,15 C45,35 55,35 50,15 Z" transform="rotate(135 50 50)" />
                    <path d="M50,15 C45,35 55,35 50,15 Z" transform="rotate(180 50 50)" />
                    <path d="M50,15 C45,35 55,35 50,15 Z" transform="rotate(225 50 50)" />
                    <path d="M50,15 C45,35 55,35 50,15 Z" transform="rotate(270 50 50)" />
                    <path d="M50,15 C45,35 55,35 50,15 Z" transform="rotate(315 50 50)" />
                  </svg>

                  {/* Inner breathing count text */}
                  <div className="text-center z-10 select-none">
                    <span className="text-black text-3xl font-black leading-none block">
                      {secondsRemaining}s
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Breath Phase Banner */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                  Current Phase
                </span>
                <span className={`text-xl font-black uppercase tracking-wide ${getPhaseColor()} transition-colors duration-300`}>
                  {breathPhase}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
