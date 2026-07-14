"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const socials = [
  {
    title: "The Networking Gala",
    description: "An evening of elegant music, opulent decor, and profound networking under the stars.",
    color: "from-[var(--color-brand-charcoal)]",
  },
  {
    title: "Shark Tank Pitch",
    description: "High-stakes startup pitches in front of elite angel investors and venture capitalists.",
    color: "from-[var(--color-brand-black)]",
  },
  {
    title: "The Gala",
    description: "Our signature black-tie event featuring immersive photo booths and red carpet experiences.",
    color: "from-white/20",
  },
];

export function SignatureSocials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % socials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + socials.length) % socials.length);

  return (
    <section id="socials" className="relative py-32 px-6 bg-[var(--color-brand-charcoal)] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">Signature Socials</h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto text-lg">
            Where business meets pleasure. Our exclusive socials are the highlight of the season.
          </p>
        </div>

        <div className="relative h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden glass-panel border-[var(--color-brand-gold)]/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-br ${socials[currentIndex].color} to-transparent flex items-end p-10 md:p-20`}
            >
              <div className="max-w-3xl">
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-serif italic mb-6 text-white drop-shadow-lg"
                >
                  {socials[currentIndex].title}
                </motion.h3>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl font-sans text-gray-200 font-light drop-shadow-md"
                >
                  {socials[currentIndex].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-10 right-10 flex gap-4">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="text-white" />
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-[var(--color-brand-crimson)] transition-colors border border-[var(--color-brand-crimson)]/50"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
