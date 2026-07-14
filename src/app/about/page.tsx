"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { 
  Folder, FileText, Shield, X, Square, Minus, Compass, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <main className="relative bg-[var(--color-brand-khaki-sand)] min-h-screen text-black select-none">
      {/* Subtle full-page heritage manuscript watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04] pointer-events-none mix-blend-multiply z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599740831146-80a63ee80098?q=80&w=1200&auto=format&fit=crop')" }}
      />
      <Navbar />

      {/* scanlines filter */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.12] z-30" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[var(--color-brand-saffron)] font-bold uppercase tracking-widest text-xs font-mono block mb-2">
            🏛 Court Records // System Legacy
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
            <span className="calligraphy-heading glossy-heading">The Sabha Archives</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-mono max-w-xl mx-auto">
            Governing mandates, operational charters, and strategic protocols.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------
          ARCHIVES WINDOW CONTAINER (SABHA_ARCHIVES.HLP)
          ---------------------------------------------------- */}
      <section className="pb-24 px-4 md:px-8 max-w-6xl mx-auto relative z-20">
        <div className="retro-window-outset rounded-lg border-2 border-black flex flex-col min-h-[520px] shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          
          {/* Title Bar */}
          <div className="px-3 py-1.5 flex justify-between items-center text-white font-mono bg-gradient-to-r from-[var(--color-brand-terracotta)] to-[#87361e]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-xs font-bold uppercase tracking-wider">SABHA_ARCHIVES.HLP // Help Desk</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0">
                <Minus className="w-3 h-3 stroke-[3]" />
              </button>
              <button className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0 cursor-not-allowed" disabled>
                <Square className="w-2.5 h-2.5 stroke-[3]" />
              </button>
              <button className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0 hover:bg-red-600 hover:text-white">
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Menu Options Bar */}
          <div className="bg-[#c0c0c0] px-3 py-1 border-b border-[#808080] flex gap-4 text-[10px] font-mono text-black font-medium border-t border-white select-none">
            <span className="hover:underline cursor-pointer">File</span>
            <span className="hover:underline cursor-pointer">Bookmark</span>
            <span className="hover:underline cursor-pointer">Option</span>
            <span className="hover:underline cursor-pointer">Help</span>
          </div>

          {/* Main workspace Area */}
          <div className="flex-grow bg-[#dfdfdf] p-4 flex flex-col md:flex-row gap-4 min-h-0 border-t border-white">
            
            {/* Left Column: Explorer Directory Tree */}
            <div className="md:w-1/3 retro-window-inset rounded p-3 select-none flex flex-col justify-between bg-white border border-gray-400">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase font-black block border-b border-gray-200 pb-1">
                  File Directories
                </span>

                <div className="space-y-2 font-mono text-xs text-black">
                  <button 
                    onClick={() => setActiveTab("mission")}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-left ${activeTab === "mission" ? "bg-[#000080] text-white" : "hover:bg-gray-100"}`}
                  >
                    <Folder className="w-4 h-4 shrink-0" />
                    <span>MISSION.TXT</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("charter")}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-left ${activeTab === "charter" ? "bg-[#000080] text-white" : "hover:bg-gray-100"}`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>CHARTER.TXT</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("standards")}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-left ${activeTab === "standards" ? "bg-[#000080] text-white" : "hover:bg-gray-100"}`}
                  >
                    <Compass className="w-4 h-4 shrink-0" />
                    <span>STANDARDS.TXT</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#fff8f5] p-2.5 rounded border border-gray-300 font-mono text-[9px] text-[#87361e] space-y-1 mt-4">
                <span className="block font-bold">STATUS REPORT:</span>
                <span className="block">Dharma checks ... [OK]</span>
                <span className="block">Security checksum ... Verified</span>
              </div>
            </div>

            {/* Right Column: File Display Panel */}
            <div className="flex-grow flex flex-col min-h-0 bg-white rounded border border-gray-400 p-4 relative overflow-y-auto">
              
              {/* High-visibility background image overlay inside right viewer */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.16] pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop')" }}
              />
              
              {/* Scanline pattern */}
              <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.08]" />

              <div className="relative z-10 h-full flex flex-col justify-between gap-4">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: MISSION */}
                  {activeTab === "mission" && (
                    <motion.div
                      key="mission"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase font-black">Record File // MISSION.TXT</span>
                        <span className="text-[10px] font-mono text-emerald-600 font-black">✔ Active System</span>
                      </div>

                      <h3 className="font-serif text-2xl font-black text-[#87361e] uppercase tracking-wide">
                        The Sovereignty &amp; Mandate
                      </h3>

                      <p className="font-sans text-sm text-gray-700 leading-relaxed">
                        The Delegates Club is not just a society; it is an institution. We bridge the gap between high-stakes geopolitical strategy and cutting-edge technological innovation. From intense 48-hour hackathons to luxurious charity galas, we curate experiences that challenge the intellect and celebrate the extraordinary.
                      </p>

                      <div className="retro-window-inset bg-[#fff8f5] p-3 rounded border border-gray-300 space-y-2 font-mono text-xs">
                        <span className="block font-bold text-gray-700 uppercase">Cabinet Directives:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#87361e]">
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
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase font-black">Charter File // CHARTER.TXT</span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase">Active Bylaw</span>
                      </div>

                      <h3 className="font-serif text-2xl font-black text-[#87361e] uppercase tracking-wide">
                        Sovereign Assembly Charter
                      </h3>

                      <div className="space-y-3 font-sans text-xs text-gray-700 leading-relaxed">
                        <p>
                          <strong>Article I: Geopolitical Assemblies</strong><br />
                          Chambers operate under classic parliamentary structure. Geostrategic resolutions require consensus bounds checking and strict diplomatic decorum.
                        </p>
                        <p>
                          <strong>Article II: Cryptographic Verification</strong><br />
                          All digital artifacts, hackathon submissions, and bidding registries must run standard checksum verification to protect treasury files.
                        </p>
                        <p>
                          <strong>Article III: Heritage Preservation</strong><br />
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
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase font-black">Security Standards // STANDARDS.TXT</span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase">SSL Verified</span>
                      </div>

                      <h3 className="font-serif text-2xl font-black text-[#87361e] uppercase tracking-wide">
                        Cabinet Operational Standards
                      </h3>

                      <div className="space-y-3 font-mono text-[11px] text-gray-700">
                        <div className="p-3 bg-gray-50 rounded border border-gray-300">
                          <p className="font-bold text-[#87361e]">SEC-REG-1: INPUT PROTECTION</p>
                          <p className="text-[10px] mt-0.5 text-gray-600">All user-submitted text and parameters undergo automated parsing filters to block injection.</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-300">
                          <p className="font-bold text-[#87361e]">SEC-REG-2: SECURE AUTHENTICATION</p>
                          <p className="text-[10px] mt-0.5 text-gray-600">Access to databases requires NextAuth credential layers. Passphrases are hashed and salted.</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-300">
                          <p className="font-bold text-[#87361e]">SEC-REG-3: PARCHMENT TEXTURES</p>
                          <p className="text-[10px] mt-0.5 text-gray-600">Layout assets must utilize high-visibility opacity filters to maintain retro readability standards.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

          </div>

          {/* Window Footer Status bar */}
          <div className="bg-[#c0c0c0] px-3 py-1 border-t border-[#808080] text-[9px] font-mono text-black flex justify-between border-b border-white select-none">
            <span>System: ONLINE</span>
            <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
