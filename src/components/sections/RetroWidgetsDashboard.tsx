"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Terminal, Music, Gavel, TrendingUp, 
  X, Square, Minus, Play, Pause, Volume2, 
  VolumeX, Send, Check, RefreshCw, Cpu, 
  Clock, AlertCircle, Laptop
} from "lucide-react";

// Types for our widgets
type WindowId = "mun" | "hackathon" | "sufi" | "auction" | "sharktank";

interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: any;
  colorClass: string;
}

export function RetroWidgetsDashboard() {
  // 1. Windows state manager
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "mun", title: "Model UN", isOpen: true, isMinimized: false, zIndex: 10, icon: Globe, colorClass: "retro-titlebar-saffron" },
    { id: "hackathon", title: "Hackathons", isOpen: false, isMinimized: false, zIndex: 5, icon: Terminal, colorClass: "retro-titlebar-emerald" },
    { id: "sufi", title: "Sufi Night", isOpen: false, isMinimized: false, zIndex: 5, icon: Music, colorClass: "retro-titlebar-terracotta" },
    { id: "auction", title: "Auctions", isOpen: false, isMinimized: false, zIndex: 5, icon: Gavel, colorClass: "retro-titlebar-marigold" },
    { id: "sharktank", title: "Shark Tank", isOpen: false, isMinimized: false, zIndex: 5, icon: TrendingUp, colorClass: "retro-titlebar-electric" },
  ]);

  const [activeWindowId, setActiveWindowId] = useState<WindowId>("mun");
  const [topZIndex, setTopZIndex] = useState(15);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Clock Update Effect (IST Clock)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Bring window to focus
  const focusWindow = (id: WindowId) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        return { ...win, isOpen: true, isMinimized: false, zIndex: nextZ };
      }
      return win;
    }));
  };

  // Close window
  const closeWindow = (id: WindowId) => {
    setWindows(prev => prev.map(win => {
      if (win.id === id) return { ...win, isOpen: false };
      return win;
    }));
  };

  // Toggle Minimize
  const toggleMinimize = (id: WindowId) => {
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        const minimized = !win.isMinimized;
        if (!minimized) {
          const nextZ = topZIndex + 1;
          setTopZIndex(nextZ);
          return { ...win, isMinimized: minimized, zIndex: nextZ };
        }
        return { ...win, isMinimized: minimized };
      }
      return win;
    }));
  };

  // ----------------------------------------------------
  // INTERACTIVE TOOL 1: Model UN Resolution Compiler
  // ----------------------------------------------------
  const [munCountry, setMunCountry] = useState("India");
  const [munAgenda, setMunAgenda] = useState("Cybersecurity");
  const [munStance, setMunStance] = useState("Proactive Cooperation");
  const [munConsoleLines, setMunConsoleLines] = useState<string[]>([
    "System loaded. Diplomacy Interface Ready.",
    "Select parameters on the left to compile resolution clauses..."
  ]);
  const [isMunCompiling, setIsMunCompiling] = useState(false);

  const compileResolution = () => {
    setIsMunCompiling(true);
    setMunConsoleLines([
      `Initializing resolution stream for delegation of ${munCountry.toUpperCase()}...`,
      `Injecting Policy Agenda: [${munAgenda}]`,
      `Calibrating Diplomatic Alignment: [${munStance}]`,
      "Analyzing UN Charter Articles...",
      "Drafting clauses (Draft Resolution A/RES/82)..."
    ]);

    setTimeout(() => {
      setMunConsoleLines(prev => [
        ...prev,
        "....................................",
        `[CLAUSE 1] The delegation of ${munCountry} urges the General Assembly to establish a multilateral cybersecurity shield, providing cryptographic sovereignty to developing nations.`,
      ]);
    }, 1000);

    setTimeout(() => {
      setMunConsoleLines(prev => [
        ...prev,
        `[CLAUSE 2] Deeply regretting the unilateral digital blockades, we call for direct cooperative dialogue between member states to resolve infrastructure vulnerabilities.`,
        "✔ Treaty Clause Compilation SUCCESSFUL. Stenciled in Archives."
      ]);
      setIsMunCompiling(false);
    }, 2200);
  };

  // ----------------------------------------------------
  // INTERACTIVE TOOL 2: Hackathon Cafe Compiler
  // ----------------------------------------------------
  const [hackLang, setHackLang] = useState("TypeScript");
  const [hackCaffeine, setHackCaffeine] = useState(true);
  const [hackLogs, setHackLogs] = useState<string[]>([
    "Compiler terminal idle. Stack ready.",
    "Select language and execute script..."
  ]);
  const [isHackCompiling, setIsHackCompiling] = useState(false);
  const [hackProgress, setHackProgress] = useState(0);

  const runCompiler = () => {
    setIsHackCompiling(true);
    setHackProgress(0);
    setHackLogs([
      `$ bytecode-compiler --target ${hackLang.toLowerCase()} --caffeine=${hackCaffeine ? "enabled" : "disabled"}`,
      "Loading project configuration...",
      "Resolving Next.js and Tailwind dependencies...",
    ]);

    const interval = setInterval(() => {
      setHackProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 300);

    setTimeout(() => {
      setHackLogs(prev => [
        ...prev,
        "Analyzing AST structure...",
        hackCaffeine ? "☕ Caffeine Boost Active: Overclocking compiler threads!" : "💤 Safe compilation mode selected...",
        "Executing unit test suites..."
      ]);
    }, 800);

    setTimeout(() => {
      setHackLogs(prev => [
        ...prev,
        "✔ Tests passed: 18/18 files verified.",
        "✨ Build complete! Output saved to: dist/court-system.bin",
        `Memory allocated: ${hackCaffeine ? "512MB" : "128MB"} | CPU Cycles: 0.12ms`
      ]);
      setIsHackCompiling(false);
    }, 1800);
  };

  // ----------------------------------------------------
  // INTERACTIVE TOOL 3: Sufi Night Mehfil Player
  // ----------------------------------------------------
  const sufiTracks = [
    { 
      title: "Kun Faya Kun", 
      artist: "A.R. Rahman", 
      translation: "When He decrees a matter, He only says to it, 'Be,' and it is. A majestic ode to divine creation." 
    },
    { 
      title: "Chhaap Tilak", 
      artist: "Amir Khusro", 
      translation: "You have taken away my looks, my identity, my entire self with just a single glance of love." 
    },
    { 
      title: "Dama Dam Mast Qalandar", 
      artist: "Traditional Folk", 
      translation: "A celebratory chorus praising spiritual ecstasy, unity, and the timeless beat of the dhol." 
    }
  ];

  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlayingSufi, setIsPlayingSufi] = useState(false);
  const [sufiVolume, setSufiVolume] = useState(75);
  const [sufiVisualizer, setSufiVisualizer] = useState<number[]>([10, 40, 20, 80, 50, 30, 90, 60, 40, 70, 20, 50]);

  // Visualizer Animation Loop
  useEffect(() => {
    if (!isPlayingSufi) return;
    const interval = setInterval(() => {
      setSufiVisualizer(Array.from({ length: 12 }, () => Math.floor(Math.random() * 95) + 5));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlayingSufi]);

  // ----------------------------------------------------
  // INTERACTIVE TOOL 4: Auctions merit bid
  // ----------------------------------------------------
  const auctionItems = [
    { id: "badge", name: "Gold Delegate Merit Badge (Rare)", minBid: 2500, curBid: 2800 },
    { id: "charter", name: "Signed Historic Charter of 2015", minBid: 5000, curBid: 6200 },
    { id: "sufipass", name: "VIP Sufi Concert Front-Row Pass", minBid: 1500, curBid: 2100 }
  ];

  const [selectedAuctionIdx, setSelectedAuctionIdx] = useState(0);
  const [bidValue, setBidValue] = useState(3000);
  const [auctionLogs, setAuctionLogs] = useState<string[]>([
    "Auction floor opened.",
    "Bids accepted in real-time."
  ]);

  // Adjust default slider when selected item changes
  useEffect(() => {
    setBidValue(auctionItems[selectedAuctionIdx].curBid + 100);
  }, [selectedAuctionIdx]);

  const placeBid = () => {
    const item = auctionItems[selectedAuctionIdx];
    if (bidValue <= item.curBid) {
      setAuctionLogs(prev => [`❌ Bid of $${bidValue} is too low. Must exceed current bid ($${item.curBid})!`, ...prev]);
      return;
    }
    item.curBid = bidValue;
    setAuctionLogs(prev => [
      `✔ Bid ACCEPTED: You placed $${bidValue} on ${item.name}`,
      `Delegate-Host: "Going once for $${bidValue}..."`,
      ...prev
    ]);
  };

  // ----------------------------------------------------
  // INTERACTIVE TOOL 5: Shark Tank Venture Pitch
  // ----------------------------------------------------
  const [sharkDomain, setSharkDomain] = useState("EdTech");
  const [sharkValuation, setSharkValuation] = useState(5); // Millions
  const [sharkEquity, setSharkEquity] = useState(10); // Percentage
  const [sharkLogs, setSharkLogs] = useState<string[]>([
    "Enter the tank. Prepare your pitch parameters."
  ]);
  const [sharkReaction, setSharkReaction] = useState<{ name: string; quote: string } | null>(null);
  const [isPitching, setIsPitching] = useState(false);

  const pitchVenture = () => {
    setIsPitching(true);
    setSharkLogs([
      `Pitching Gen Z ${sharkDomain} Startup...`,
      `Asking: $${((sharkValuation * sharkEquity) / 100).toFixed(1)}M for ${sharkEquity}% Equity`,
      `Implied Valuation: $${sharkValuation} Million`
    ]);
    setSharkReaction(null);

    const sharks = [
      { name: "Chanakya (Strategist)", accept: sharkValuation <= 4, quote: sharkValuation <= 4 ? "Your numbers show wisdom. Strategic governance requires sustainable treasury values. I accept!" : "Valuation is bloated. You rely on speculation, not real grain production. I am OUT." },
      { name: "Lord Curzon (Viceroy)", accept: sharkEquity >= 15, quote: sharkEquity >= 15 ? "15% equity means absolute administrative control. I approve of this imperial arrangement. Deal!" : "Too little control! I do not fund initiatives where the Crown cannot command the executive court. Out!" },
      { name: "Akbar the Great (Emperor)", accept: sharkDomain === "Culture" || sharkDomain === "EdTech", quote: sharkDomain === "Culture" || sharkDomain === "EdTech" ? "A project that fosters education and arts brings glory to the empire. The royal court will fund you!" : "This lacks universal appeal. Bring me ventures that unite the domains. Out." }
    ];

    setTimeout(() => {
      const selectedShark = sharks[Math.floor(Math.random() * sharks.length)];
      setSharkLogs(prev => [
        ...prev,
        `${selectedShark.name} is evaluating...`,
        selectedShark.accept ? "✔ OFFER GRANTED!" : "❌ PITCH REJECTED."
      ]);
      setSharkReaction({
        name: selectedShark.name,
        quote: selectedShark.quote
      });
      setIsPitching(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-[var(--color-brand-khaki-sand)] relative z-10 border-t-2 border-black overflow-hidden flex flex-col items-center">
      {/* Background patterns */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1920&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20" />

      <div className="max-w-7xl w-full px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-[var(--color-brand-saffron)] font-bold uppercase tracking-wider text-sm inline-flex items-center gap-2 mb-3 font-mono">
            ✦ System Dashboard // Active Chambers
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
            Interactive <span className="text-[var(--color-brand-electric-blue)]">Chambers</span>
          </h2>
          <p className="text-gray-600 max-w-xl font-medium">
            Explore the core domains of The Delegate Club via Windows retro widgets. Double-click shortcuts or click taskbar tabs to open tools.
          </p>
        </div>

        {/* ----------------------------------------------------
            SIMULATED RETRO WINDOWS DESKTOP
            ---------------------------------------------------- */}
        <div className="w-full retro-desktop-grid rounded-3xl border-4 border-black p-4 md:p-6 shadow-[10px_10px_0px_rgba(0,0,0,1)] relative flex flex-col md:flex-row gap-6 min-h-[640px] items-stretch overflow-hidden">
          
          {/* Scanlines layer for authentic CRT monitor glow */}
          <div className="absolute inset-0 crt-scanlines pointer-events-none z-30 opacity-[0.15]" />

          {/* Desktop Left Side: Shortcut Icons */}
          <div className="flex md:flex-col flex-wrap gap-6 shrink-0 z-10 md:w-32 justify-start md:justify-start items-center">
            
            {windows.map(win => {
              const WinIcon = win.icon;
              return (
                <button
                  key={win.id}
                  onDoubleClick={() => focusWindow(win.id)}
                  onClick={() => focusWindow(win.id)}
                  className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none w-16 md:w-20"
                >
                  <div className={`w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all group-hover:bg-[#dfdfdf] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] ${activeWindowId === win.id ? "bg-[#c0c0c0] ring-2 ring-white/50" : ""}`}>
                    <WinIcon className="w-6 h-6 text-black" />
                  </div>
                  <span className="font-mono text-[10px] md:text-xs font-bold text-white tracking-tight uppercase text-center drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] select-none leading-tight">
                    {win.title}
                  </span>
                </button>
              );
            })}

            <div className="border-t border-white/20 w-full hidden md:block my-2" />
            
            {/* Additional Decorative Retro Icons */}
            <div className="hidden md:flex flex-col items-center gap-1 opacity-50 w-20 cursor-not-allowed">
              <div className="w-12 h-12 rounded-xl bg-white/40 border-2 border-dashed border-black/40 flex items-center justify-center">
                <Laptop className="w-6 h-6 text-black/50" />
              </div>
              <span className="font-mono text-[9px] font-bold text-white uppercase text-center">My Court</span>
            </div>

          </div>

          {/* Desktop Main workspace Area: Renders open windows */}
          <div className="flex-grow relative flex items-center justify-center z-10 min-h-[460px] md:min-h-0">
            <AnimatePresence>
              {windows.map(win => {
                if (!win.isOpen || win.isMinimized) return null;
                const WinIcon = win.icon;
                const isActive = activeWindowId === win.id;

                return (
                  <motion.div
                    key={win.id}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    style={{ zIndex: win.zIndex }}
                    onClick={() => focusWindow(win.id)}
                    className="absolute inset-0 flex flex-col retro-window-outset rounded-lg overflow-hidden border-2 border-black"
                  >
                    
                    {/* Window Title Bar */}
                    <div className={`px-3 py-1.5 flex justify-between items-center text-white font-mono select-none ${isActive ? win.colorClass : "bg-[#808080]"}`}>
                      <div className="flex items-center gap-2">
                        <WinIcon className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold uppercase tracking-wider">{win.title}</span>
                      </div>
                      
                      {/* Window actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleMinimize(win.id); }}
                          className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0"
                        >
                          <Minus className="w-3 h-3 stroke-[3]" />
                        </button>
                        <button
                          className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0 cursor-not-allowed"
                          disabled
                        >
                          <Square className="w-2.5 h-2.5 stroke-[3]" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                          className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0 hover:bg-red-600 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>

                    {/* Window Menu Bar (File, Edit, View, Help) */}
                    <div className="bg-[#c0c0c0] px-3 py-1 border-b border-[#808080] flex gap-4 text-[10px] font-mono text-black font-medium border-t border-white select-none">
                      <span className="hover:underline cursor-pointer">File</span>
                      <span className="hover:underline cursor-pointer">Actions</span>
                      <span className="hover:underline cursor-pointer">Diagnostics</span>
                      <span className="hover:underline cursor-pointer">Help</span>
                    </div>

                    {/* Window Client Area */}
                    <div className="flex-grow bg-[#dfdfdf] p-4 flex flex-col lg:flex-row gap-4 overflow-y-auto min-h-0 border-t border-white">
                      
                      {/* Left Block: Animated Background Image Container */}
                      <div className="lg:w-5/12 flex-shrink-0 bg-black rounded-lg overflow-hidden border border-[#808080] relative h-40 lg:h-auto min-h-[140px] flex items-center justify-center">
                        
                        {/* Domain Specific Background Images in Animation */}
                        {win.id === "mun" && (
                          <div 
                            className="absolute inset-0 bg-cover bg-center animate-pan-bg opacity-30" 
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop')" }}
                          />
                        )}
                        {win.id === "hackathon" && (
                          <div 
                            className="absolute inset-0 bg-cover bg-center animate-pan-bg opacity-30" 
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop')" }}
                          />
                        )}
                        {win.id === "sufi" && (
                          <div 
                            className="absolute inset-0 bg-cover bg-center animate-pan-bg opacity-30" 
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop')" }}
                          />
                        )}
                        {win.id === "auction" && (
                          <div 
                            className="absolute inset-0 bg-cover bg-center animate-pan-bg opacity-30" 
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop')" }}
                          />
                        )}
                        {win.id === "sharktank" && (
                          <div 
                            className="absolute inset-0 bg-cover bg-center animate-pan-bg opacity-30" 
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop')" }}
                          />
                        )}

                        {/* Scanline layer inside background */}
                        <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-20" />

                        {/* Title text overlay */}
                        <div className="relative z-10 text-center p-4">
                          <h4 className="text-white font-mono text-lg font-black uppercase tracking-widest drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]">
                            {win.title}
                          </h4>
                          <span className="text-[var(--color-brand-acid-green)] font-mono text-[9px] uppercase tracking-wider block mt-1 drop-shadow-[1px_1px_1px_rgba(0,0,0,1)] font-bold">
                            // system: active_chamber
                          </span>
                        </div>
                      </div>

                      {/* Right Block: Domain Interactive Tool client area */}
                      <div className="flex-grow flex flex-col justify-between min-h-0">
                        
                        {/* 1. Model UN Interactive Layout */}
                        {win.id === "mun" && (
                          <div className="flex-grow flex flex-col justify-between h-full">
                            <div className="space-y-4">
                              <p className="font-mono text-xs text-black leading-relaxed font-bold">
                                Draft dynamic bilateral resolution clauses for delegates. Choose options below:
                              </p>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono font-bold uppercase text-gray-700 block">Delegation:</label>
                                  <select 
                                    value={munCountry} 
                                    onChange={(e) => setMunCountry(e.target.value)}
                                    className="w-full retro-window-inset px-2.5 py-1.5 text-xs font-mono text-black outline-none border border-black"
                                  >
                                    <option>India</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Ukraine</option>
                                    <option>France</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono font-bold uppercase text-gray-700 block">Agenda Item:</label>
                                  <select 
                                    value={munAgenda} 
                                    onChange={(e) => setMunAgenda(e.target.value)}
                                    className="w-full retro-window-inset px-2.5 py-1.5 text-xs font-mono text-black outline-none border border-black"
                                  >
                                    <option>Cybersecurity</option>
                                    <option>Climate Action</option>
                                    <option>Space Junk</option>
                                    <option>Crisis Council</option>
                                  </select>
                                </div>
                                <div className="col-span-2 space-y-1">
                                  <label className="text-[10px] font-mono font-bold uppercase text-gray-700 block">Stance Profile:</label>
                                  <div className="flex gap-2">
                                    {["Proactive Cooperation", "Bilateral Assertiveness", "Absolute Sovereign Veto"].map((stance) => (
                                      <button
                                        key={stance}
                                        onClick={() => setMunStance(stance)}
                                        className={`flex-grow px-2 py-1 border text-[9px] font-mono font-bold transition-all ${munStance === stance ? "bg-[var(--color-brand-saffron)] text-black border-black shadow-[inset_1.5px_1.5px_0px_#000]" : "bg-[#c0c0c0] border-gray-400 retro-button"}`}
                                      >
                                        {stance.split(" ")[0]} Stance
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Terminal Display */}
                              <div className="retro-window-inset bg-black text-emerald-400 p-3 font-mono text-[10px] rounded-lg min-h-[100px] max-h-[140px] overflow-y-auto space-y-1 select-text scrollbar-thin">
                                {munConsoleLines.map((line, i) => (
                                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-[#808080] flex justify-end">
                              <button
                                onClick={compileResolution}
                                disabled={isMunCompiling}
                                className="retro-button px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center gap-1.5"
                              >
                                {isMunCompiling ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                <span>Compile Clause Draft</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 2. Hackathons Interactive Layout */}
                        {win.id === "hackathon" && (
                          <div className="flex-grow flex flex-col justify-between h-full">
                            <div className="space-y-4">
                              <p className="font-mono text-xs text-black leading-relaxed font-bold">
                                Compile project bundles for the elite 48-hour build cycle. Config:
                              </p>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono font-bold uppercase text-gray-700 block">Stack Target:</label>
                                  <select 
                                    value={hackLang} 
                                    onChange={(e) => setHackLang(e.target.value)}
                                    className="w-full retro-window-inset px-2.5 py-1.5 text-xs font-mono text-black outline-none border border-black"
                                  >
                                    <option>TypeScript</option>
                                    <option>Rust Engine</option>
                                    <option>Python AI</option>
                                    <option>C++ WebAssembly</option>
                                  </select>
                                </div>
                                <div className="flex items-center gap-2 pt-5">
                                  <input 
                                    type="checkbox" 
                                    id="caffeine"
                                    checked={hackCaffeine}
                                    onChange={(e) => setHackCaffeine(e.target.checked)}
                                    className="w-4 h-4 cursor-pointer accent-[var(--color-brand-emerald)]"
                                  />
                                  <label htmlFor="caffeine" className="text-[10px] font-mono font-bold uppercase text-gray-700 cursor-pointer">
                                    Caffeine Overclock
                                  </label>
                                </div>
                              </div>

                              {/* Progress bar */}
                              {isHackCompiling && (
                                <div className="space-y-1 font-mono">
                                  <div className="flex justify-between text-[9px] text-gray-700 font-bold uppercase">
                                    <span>Compiling Stack...</span>
                                    <span>{hackProgress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-300 border border-black h-4 p-0.5 rounded overflow-hidden">
                                    <div 
                                      className="bg-[var(--color-brand-emerald)] h-full transition-all duration-300"
                                      style={{ width: `${hackProgress}%` }}
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Terminal Display */}
                              <div className="retro-window-inset bg-black text-white p-3 font-mono text-[10px] rounded-lg min-h-[100px] max-h-[140px] overflow-y-auto space-y-1 select-text scrollbar-thin">
                                {hackLogs.map((line, i) => (
                                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-[#808080] flex justify-end">
                              <button
                                onClick={runCompiler}
                                disabled={isHackCompiling}
                                className="retro-button px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center gap-1.5"
                              >
                                {isHackCompiling ? <Cpu className="w-3.5 h-3.5 animate-bounce" /> : <Terminal className="w-3.5 h-3.5" />}
                                <span>Execute Run Script</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 3. Sufi Night Mehfil Player Layout */}
                        {win.id === "sufi" && (
                          <div className="flex-grow flex flex-col justify-between h-full">
                            <div className="space-y-4">
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1 flex-grow">
                                  <label className="text-[10px] font-mono font-bold uppercase text-gray-700 block">Sufi Audio Mehfil Player:</label>
                                  <div className="retro-window-inset bg-black p-2 flex items-center gap-3 rounded-lg border border-black select-none">
                                    <button 
                                      onClick={() => setIsPlayingSufi(!isPlayingSufi)}
                                      className="w-8 h-8 rounded-full bg-[var(--color-brand-terracotta)] flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
                                    >
                                      {isPlayingSufi ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                                    </button>
                                    <div className="flex-grow min-w-0">
                                      <span className="block font-sans text-xs text-white truncate font-bold uppercase">
                                        {sufiTracks[activeTrackIndex].title}
                                      </span>
                                      <span className="block font-mono text-[9px] text-[#C15C3D] font-bold">
                                        Artist: {sufiTracks[activeTrackIndex].artist}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1 shrink-0 w-24">
                                  <label className="text-[10px] font-mono font-bold uppercase text-gray-700 block">Volume ({sufiVolume}%):</label>
                                  <div className="flex items-center gap-1.5 h-9 pt-1.5">
                                    {sufiVolume === 0 ? <VolumeX className="w-4 h-4 text-black shrink-0" /> : <Volume2 className="w-4 h-4 text-black shrink-0" />}
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={sufiVolume}
                                      onChange={(e) => setSufiVolume(Number(e.target.value))}
                                      className="w-full accent-[var(--color-brand-terracotta)] cursor-pointer h-1.5 bg-gray-400 rounded-lg appearance-none focus:outline-none"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* visualizer animation */}
                              <div className="retro-window-inset bg-black p-3 rounded-lg flex flex-col gap-2 h-20 items-stretch justify-end">
                                <div className="flex justify-between items-end gap-1 flex-grow">
                                  {sufiVisualizer.map((val, idx) => (
                                    <div 
                                      key={idx} 
                                      className="bg-gradient-to-t from-[var(--color-brand-terracotta)] to-[var(--color-brand-marigold)] w-full transition-all duration-150"
                                      style={{ height: isPlayingSufi ? `${val}%` : "5%" }}
                                    />
                                  ))}
                                </div>
                                <span className="font-mono text-[8px] text-gray-400 tracking-wider text-center uppercase">
                                  Mehfil Equalizer Frequency Band
                                </span>
                              </div>

                              {/* translation box */}
                              <div className="p-3 bg-[#fff8f5] rounded-lg border border-gray-300 font-serif text-[11px] text-gray-700 italic leading-relaxed">
                                <span className="block font-mono text-[9px] font-bold uppercase text-[#C15C3D] not-italic mb-1">
                                  Sufi Lyrics English Translation:
                                </span>
                                "{sufiTracks[activeTrackIndex].translation}"
                              </div>
                            </div>

                            <div className="pt-4 border-t border-[#808080] flex justify-between items-center">
                              <div className="flex gap-2">
                                {sufiTracks.map((track, i) => (
                                  <button
                                    key={i}
                                    onClick={() => { setActiveTrackIndex(i); setIsPlayingSufi(true); }}
                                    className={`px-2.5 py-1 text-[9px] font-mono font-bold transition-all border ${activeTrackIndex === i ? "bg-[var(--color-brand-terracotta)] text-white border-black" : "bg-white border-gray-400 retro-button"}`}
                                  >
                                    Track 0{i + 1}
                                  </button>
                                ))}
                              </div>
                              <span className="font-mono text-[8px] text-gray-500 uppercase font-black">
                                Status: {isPlayingSufi ? "Playing" : "Paused"}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* 4. Auctions Interactive Layout */}
                        {win.id === "auction" && (
                          <div className="flex-grow flex flex-col justify-between h-full">
                            <div className="space-y-4">
                              <p className="font-mono text-xs text-black leading-relaxed font-bold">
                                Place live digital bids on prestigious club memorabilia:
                              </p>

                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono font-bold uppercase text-gray-700 block">Select Auction Lot:</label>
                                  <select 
                                    value={selectedAuctionIdx} 
                                    onChange={(e) => setSelectedAuctionIdx(Number(e.target.value))}
                                    className="w-full retro-window-inset px-2.5 py-1.5 text-xs font-mono text-black outline-none border border-black"
                                  >
                                    {auctionItems.map((item, idx) => (
                                      <option key={idx} value={idx}>{item.name}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="bg-[#fff8f5] rounded-xl p-3 border border-gray-300 grid grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-[9px] font-mono text-gray-500 block uppercase font-bold">Opening Bid:</span>
                                    <span className="font-serif font-black text-sm text-black">
                                      ${auctionItems[selectedAuctionIdx].minBid}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] font-mono text-gray-500 block uppercase font-bold">Current Bid:</span>
                                    <span className="font-serif font-black text-sm text-[var(--color-brand-marigold)]">
                                      ${auctionItems[selectedAuctionIdx].curBid}
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-700 uppercase">
                                    <span>Set Your Bid Amount:</span>
                                    <span className="text-[var(--color-brand-marigold)] font-black text-xs">${bidValue}</span>
                                  </div>
                                  <input
                                    type="range"
                                    min={auctionItems[selectedAuctionIdx].curBid + 100}
                                    max={auctionItems[selectedAuctionIdx].curBid + 5000}
                                    step="100"
                                    value={bidValue}
                                    onChange={(e) => setBidValue(Number(e.target.value))}
                                    className="w-full accent-[var(--color-brand-marigold)] cursor-pointer h-1.5 bg-gray-400 rounded-lg appearance-none focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Terminal Display */}
                              <div className="retro-window-inset bg-black text-white p-3 font-mono text-[10px] rounded-lg min-h-[90px] max-h-[120px] overflow-y-auto space-y-1 select-text scrollbar-thin">
                                {auctionLogs.map((line, i) => (
                                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-[#808080] flex justify-end">
                              <button
                                onClick={placeBid}
                                className="retro-button px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center gap-1.5"
                              >
                                <Gavel className="w-3.5 h-3.5" />
                                <span>Submit High Bid</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 5. Shark Tank Interactive Layout */}
                        {win.id === "sharktank" && (
                          <div className="flex-grow flex flex-col justify-between h-full">
                            <div className="space-y-4">
                              <p className="font-mono text-xs text-black leading-relaxed font-bold">
                                Pitch your revolutionary startup venture. Calibrate terms below:
                              </p>

                              <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-3 space-y-1">
                                  <label className="text-[10px] font-mono font-bold uppercase text-gray-700 block">Pitch Arena / Sector:</label>
                                  <div className="flex gap-2">
                                    {["EdTech", "CleanTech", "Culture", "AI / Web3"].map((domain) => (
                                      <button
                                        key={domain}
                                        onClick={() => setSharkDomain(domain)}
                                        className={`flex-grow px-2 py-1 border text-[9px] font-mono font-bold transition-all ${sharkDomain === domain ? "bg-[var(--color-brand-electric-blue)] text-white border-black shadow-[inset_1.5px_1.5px_0px_#000]" : "bg-[#c0c0c0] border-gray-400 retro-button"}`}
                                      >
                                        {domain}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-1 col-span-3">
                                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-700 uppercase">
                                    <span>Valuation Request ($M):</span>
                                    <span className="text-black font-black text-xs">${sharkValuation} Million</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    step="0.5"
                                    value={sharkValuation}
                                    onChange={(e) => setSharkValuation(Number(e.target.value))}
                                    className="w-full accent-[var(--color-brand-electric-blue)] cursor-pointer h-1.5 bg-gray-400 rounded-lg appearance-none focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-1 col-span-3">
                                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-700 uppercase">
                                    <span>Equity Offered (%):</span>
                                    <span className="text-black font-black text-xs">{sharkEquity}% Equity</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="2"
                                    max="40"
                                    step="1"
                                    value={sharkEquity}
                                    onChange={(e) => setSharkEquity(Number(e.target.value))}
                                    className="w-full accent-[var(--color-brand-electric-blue)] cursor-pointer h-1.5 bg-gray-400 rounded-lg appearance-none focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Shark Speech Bubble */}
                              {sharkReaction && (
                                <div className="p-3 bg-white rounded-xl border-2 border-black relative font-mono text-[10px] text-black">
                                  <div className="absolute top-[-8px] left-6 w-3 h-3 bg-white border-t-2 border-l-2 border-black rotate-45" />
                                  <strong className="block text-[var(--color-brand-electric-blue)] uppercase mb-1">
                                    💬 {sharkReaction.name}:
                                  </strong>
                                  <p className="italic">"{sharkReaction.quote}"</p>
                                </div>
                              )}

                              {/* Terminal Logs */}
                              <div className="retro-window-inset bg-black text-[#569aff] p-3 font-mono text-[10px] rounded-lg min-h-[60px] max-h-[90px] overflow-y-auto space-y-1 select-text scrollbar-thin">
                                {sharkLogs.map((line, i) => (
                                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-[#808080] flex justify-end">
                              <button
                                onClick={pitchVenture}
                                disabled={isPitching}
                                className="retro-button px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center gap-1.5"
                              >
                                {isPitching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <TrendingUp className="w-3.5 h-3.5" />}
                                <span>Pitch to Sharks</span>
                              </button>
                            </div>
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Window Status Bar */}
                    <div className="bg-[#c0c0c0] px-3 py-1 border-t border-[#808080] text-[9px] font-mono text-black flex justify-between border-b border-white select-none">
                      <span>Chamber: {win.title.toUpperCase()}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black inline-block animate-pulse" />
                        <span>ONLINE // PORT: 8080</span>
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Desktop Workspace Watermark/Overlay when no windows active/open */}
            {windows.every(w => !w.isOpen || w.isMinimized) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="text-center space-y-3 select-none pointer-events-none"
              >
                <Laptop className="w-20 h-20 text-white mx-auto stroke-[1.5]" />
                <h4 className="font-mono text-sm font-black text-white uppercase tracking-widest">
                  DELEGATE OS // DEBATE SYSTEM V1.0
                </h4>
                <p className="font-mono text-[10px] text-white">Double-click a desktop shortcut to open the chamber widget.</p>
              </motion.div>
            )}
          </div>

          {/* Bottom Taskbar */}
          <div className="absolute bottom-0 left-0 right-0 h-11 bg-[#c0c0c0] border-t-2 border-white px-2 flex justify-between items-center z-20 select-none">
            
            {/* Start Button */}
            <div className="relative">
              <button
                onClick={() => setStartMenuOpen(!startMenuOpen)}
                className={`h-7 px-3 flex items-center gap-1.5 border border-black text-xs font-mono font-bold uppercase ${startMenuOpen ? "retro-button-active shadow-[inset_1.5px_1.5px_0px_#000]" : "retro-button"}`}
              >
                <span className="text-[var(--color-brand-electric-blue)] font-black">☸</span>
                <span>Start</span>
              </button>

              {/* Start Menu Dropdown */}
              <AnimatePresence>
                {startMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-9 left-0 w-52 retro-window-outset rounded border-2 border-black flex flex-col z-40 p-1"
                  >
                    <div className="bg-[#000080] text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest font-black border-b border-black">
                      System Menu
                    </div>
                    {windows.map(win => (
                      <button
                        key={win.id}
                        onClick={() => { focusWindow(win.id); setStartMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 font-mono text-xs text-black hover:bg-[#000080] hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <win.icon className="w-3.5 h-3.5" />
                        <span>Open {win.title}</span>
                      </button>
                    ))}
                    <div className="border-t border-[#808080] my-1" />
                    <div className="px-3 py-1.5 font-mono text-[9px] text-[#808080] uppercase">
                      The Delegate Club v1.0
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active window tabs in Taskbar */}
            <div className="flex-grow flex gap-1.5 px-3 overflow-x-auto justify-start max-w-[calc(100%-140px)]">
              {windows.filter(w => w.isOpen).map(win => {
                const isActive = activeWindowId === win.id && !win.isMinimized;
                return (
                  <button
                    key={win.id}
                    onClick={() => {
                      if (activeWindowId === win.id && !win.isMinimized) {
                        toggleMinimize(win.id);
                      } else {
                        focusWindow(win.id);
                      }
                    }}
                    className={`h-7 px-3 rounded flex items-center gap-1.5 max-w-[120px] truncate border border-black font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${isActive ? "retro-button-active shadow-[inset_1.5px_1.5px_0px_#000] bg-[#dfdfdf]" : "retro-button bg-[#c0c0c0]"}`}
                  >
                    <win.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{win.title}</span>
                  </button>
                );
              })}
            </div>

            {/* System Status Tray */}
            <div className="h-7 px-3 bg-[#c0c0c0] shadow-[inset_1.5px_1.5px_0px_#808080,inset_-1.5px_-1.5px_0px_#fff] flex items-center gap-2 border border-gray-400 font-mono text-[10px] text-black font-semibold">
              <AlertCircle className="w-3.5 h-3.5 text-gray-700 animate-pulse" />
              <Clock className="w-3.5 h-3.5 text-gray-700" />
              <span>{currentTime || "12:00 PM"}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
