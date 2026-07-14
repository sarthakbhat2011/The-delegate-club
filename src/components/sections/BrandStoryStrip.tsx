"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, MotionStyle } from "framer-motion";
import Image from "next/image";

interface InteractiveImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  style?: MotionStyle;
  sizes?: string;
  priority?: boolean;
}

function InteractiveImage({ src, alt, containerClassName, imageClassName, style, sizes, priority }: InteractiveImageProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 30, stiffness: 200 });
  
  // Spotlight on image
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { damping: 30, stiffness: 200 });
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { damping: 30, stiffness: 200 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div className={containerClassName} style={{ ...style, perspective: 1200 }}>
      <motion.div
        className="group w-full h-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className={imageClassName}
          sizes={sizes}
          priority={priority}
        />
        {/* Dynamic Glass Reflection / Spotlight on hover */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
          }}
        />
      </motion.div>
    </motion.div>
  );
}

interface SpotlightPanelProps {
  children: React.ReactNode;
  style?: MotionStyle;
  className?: string;
}

function SpotlightPanel({ children, style, className }: SpotlightPanelProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      className={`group relative ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(212,175,55,0.12),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.div>
  );
}

export function BrandStoryStrip() {
  const containerRef = useRef<HTMLElement>(null);

  // Track the scroll progress of the entire section (which is 250vh tall)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Image 1: MUN Hall (Moves fastest, starts low, ends high)
  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [5, -5]);

  // Image 2: Gavel (Moves slow, subtle parallax)
  const y2 = useTransform(scrollYProgress, [0, 1], ["40%", "-30%"]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  
  // Image 3: Delegates (Moves medium, starts very low)
  const y3 = useTransform(scrollYProgress, [0, 1], ["50%", "-80%"]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [10, -10]);

  // Text Panel fade, scale, and subtle rotation
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const textScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["20%", "0%", "0%", "-10%"]);

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full bg-[var(--color-brand-charcoal)]">
      
      {/* Sticky container that stays fixed while the user scrolls through the 250vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Particles / Texture */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #D4AF37 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* PARALLAX IMAGES LAYER */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          
          <InteractiveImage 
            src="/images/mun_hall.png"
            alt="Grand Assembly Hall"
            containerClassName="absolute top-10 left-[-5%] md:left-[5%] w-[80vw] md:w-[40vw] h-[40vh] md:h-[50vh] z-10 pointer-events-auto"
            imageClassName="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            style={{ y: y1, scale: scale1, rotateZ: rotate1 }}
            sizes="(max-width: 768px) 80vw, 40vw"
            priority
          />

          <InteractiveImage 
            src="/images/mun_gavel.png"
            alt="Luxurious Gavel"
            containerClassName="absolute bottom-[-10%] right-[-10%] md:right-[5%] w-[60vw] md:w-[30vw] h-[35vh] md:h-[45vh] z-20 pointer-events-auto"
            imageClassName="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            style={{ y: y2, rotateZ: rotate2 }}
            sizes="(max-width: 768px) 60vw, 30vw"
          />

          <InteractiveImage 
            src="/images/mun_delegates.png"
            alt="Delegates networking"
            containerClassName="absolute top-[40%] right-[-5%] md:right-[20%] w-[70vw] md:w-[35vw] h-[40vh] md:h-[40vh] z-10 pointer-events-auto"
            imageClassName="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            style={{ y: y3, opacity: opacity3, rotateZ: rotate3 }}
            sizes="(max-width: 768px) 70vw, 35vw"
          />

        </div>

        {/* CENTER TEXT PANEL LAYER (Glassmorphism over images) */}
        <div className="relative z-30 max-w-5xl mx-auto px-4 md:px-6 w-full pointer-events-auto">
          <SpotlightPanel
            className="glass-panel p-8 md:p-16 rounded-3xl text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden backdrop-blur-xl bg-black/40"
            style={{ opacity: textOpacity, scale: textScale, y: textY }}
          >
            {/* Subtle silk/velvet shine sweep inside the panel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_8s_infinite] pointer-events-none" />

            <div className="space-y-6 md:space-y-8 relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-6 drop-shadow-2xl bg-gradient-to-br from-white via-gray-200 to-gray-500 text-transparent bg-clip-text leading-tight">
                A Syndicate of <br className="hidden md:block"/> Visionaries.
              </h2>
              
              <div className="w-16 h-[1px] bg-[#D4AF37]/50 mx-auto my-6" />

              <p className="text-xl md:text-3xl font-sans text-white font-light leading-relaxed drop-shadow-md">
                We are not just a networking club. We are a carefully curated ecosystem of leaders, founders, and disruptors.
              </p>
              
              <p className="text-base md:text-xl font-sans text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
                Membership grants access to closed-door masterminds, high-stakes pitch rooms, and opulent socials designed to forge empires.
              </p>
            </div>
          </SpotlightPanel>
        </div>

      </div>
    </section>
  );
}
