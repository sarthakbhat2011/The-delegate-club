"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap py-4">
      <motion.div className="font-serif italic font-semibold text-[8rem] md:text-[12rem] leading-[1.2] uppercase flex whitespace-nowrap flex-nowrap" style={{ x }}>
        {/* We render the text block multiple times to ensure seamless infinite scrolling */}
        <span className="block mr-10 py-4">{children}</span>
        <span className="block mr-10 py-4">{children}</span>
        <span className="block mr-10 py-4">{children}</span>
        <span className="block mr-10 py-4">{children}</span>
      </motion.div>
    </div>
  );
}

export function EventMarquee() {
  const events = "SOCIALS ✦ HACKATHONS ✦ MUN ✦ SHARK TANK ✦ ";
  
  return (
    <section className="py-24 bg-[var(--color-brand-black)] overflow-hidden relative border-y border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4A0010]/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 opacity-90 mix-blend-screen">
        <ParallaxText baseVelocity={-1.5}>
          <span className="bg-gradient-to-r from-[#E8E8E8] via-[#FFFFFF] to-[#A0A0A0] text-transparent bg-clip-text tracking-widest pl-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {events}
          </span>
        </ParallaxText>
        <ParallaxText baseVelocity={1.5}>
          <span className="bg-gradient-to-r from-[#C0C0C0] via-[#FFFFFF] to-[#E8E8E8] text-transparent bg-clip-text tracking-widest pl-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {events}
          </span>
        </ParallaxText>
      </div>
    </section>
  );
}
