"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { RetroWidgetsDashboard } from "@/components/sections/RetroWidgetsDashboard";
import { MonumentTiers } from "@/components/sections/MonumentTiers";
import { PranayamaBreathing } from "@/components/sections/PranayamaBreathing";

export default function Home() {
  return (
    <main className="relative min-h-screen text-foreground selection:bg-rose-500 selection:text-white">
      {/* Content wrapper with higher z-index to overlay on background */}
      <div className="relative z-10">
        <Navbar />
        
        <HeroMotion />

        <MonumentTiers />
        
        <RetroWidgetsDashboard />
        
        <Footer />

        <PranayamaBreathing />
      </div>
    </main>
  );
}
