"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { RetroWidgetsDashboard } from "@/components/sections/RetroWidgetsDashboard";
import { MonumentTiers } from "@/components/sections/MonumentTiers";
import { PranayamaBreathing } from "@/components/sections/PranayamaBreathing";

export default function Home() {
  return (
    <main className="relative bg-[var(--color-brand-khaki-sand)] min-h-screen text-black selection:bg-[var(--color-brand-marigold)] selection:text-black">
      {/* Subtle full-page heritage watermark background */}
      <div 
        className="absolute inset-0 bg-repeat opacity-[0.04] pointer-events-none mix-blend-multiply z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1599740831146-80a63ee80098?q=80&w=1200&auto=format&fit=crop')",
          backgroundSize: "600px",
          backgroundAttachment: "fixed"
        }}
      />
      <Navbar />
      
      <HeroMotion />

      <MonumentTiers />
      
      <RetroWidgetsDashboard />
      
      <Footer />

      <PranayamaBreathing />
    </main>
  );
}
