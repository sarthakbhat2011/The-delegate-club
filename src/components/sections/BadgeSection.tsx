"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/10 animate-pulse" />
});

const Grainient = dynamic(() => import("@/components/ui/Grainient"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

export function BadgeSection() {
  return (
    <section className="relative w-full h-[70vh] bg-black overflow-hidden flex items-center justify-center border-t border-[var(--color-brand-gold)]/20">
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#B8001F"
          color2="#ffffff"
          color3="#B8001F"
          timeSpeed={0.4}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={0.6}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={1.7}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Physics Badge */}
      <div className="absolute inset-0 z-10">
        <Lanyard 
          position={[0, 0, 25]} 
          gravity={[0, -40, 0]} 
          frontImage="/badge.svg" 
        />
      </div>

      <div className="relative z-0 text-center pointer-events-none select-none opacity-20">
        <h2 className="text-6xl md:text-8xl lg:text-[12rem] font-serif italic text-white/50 tracking-widest whitespace-nowrap">
          VIP ACCESS
        </h2>
      </div>
    </section>
  );
}
