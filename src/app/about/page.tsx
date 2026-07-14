"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { 
  Folder, FileText, Shield, X, Square, Minus, Compass, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";
import { cn } from "@/lib/utils";

type TabId = "mission" | "charter" | "standards";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabId>("mission");
  const [currentTime, setCurrentTime] = useState("");

  // Clock Update (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-36 pb-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="text-rose-500 dark:text-rose-400 font-black uppercase tracking-widest text-xs block mb-2">
              🏛 Court Records // System Legacy
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
              <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">The Sabha Archives</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs font-black uppercase tracking-wider max-w-xl mx-auto">
              Governing mandates, operational charters, and strategic protocols.
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------
            ARCHIVES WINDOW CONTAINER (SABHA_ARCHIVES.HLP)
            ---------------------------------------------------- */}
        <section className="pb-24 px-4 md:px-8 max-w-6xl mx-auto relative z-20">
          <div className="stained-glass border border-black/10 dark:border-white/10 rounded-2xl flex flex-col min-h-[520px] shadow-2xl overflow-hidden">
            
            {/* Title Bar */}
            <div className="px-4 py-2 flex justify-between items-center text-white bg-gradient-to-r from-rose-500 to-amber-500 shadow-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-xs font-black uppercase tracking-widest">SABHA_ARCHIVES.HLP // Help Desk</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button className="w-5 h-5 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white border border-white/10 transition-colors cursor-pointer">
                  <Minus className="w-3 h-3 stroke-[3]" />
                </button>
                <button className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center text-white/40 border border-white/5 cursor-not-allowed" disabled>
                  <Square className="w-2.5 h-2.5 stroke-[3]" />
                </button>
                <button className="w-5 h-5 rounded-lg bg-white/20 hover:bg-rose-600 flex items-center justify-center text-white border border-white/10 transition-colors cursor-pointer">
                  <X className="w-3 h-3 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* workspace Area */}
            <div className="flex-grow bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-4 flex flex-col md:flex-row gap-4 min-h-0 border-t border-black/5 dark:border-white/5">
              
              {/* Left Column: Explorer Directory Tree */}
              <div className="md:w-1/3 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl p-3 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[9px] font-sans text-zinc-500 dark:text-zinc-400 uppercase font-black block border-b border-black/5 dark:border-white/5 pb-1 tracking-wider">
                    File Directories
                  </span>

                  <div className="space-y-2 font-sans text-xs font-black tracking-wider text-black dark:text-white">
                    <button 
                      onClick={() => setActiveTab("mission")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-left cursor-pointer",
                        activeTab === "mission" 
                          ? "bg-rose-500/10 dark:bg-rose-500/5 text-rose-500 dark:text-rose-400 border-rose-500/30" 
                          : "border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                      )}
                    >
                      <Folder className="w-4 h-4 shrink-0" />
                      <span>MISSION.TXT</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("charter")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-left cursor-pointer",
                        activeTab === "charter" 
                          ? "bg-rose-500/10 dark:bg-rose-500/5 text-rose-500 dark:text-rose-400 border-rose-500/30" 
                          : "border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                      )}
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>CHARTER.TXT</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("standards")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-left cursor-pointer",
                        activeTab === "standards" 
                          ? "bg-rose-500/10 dark:bg-rose-500/5 text-rose-500 dark:text-rose-400 border-rose-500/30" 
                          : "border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                      )}
                    >
                      <Compass className="w-4 h-4 shrink-0" />
                      <span>STANDARDS.TXT</span>
                    </button>
                  </div>
                </div>

                <div className="bg-rose-500/5 dark:bg-rose-500/2 p-2.5 rounded-xl border border-rose-500/10 font-mono text-[9px] text-rose-600 dark:text-rose-400 space-y-1 mt-4">
                  <span className="block font-bold">STATUS REPORT:</span>
                  <span className="block">Dharma checks ... [OK]</span>
                  <span className="block">Security checksum ... Verified</span>
                </div>
              </div>

              {/* Right Column: File Display Panel */}
              <div className="flex-grow flex flex-col min-h-0 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl p-4 relative overflow-y-auto">
                <div className="relative z-10 h-full flex flex-col justify-between gap-4">
                  <AnimatePresence mode="wait">
                    
                    {/* TAB 1: MISSION */}
                    {activeTab === "mission" && (
                      <motion.div
                        key="mission"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4 text-black dark:text-white"
                      >
                        <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-black tracking-wider">Record File // MISSION.TXT</span>
                          <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-black tracking-wider">✔ Active System</span>
                        </div>

                        <h3 className="font-sans text-2xl font-black text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                          The Sovereignty &amp; Mandate
                        </h3>

                        <p className="font-medium text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          The Delegates Club is not just a society; it is an institution. We bridge the gap between high-stakes geopolitical strategy and cutting-edge technological innovation. From intense 48-hour hackathons to luxurious charity galas, we curate experiences that challenge the intellect and celebrate the extraordinary.
                        </p>

                        <div className="bg-rose-500/5 dark:bg-rose-500/2 p-4 rounded-xl border border-rose-500/10 space-y-2 font-mono text-xs text-rose-600 dark:text-rose-400">
                          <span className="block font-bold uppercase tracking-wider">Cabinet Directives:</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            <p>• Establish diplomatic sovereignty</p>
                            <p>• Engineer secure stack architectures</p>
                            <p>• Foster traditional Indian arts</p>
                            <p>• Maintain code integrity</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 2: CHARTER */}
                    {activeTab === "charter" && (
                      <motion.div
                        key="charter"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4 text-black dark:text-white"
                      >
                        <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-black tracking-wider">Charter File // CHARTER.TXT</span>
                          <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Active Bylaw</span>
                        </div>

                        <h3 className="font-sans text-2xl font-black text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                          Sovereign Assembly Charter
                        </h3>

                        <div className="space-y-4 font-medium text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          <p>
                            <strong className="text-foreground uppercase block text-[10px] tracking-wider mb-0.5">Article I: Geopolitical Assemblies</strong>
                            Chambers operate under classic parliamentary structure. Geostrategic resolutions require consensus bounds checking and strict diplomatic decorum.
                          </p>
                          <p>
                            <strong className="text-foreground uppercase block text-[10px] tracking-wider mb-0.5">Article II: Cryptographic Verification</strong>
                            All digital artifacts, hackathon submissions, and bidding registries must run standard checksum verification to protect treasury files.
                          </p>
                          <p>
                            <strong className="text-foreground uppercase block text-[10px] tracking-wider mb-0.5">Article III: Heritage Preservation</strong>
                            Every gathering must dedicate resources to local artisans. Traditional concerts and auctions serve to restore regional cultural arts.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 3: STANDARDS */}
                    {activeTab === "standards" && (
                      <motion.div
                        key="standards"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4 text-black dark:text-white"
                      >
                        <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-black tracking-wider">Security Standards // STANDARDS.TXT</span>
                          <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">SSL Verified</span>
                        </div>

                        <h3 className="font-sans text-2xl font-black text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                          Cabinet Operational Standards
                        </h3>

                        <div className="space-y-3 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                            <p className="font-bold text-rose-500 dark:text-rose-400">SEC-REG-1: INPUT PROTECTION</p>
                            <p className="text-[10px] mt-0.5 text-zinc-500">All user-submitted text and parameters undergo automated parsing filters to block injection.</p>
                          </div>
                          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                            <p className="font-bold text-rose-500 dark:text-rose-400">SEC-REG-2: SECURE AUTHENTICATION</p>
                            <p className="text-[10px] mt-0.5 text-zinc-500">Access to databases requires NextAuth credential layers. Passphrases are hashed and salted.</p>
                          </div>
                          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                            <p className="font-bold text-rose-500 dark:text-rose-400">SEC-REG-3: PARCHMENT TEXTURES</p>
                            <p className="text-[10px] mt-0.5 text-zinc-500">Layout assets must utilize high-visibility opacity filters to maintain retro readability standards.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </div>

            </div>

            {/* Window Footer Status bar */}
            <div className="bg-zinc-300 dark:bg-zinc-900 px-4 py-1.5 text-[9px] font-mono text-zinc-600 dark:text-zinc-400 flex justify-between border-t border-black/5 dark:border-white/5 select-none shadow-sm">
              <span>SYSTEM: ONLINE</span>
              <span>CLOCK (IST): {currentTime || "12:00:00 PM"}</span>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
