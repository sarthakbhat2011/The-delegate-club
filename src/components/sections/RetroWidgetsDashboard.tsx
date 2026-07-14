"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Terminal, Music, Gavel, TrendingUp, 
  X, Square, Minus, Play, Pause, Volume2, 
  VolumeX, Send, Check, RefreshCw, Cpu, 
  Clock, AlertCircle, Laptop
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  glowClass: string;
}

export function RetroWidgetsDashboard() {
  // 1. Windows state manager
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "mun", title: "Model UN", isOpen: true, isMinimized: false, zIndex: 10, icon: Globe, colorClass: "bg-gradient-to-r from-amber-500 to-yellow-500", glowClass: "glow-amber" },
    { id: "hackathon", title: "Hackathons", isOpen: false, isMinimized: false, zIndex: 5, icon: Terminal, colorClass: "bg-gradient-to-r from-emerald-500 to-green-500", glowClass: "glow-emerald" },
    { id: "sufi", title: "Sufi Night", isOpen: false, isMinimized: false, zIndex: 5, icon: Music, colorClass: "bg-gradient-to-r from-rose-500 to-red-500", glowClass: "glow-ruby" },
    { id: "auction", title: "Auctions", isOpen: false, isMinimized: false, zIndex: 5, icon: Gavel, colorClass: "bg-gradient-to-r from-blue-500 to-indigo-500", glowClass: "glow-sapphire" },
    { id: "sharktank", title: "Shark Tank", isOpen: false, isMinimized: false, zIndex: 5, icon: TrendingUp, colorClass: "bg-gradient-to-r from-purple-500 to-pink-500", glowClass: "glow-amethyst" },
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
    <section className="py-24 bg-transparent relative z-10 border-t border-black/10 dark:border-white/10 overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl w-full px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-rose-500 dark:text-rose-400 font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 mb-3">
            ✦ System Dashboard // Active Chambers
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
            Interactive <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">Chambers</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl font-bold text-sm tracking-wide">
            Explore the core domains of The Delegate Club via Stained Glass interactive chambers. Double-click shortcuts or click taskbar tabs to open tools.
          </p>
        </div>

        {/* ----------------------------------------------------
            SIMULATED STAINED GLASS OS DESKTOP
            ---------------------------------------------------- */}
        <div className="w-full bg-white/10 dark:bg-zinc-950/10 backdrop-blur-md rounded-3xl border border-black/10 dark:border-white/10 p-4 md:p-6 shadow-2xl relative flex flex-col md:flex-row gap-6 min-h-[640px] items-stretch overflow-hidden">

          {/* Desktop Left Side: Shortcut Icons */}
          <div className="flex md:flex-col flex-wrap gap-4 shrink-0 z-10 md:w-32 justify-start md:justify-start items-center">
            
            {windows.map(win => {
              const WinIcon = win.icon;
              return (
                <button
                  key={win.id}
                  onDoubleClick={() => focusWindow(win.id)}
                  onClick={() => focusWindow(win.id)}
                  className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none w-16 md:w-20"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm transition-all duration-300",
                    "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border-black/10 dark:border-white/10 group-hover:scale-105 group-hover:bg-white/60 dark:group-hover:bg-zinc-800/60",
                    activeWindowId === win.id ? "border-rose-500/50 bg-rose-500/10 dark:bg-rose-500/5 shadow-[0_0_15px_-3px_rgba(225,29,72,0.3)]" : ""
                  )}>
                    <WinIcon className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <span className="font-sans text-[10px] md:text-xs font-black text-black dark:text-zinc-300 tracking-wider uppercase text-center select-none leading-tight">
                    {win.title}
                  </span>
                </button>
              );
            })}

            <div className="border-t border-black/10 dark:border-white/10 w-full hidden md:block my-2" />
            
            {/* Additional Decorative Icons */}
            <div className="hidden md:flex flex-col items-center gap-1 opacity-40 w-20 cursor-not-allowed">
              <div className="w-12 h-12 rounded-2xl bg-white/20 dark:bg-zinc-900/20 border border-dashed border-black/10 dark:border-white/10 flex items-center justify-center">
                <Laptop className="w-5 h-5 text-black dark:text-white" />
              </div>
              <span className="font-sans text-[9px] font-black text-black dark:text-zinc-400 uppercase text-center tracking-wider">My Court</span>
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
                    className="absolute inset-0 flex flex-col stained-glass border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    
                    {/* Window Title Bar */}
                    <div className={cn(
                      "px-4 py-2 flex justify-between items-center text-white select-none shadow-sm",
                      isActive ? `${win.colorClass} ${win.glowClass}` : "bg-zinc-400 dark:bg-zinc-800"
                    )}>
                      <div className="flex items-center gap-2">
                        <WinIcon className="w-4 h-4 text-white" />
                        <span className="text-xs font-black uppercase tracking-widest">{win.title}</span>
                      </div>
                      
                      {/* Window actions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleMinimize(win.id); }}
                          className="w-5 h-5 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3 stroke-[3]" />
                        </button>
                        <button
                          className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center text-white/40 border border-white/5 cursor-not-allowed"
                          disabled
                        >
                          <Square className="w-2.5 h-2.5 stroke-[3]" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                          className="w-5 h-5 rounded-lg bg-white/20 hover:bg-rose-600 flex items-center justify-center text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[3]" />
                        </button>
                      </div>
                    </div>

                    {/* Window Client Area */}
                    <div className="flex-grow bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-4 flex flex-col lg:flex-row gap-4 overflow-y-auto min-h-0 border-t border-black/5 dark:border-white/5">
                      
                      {/* Left Block: Animated Background Image Container */}
                      <div className="lg:w-5/12 flex-shrink-0 bg-zinc-900 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 relative h-36 lg:h-auto min-h-[120px] flex items-center justify-center">
                        
                        {/* Domain Specific Background Images */}
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

                        {/* Title text overlay */}
                        <div className="relative z-10 text-center p-4">
                          <h4 className="text-white font-sans text-xl font-black uppercase tracking-widest drop-shadow-md">
                            {win.title}
                          </h4>
                          <span className="text-rose-400 font-mono text-[9px] uppercase tracking-widest block mt-1 font-bold">
                            // system: active_chamber
                          </span>
                        </div>
                      </div>

                      {/* Right Block: Domain Interactive Tool client area */}
                      <div className="flex-grow flex flex-col justify-between min-h-0 text-black dark:text-white">
                        
                        {/* 1. Model UN Interactive Layout */}
                        {win.id === "mun" && (
                          <div className="flex-grow flex flex-col justify-between h-full">
                            <div className="space-y-4">
                              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-bold">
                                Draft dynamic bilateral resolution clauses for delegates. Choose options below:
                              </p>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-sans font-black uppercase tracking-wider text-zinc-500">Delegation:</label>
                                  <select 
                                    value={munCountry} 
                                    onChange={(e) => setMunCountry(e.target.value)}
                                    className="w-full bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-bold text-black dark:text-white outline-none focus:border-rose-500"
                                  >
                                    <option className="text-black dark:text-white dark:bg-zinc-900">India</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">United States</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">United Kingdom</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">Ukraine</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">France</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-sans font-black uppercase tracking-wider text-zinc-500">Agenda Item:</label>
                                  <select 
                                    value={munAgenda} 
                                    onChange={(e) => setMunAgenda(e.target.value)}
                                    className="w-full bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-bold text-black dark:text-white outline-none focus:border-rose-500"
                                  >
                                    <option className="text-black dark:text-white dark:bg-zinc-900">Cybersecurity</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">Climate Action</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">Space Junk</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">Crisis Council</option>
                                  </select>
                                </div>
                                <div className="col-span-2 space-y-1">
                                  <label className="text-[9px] font-sans font-black uppercase tracking-wider text-zinc-500 block">Stance Profile:</label>
                                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                                    {["Proactive Cooperation", "Bilateral Assertiveness", "Absolute Sovereign Veto"].map((stance) => (
                                      <button
                                        key={stance}
                                        onClick={() => setMunStance(stance)}
                                        className={cn(
                                          "flex-grow px-2 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                                          munStance === stance 
                                            ? "bg-amber-500 text-white border-transparent shadow-md" 
                                            : "bg-white/40 dark:bg-zinc-900/40 border-black/10 dark:border-white/10 text-black dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                                        )}
                                      >
                                        {stance.split(" ")[0]} Stance
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Terminal Display */}
                              <div className="bg-zinc-950 border border-black/30 text-emerald-400 p-3 font-mono text-[10px] rounded-xl min-h-[90px] max-h-[120px] overflow-y-auto space-y-1 select-text scrollbar-thin shadow-inner">
                                {munConsoleLines.map((line, i) => (
                                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-end">
                              <button
                                onClick={compileResolution}
                                disabled={isMunCompiling}
                                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
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
                              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-bold">
                                Compile project bundles for the elite 48-hour build cycle. Config:
                              </p>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-sans font-black uppercase tracking-wider text-zinc-500 block">Stack Target:</label>
                                  <select 
                                    value={hackLang} 
                                    onChange={(e) => setHackLang(e.target.value)}
                                    className="w-full bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-bold text-black dark:text-white outline-none focus:border-rose-500"
                                  >
                                    <option className="text-black dark:text-white dark:bg-zinc-900">TypeScript</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">Rust Engine</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">Python AI</option>
                                    <option className="text-black dark:text-white dark:bg-zinc-900">C++ WebAssembly</option>
                                  </select>
                                </div>
                                <div className="flex items-center gap-2 pt-5">
                                  <input 
                                    type="checkbox" 
                                    id="caffeine"
                                    checked={hackCaffeine}
                                    onChange={(e) => setHackCaffeine(e.target.checked)}
                                    className="w-4 h-4 cursor-pointer accent-emerald-500 rounded"
                                  />
                                  <label htmlFor="caffeine" className="text-[10px] font-sans font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                                    Caffeine Overclock
                                  </label>
                                </div>
                              </div>

                              {/* Progress bar */}
                              {isHackCompiling && (
                                <div className="space-y-1 font-sans">
                                  <div className="flex justify-between text-[9px] text-zinc-600 dark:text-zinc-400 font-black uppercase tracking-wider">
                                    <span>Compiling Stack...</span>
                                    <span>{hackProgress}%</span>
                                  </div>
                                  <div className="w-full bg-zinc-200 dark:bg-zinc-900 border border-black/5 dark:border-white/5 h-3 p-0.5 rounded-lg overflow-hidden shadow-inner">
                                    <div 
                                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                                      style={{ width: `${hackProgress}%` }}
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Terminal Display */}
                              <div className="bg-zinc-950 border border-black/30 text-white p-3 font-mono text-[10px] rounded-xl min-h-[90px] max-h-[120px] overflow-y-auto space-y-1 select-text scrollbar-thin shadow-inner">
                                {hackLogs.map((line, i) => (
                                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-end">
                              <button
                                onClick={runCompiler}
                                disabled={isHackCompiling}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
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
                              <div className="flex justify-between items-start gap-4 flex-wrap sm:flex-nowrap">
                                <div className="space-y-1 flex-grow w-full sm:w-auto">
                                  <label className="text-[9px] font-sans font-black uppercase tracking-wider text-zinc-500 block">Sufi Audio Mehfil Player:</label>
                                  <div className="bg-zinc-900 p-2 flex items-center gap-3 rounded-xl border border-black/20 select-none shadow-sm">
                                    <button 
                                      onClick={() => setIsPlayingSufi(!isPlayingSufi)}
                                      className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                                    >
                                      {isPlayingSufi ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                                    </button>
                                    <div className="flex-grow min-w-0">
                                      <span className="block font-sans text-xs text-white truncate font-black uppercase tracking-wide">
                                        {sufiTracks[activeTrackIndex].title}
                                      </span>
                                      <span className="block font-mono text-[9px] text-rose-400 font-bold">
                                        Artist: {sufiTracks[activeTrackIndex].artist}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1 shrink-0 w-24">
                                  <label className="text-[9px] font-sans font-black uppercase tracking-wider text-zinc-500 block">Volume ({sufiVolume}%):</label>
                                  <div className="flex items-center gap-1.5 h-9 pt-1.5">
                                    {sufiVolume === 0 ? <VolumeX className="w-4 h-4 text-black dark:text-white shrink-0" /> : <Volume2 className="w-4 h-4 text-black dark:text-white shrink-0" />}
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={sufiVolume}
                                      onChange={(e) => setSufiVolume(Number(e.target.value))}
                                      className="w-full accent-rose-600 cursor-pointer h-1 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none focus:outline-none"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* visualizer animation */}
                              <div className="bg-zinc-950 p-2.5 rounded-xl flex flex-col gap-1.5 h-16 items-stretch justify-end shadow-inner">
                                <div className="flex justify-between items-end gap-0.5 flex-grow">
                                  {sufiVisualizer.map((val, idx) => (
                                    <div 
                                      key={idx} 
                                      className="bg-gradient-to-t from-rose-600 to-amber-400 w-full transition-all duration-150 rounded-t"
                                      style={{ height: isPlayingSufi ? `${val}%` : "5%" }}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* translation box */}
                              <div className="p-3 bg-rose-500/5 dark:bg-rose-500/2 rounded-xl border border-rose-500/10 font-serif text-[11px] text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                                <span className="block font-sans text-[8px] font-black uppercase tracking-widest text-rose-500 dark:text-rose-400 not-italic mb-1">
                                  Sufi Lyrics English Translation:
                                </span>
                                "{sufiTracks[activeTrackIndex].translation}"
                              </div>
                            </div>

                            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center flex-wrap gap-2">
                              <div className="flex gap-2">
                                {sufiTracks.map((track, i) => (
                                  <button
                                    key={i}
                                    onClick={() => { setActiveTrackIndex(i); setIsPlayingSufi(true); }}
                                    className={cn(
                                      "px-2.5 py-1 text-[9px] font-sans font-black uppercase tracking-wider transition-all border rounded-lg cursor-pointer",
                                      activeTrackIndex === i 
                                        ? "bg-rose-600 text-white border-transparent shadow-sm" 
                                        : "bg-white/40 dark:bg-zinc-900/40 border-black/10 dark:border-white/10 text-black dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                                    )}
                                  >
                                    Track 0{i + 1}
                                  </button>
                                ))}
                              </div>
                              <span className="font-sans text-[9px] text-zinc-500 uppercase font-black tracking-widest">
                                Status: {isPlayingSufi ? "Playing" : "Paused"}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* 4. Auctions Interactive Layout */}
                        {win.id === "auction" && (
                          <div className="flex-grow flex flex-col justify-between h-full">
                            <div className="space-y-4">
                              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-bold">
                                Place live digital bids on prestigious club memorabilia:
                              </p>

                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-sans font-black uppercase tracking-wider text-zinc-500 block">Select Auction Lot:</label>
                                  <select 
                                    value={selectedAuctionIdx} 
                                    onChange={(e) => setSelectedAuctionIdx(Number(e.target.value))}
                                    className="w-full bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-bold text-black dark:text-white outline-none focus:border-rose-500"
                                  >
                                    {auctionItems.map((item, idx) => (
                                      <option key={idx} value={idx} className="text-black dark:text-white dark:bg-zinc-900">{item.name}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="bg-blue-500/5 dark:bg-blue-500/2 rounded-xl p-3 border border-blue-500/10 grid grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-[8px] font-sans text-zinc-500 block uppercase font-black tracking-widest">Opening Bid:</span>
                                    <span className="font-serif font-black text-sm text-black dark:text-white">
                                      ${auctionItems[selectedAuctionIdx].minBid}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[8px] font-sans text-zinc-500 block uppercase font-black tracking-widest">Current Bid:</span>
                                    <span className="font-serif font-black text-sm text-blue-600 dark:text-blue-400 text-glow-sapphire">
                                      ${auctionItems[selectedAuctionIdx].curBid}
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-[9px] font-sans font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                    <span>Set Your Bid Amount:</span>
                                    <span className="text-blue-600 dark:text-blue-400 font-black text-xs">${bidValue}</span>
                                  </div>
                                  <input
                                    type="range"
                                    min={auctionItems[selectedAuctionIdx].curBid + 100}
                                    max={auctionItems[selectedAuctionIdx].curBid + 5000}
                                    step="100"
                                    value={bidValue}
                                    onChange={(e) => setBidValue(Number(e.target.value))}
                                    className="w-full accent-blue-600 cursor-pointer h-1 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Terminal Display */}
                              <div className="bg-zinc-950 border border-black/30 text-white p-3 font-mono text-[10px] rounded-xl min-h-[70px] max-h-[100px] overflow-y-auto space-y-1 select-text scrollbar-thin shadow-inner">
                                {auctionLogs.map((line, i) => (
                                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-end">
                              <button
                                onClick={placeBid}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
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
                              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-bold">
                                Pitch your revolutionary startup venture. Calibrate terms below:
                              </p>

                              <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-3 space-y-1">
                                  <label className="text-[9px] font-sans font-black uppercase tracking-wider text-zinc-500 block">Pitch Arena / Sector:</label>
                                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                                    {["EdTech", "CleanTech", "Culture", "AI / Web3"].map((domain) => (
                                      <button
                                        key={domain}
                                        onClick={() => setSharkDomain(domain)}
                                        className={cn(
                                          "flex-grow px-2 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                                          sharkDomain === domain 
                                            ? "bg-purple-600 text-white border-transparent shadow-sm" 
                                            : "bg-white/40 dark:bg-zinc-900/40 border-black/10 dark:border-white/10 text-black dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                                        )}
                                      >
                                        {domain}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-1 col-span-3 sm:col-span-3">
                                  <div className="flex justify-between items-center text-[9px] font-sans font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                    <span>Valuation Request ($M):</span>
                                    <span className="text-black dark:text-white font-black text-xs">${sharkValuation} Million</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    step="0.5"
                                    value={sharkValuation}
                                    onChange={(e) => setSharkValuation(Number(e.target.value))}
                                    className="w-full accent-purple-600 cursor-pointer h-1 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-1 col-span-3 sm:col-span-3">
                                  <div className="flex justify-between items-center text-[9px] font-sans font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                    <span>Equity Offered (%):</span>
                                    <span className="text-black dark:text-white font-black text-xs">{sharkEquity}% Equity</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="2"
                                    max="40"
                                    step="1"
                                    value={sharkEquity}
                                    onChange={(e) => setSharkEquity(Number(e.target.value))}
                                    className="w-full accent-purple-600 cursor-pointer h-1 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Shark Speech Bubble */}
                              {sharkReaction && (
                                <div className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl relative font-sans text-xs text-zinc-700 dark:text-zinc-300">
                                  <strong className="block text-purple-600 dark:text-purple-400 uppercase text-[9px] font-black tracking-widest mb-1">
                                    💬 {sharkReaction.name}:
                                  </strong>
                                  <p className="italic font-serif">"{sharkReaction.quote}"</p>
                                </div>
                              )}

                              {/* Terminal Logs */}
                              <div className="bg-zinc-950 border border-black/30 text-sky-400 p-3 font-mono text-[10px] rounded-xl min-h-[50px] max-h-[80px] overflow-y-auto space-y-1 select-text scrollbar-thin shadow-inner">
                                {sharkLogs.map((line, i) => (
                                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-end">
                              <button
                                onClick={pitchVenture}
                                disabled={isPitching}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
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
                    <div className="bg-zinc-300 dark:bg-zinc-900 px-4 py-1.5 text-[9px] font-mono text-zinc-600 dark:text-zinc-400 flex justify-between border-t border-black/5 dark:border-white/5 select-none">
                      <span>CHAMBER: {win.title.toUpperCase()}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
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
                animate={{ opacity: 0.4 }}
                className="text-center space-y-3 select-none pointer-events-none"
              >
                <Laptop className="w-16 h-16 text-black dark:text-white mx-auto stroke-[1.5]" />
                <h4 className="font-sans text-xs font-black text-black dark:text-white uppercase tracking-widest">
                  DELEGATE OS // DEBATE SYSTEM V1.0
                </h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Double-click a shortcut to open the chamber widget.</p>
              </motion.div>
            )}
          </div>

          {/* Bottom Taskbar */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl border-t border-black/10 dark:border-white/10 px-3 flex justify-between items-center z-20 select-none">
            
            {/* Start Button */}
            <div className="relative">
              <button
                onClick={() => setStartMenuOpen(!startMenuOpen)}
                className={cn(
                  "h-8 px-3.5 flex items-center gap-1.5 border rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm",
                  startMenuOpen
                    ? "bg-rose-500 text-white border-transparent scale-95"
                    : "bg-white/50 dark:bg-zinc-900/50 border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/80 dark:hover:bg-zinc-800/80"
                )}
              >
                <span className="text-rose-500 dark:text-rose-400 font-black">✦</span>
                <span>Start</span>
              </button>

              {/* Start Menu Dropdown */}
              <AnimatePresence>
                {startMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-10 left-0 w-52 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl flex flex-col z-40 p-2 shadow-2xl"
                  >
                    <div className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-3 py-1.5 rounded-xl font-sans text-[9px] uppercase tracking-widest font-black mb-1.5">
                      System Menu
                    </div>
                    {windows.map(win => (
                      <button
                        key={win.id}
                        onClick={() => { focusWindow(win.id); setStartMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg font-sans text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:bg-rose-500 hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <win.icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
                        <span>Open {win.title}</span>
                      </button>
                    ))}
                    <div className="border-t border-black/5 dark:border-white/5 my-1.5" />
                    <div className="px-3 py-1 font-sans text-[8px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black">
                      The Delegate Club v1.0
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active window tabs in Taskbar */}
            <div className="flex-grow flex gap-1.5 px-3 overflow-x-auto justify-start max-w-[calc(100%-140px)] scrollbar-none">
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
                    className={cn(
                      "h-8 px-3 rounded-xl flex items-center gap-1.5 max-w-[120px] truncate border font-sans text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm shrink-0",
                      isActive
                        ? "bg-rose-500/10 dark:bg-rose-500/5 text-rose-500 dark:text-rose-400 border-rose-500/30 scale-95"
                        : "bg-white/40 dark:bg-zinc-900/40 border-black/10 dark:border-white/10 text-black dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                    )}
                  >
                    <win.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{win.title}</span>
                  </button>
                );
              })}
            </div>

            {/* System Status Tray */}
            <div className="h-8 px-3 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-xl border border-black/10 dark:border-white/10 flex items-center gap-2 font-sans text-[10px] text-black dark:text-zinc-300 font-bold">
              <AlertCircle className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 animate-pulse" />
              <Clock className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>{currentTime || "12:00 PM"}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
