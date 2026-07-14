"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { RetroWidgetsDashboard } from "@/components/sections/RetroWidgetsDashboard";
import { MonumentTiers } from "@/components/sections/MonumentTiers";
import { PranayamaBreathing } from "@/components/sections/PranayamaBreathing";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

export default function Home() {
  return (
    <main className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500 selection:bg-rose-500 selection:text-white">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>
      
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
