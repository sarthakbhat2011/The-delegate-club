"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const council = [
  { name: "Eleanor Sterling", role: "President", desc: "The strategic mind behind our global expansion. Known for ruthless debate prep and an unmatched collection of tailored blazers.", img: "/images/council-1.jpg" },
  { name: "Julian Vance", role: "Head of Hackathons", desc: "Turns caffeine into clean code. Brokered our first million-dollar prize pool while deploying to production.", img: "/images/council-2.jpg" },
  { name: "Sofia Rossi", role: "Director of Socials", desc: "If there's velvet, a chandelier, and an exclusive guest list, Sofia curated it. Master of the gala reception aesthetic.", img: "/images/council-3.jpg" },
];

function BioCard({ person }: { person: typeof council[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.8)]"
    >
      {/* Fallback gradient if image fails or isn't there */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-sapphire)] to-[var(--color-brand-black)]" />
      
      {/* Noise/Marble Texture Overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Actual Image (commented out until we have real assets, using abstract for now) */}
      {/* <Image src={person.img} alt={person.name} fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" /> */}

      {/* Content */}
      <div 
        className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-[var(--color-brand-black)] via-[var(--color-brand-black)]/60 to-transparent"
        style={{ transform: "translateZ(50px)" }}
      >
        <h4 className="text-[var(--color-brand-gold)] font-sans text-sm tracking-widest uppercase mb-2">{person.role}</h4>
        <h3 className="text-3xl font-serif text-white mb-4">{person.name}</h3>
        
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-[var(--color-brand-ivory)]/80 text-sm leading-relaxed font-sans pb-4 border-b border-[var(--color-brand-gold)]/30">
            {person.desc}
          </p>
        </motion.div>
      </div>

      {/* Gold foil border effect */}
      <div className="absolute inset-0 border-[1px] border-[var(--color-brand-gold)]/20 group-hover:border-[var(--color-brand-gold)]/60 transition-colors duration-500 rounded-xl" style={{ transform: "translateZ(1px)" }} />
    </motion.div>
  );
}

export function CouncilBios() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">The High Council</h2>
        <p className="text-xl text-[var(--color-brand-gold-muted)] font-sans">The visionaries orchestrating our legacy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1000px]">
        {council.map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <BioCard person={person} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
