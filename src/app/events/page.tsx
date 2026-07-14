"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { 
  Folder, Globe, Terminal, Music, Gavel, 
  TrendingUp, Calendar, ArrowRight, CheckCircle2,
  X, Square, Minus, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";
import { cn } from "@/lib/utils";

type EventId = "mun" | "hackathon" | "sufi" | "auction" | "sharktank";

interface ClubEvent {
  id: EventId;
  title: string;
  subtitle: string;
  icon: any;
  colorClass: string;
  bgUrl: string;
  desc: string;
  schedule: string;
  activeColor: string;
}

export default function EventsHubPage() {
  const [activeEventId, setActiveEventId] = useState<EventId>("mun");
  const [registeredEvents, setRegisteredEvents] = useState<EventId[]>([]);
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

  const eventList: ClubEvent[] = [
    {
      id: "mun",
      title: "Model UN",
      subtitle: "Global Diplomacy, Local Drip.",
      icon: Globe,
      colorClass: "from-amber-500 to-yellow-500 shadow-[0_0_15px_-3px_rgba(217,119,6,0.3)]",
      bgUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
      desc: "Step into the shoes of global leaders. High stakes, intense debates, and midnight crisis committees. Debate international security protocols under strict rules.",
      schedule: "July 24, 10:00 AM // Durbar Hall",
      activeColor: "bg-amber-500 hover:bg-amber-600"
    },
    {
      id: "hackathon",
      title: "Hackathons",
      subtitle: "Sleep is a myth.",
      icon: Terminal,
      colorClass: "from-emerald-500 to-green-500 shadow-[0_0_15px_-3px_rgba(5,150,105,0.3)]",
      bgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      desc: "48 hours of pure coding adrenaline. Build the next big thing, consume excessive caffeine, and pitch your secure software solutions to industry titans.",
      schedule: "July 25, 09:00 AM // Byte Arena",
      activeColor: "bg-emerald-600 hover:bg-emerald-700"
    },
    {
      id: "sufi",
      title: "Sufi Night",
      subtitle: "Soulful vibes only.",
      icon: Music,
      colorClass: "from-rose-500 to-red-500 shadow-[0_0_15px_-3px_rgba(225,29,72,0.3)]",
      bgUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop",
      desc: "When the lights go down, the music takes over. An immersive cultural concert experience to soothe the soul featuring dhol beats and harmoniums.",
      schedule: "July 26, 07:00 PM // Courtyard",
      activeColor: "bg-rose-600 hover:bg-rose-700"
    },
    {
      id: "auction",
      title: "Auctions",
      subtitle: "Going once. Going twice.",
      icon: Gavel,
      colorClass: "from-blue-500 to-indigo-500 shadow-[0_0_15px_-3px_rgba(37,99,235,0.3)]",
      bgUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop",
      desc: "High society meets Gen Z chaos. Bid on exclusive merit badges, rare court art, and once-in-a-lifetime VIP passes for charity.",
      schedule: "July 26, 04:00 PM // Treasury Office",
      activeColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "sharktank",
      title: "Shark Tank",
      subtitle: "Pitch or perish.",
      icon: TrendingUp,
      colorClass: "from-purple-500 to-pink-500 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]",
      bgUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
      desc: "Got an idea? Pitch it to our panel of ruthless judges (sharks). Secure backing, royal mentorship, and ultimate bragging rights.",
      schedule: "July 25, 02:00 PM // Sabha Chambers",
      activeColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  const registerEvent = (id: EventId) => {
    if (registeredEvents.includes(id)) return;
    setRegisteredEvents(prev => [...prev, id]);
  };

  const activeEvent = eventList.find(e => e.id === activeEventId) || eventList[0];
  const ActiveIcon = activeEvent.icon;

  return (
    <main className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="relative pt-36 pb-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="text-rose-500 dark:text-rose-400 font-black uppercase tracking-widest text-xs block mb-2">
              ✦ Court Command // Assembly Agenda
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
              <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">The Grand Agenda</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs font-black uppercase tracking-wider max-w-xl mx-auto">
              Diplomatic Model UNs, elite hackathons, Sufi music, and venture pits.
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------
            EVENTS CONTROL CENTER WINDOW (EVENT_COMMAND.EXE)
            ---------------------------------------------------- */}
        <section className="pb-24 px-4 md:px-8 max-w-6xl mx-auto relative z-20">
          <div className="stained-glass border border-black/10 dark:border-white/10 rounded-2xl flex flex-col min-h-[580px] shadow-2xl overflow-hidden">
            
            {/* Window Title Bar */}
            <div className={cn(
              "px-4 py-2 flex justify-between items-center text-white bg-gradient-to-r shadow-sm transition-all duration-300",
              activeEvent.colorClass
            )}>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">EVENT_COMMAND.EXE // Grand Assembly Manager</span>
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

            {/* Menu Options Bar */}
            <div className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md px-4 py-2 border-b border-black/5 dark:border-white/5 flex gap-4 text-[10px] font-sans text-black dark:text-zinc-300 font-black uppercase tracking-wider select-none">
              <span className="hover:text-rose-500 cursor-pointer">File</span>
              <span className="hover:text-rose-500 cursor-pointer">Register</span>
              <span className="hover:text-rose-500 cursor-pointer">Calendar</span>
              <span className="hover:text-rose-500 cursor-pointer">Help</span>
            </div>

            {/* Window Client Workspace */}
            <div className="flex-grow bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-4 flex flex-col lg:flex-row gap-4 min-h-0 border-t border-black/5 dark:border-white/5">
              
              {/* Left Column: Explorer Directory Tree of Events */}
              <div className="lg:w-1/3 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl p-3 flex flex-col justify-between gap-4 overflow-y-auto">
                <div className="space-y-4">
                  <span className="text-[9px] font-sans text-zinc-500 dark:text-zinc-400 uppercase font-black block border-b border-black/5 dark:border-white/5 pb-1 tracking-wider">
                    Active Chambers
                  </span>

                  <div className="space-y-2 font-sans text-xs font-black uppercase tracking-wider text-black dark:text-white">
                    {eventList.map((evt) => {
                      const EvtIcon = evt.icon;
                      const isSelected = activeEventId === evt.id;
                      return (
                        <button 
                          key={evt.id}
                          onClick={() => setActiveEventId(evt.id)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-left cursor-pointer",
                            isSelected 
                              ? cn(
                                  "text-white border-transparent shadow-sm",
                                  evt.id === "mun" && "bg-amber-500",
                                  evt.id === "hackathon" && "bg-emerald-500",
                                  evt.id === "sufi" && "bg-rose-500",
                                  evt.id === "auction" && "bg-blue-500",
                                  evt.id === "sharktank" && "bg-purple-500"
                                )
                              : "border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                          )}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <EvtIcon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{evt.title}</span>
                          </div>
                          {registeredEvents.includes(evt.id) && (
                            <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0", isSelected ? "text-white" : "text-emerald-500")} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Diagnostic Widget */}
                <div className="bg-rose-500/5 dark:bg-rose-500/2 p-2.5 rounded-xl border border-rose-500/10 font-mono text-[9px] text-rose-600 dark:text-rose-400 space-y-1 mt-4">
                  <span className="block font-bold">STATUS REPORT:</span>
                  <span className="block">Dharma checks ....... [OK]</span>
                  <span className="block">System Security ..... Verified</span>
                  <span className="block">Active Ports ........ 8080</span>
                </div>
              </div>

              {/* Right Column: Active Event Viewer */}
              <div className="flex-grow flex flex-col min-h-0 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl p-4 relative overflow-y-auto">
                <div className="relative z-10 h-full flex flex-col justify-between gap-4 text-black dark:text-white">
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                      <span className="text-[9px] font-sans text-zinc-500 dark:text-zinc-400 uppercase font-black tracking-wider">
                        Event Node // {activeEvent.id.toUpperCase()}
                      </span>
                      <span className="text-[9px] font-sans text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-wider">
                        Status: <strong className="text-emerald-600 dark:text-emerald-400">Registering</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-3 rounded-xl border flex items-center justify-center bg-white/60 dark:bg-zinc-900/60 shadow-sm",
                        activeEvent.id === "mun" && "border-amber-500/30 text-amber-500 shadow-[0_0_10px_rgba(217,119,6,0.15)]",
                        activeEvent.id === "hackathon" && "border-emerald-500/30 text-emerald-500 shadow-[0_0_10px_rgba(5,150,105,0.15)]",
                        activeEvent.id === "sufi" && "border-rose-500/30 text-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.15)]",
                        activeEvent.id === "auction" && "border-blue-500/30 text-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.15)]",
                        activeEvent.id === "sharktank" && "border-purple-500/30 text-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                      )}>
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-sans text-2xl font-black uppercase tracking-tight leading-none">
                          {activeEvent.title}
                        </h3>
                        <span className="text-[9px] font-sans font-black tracking-widest text-zinc-500 dark:text-zinc-400 block mt-1 uppercase">
                          {activeEvent.subtitle}
                        </span>
                      </div>
                    </div>

                    <p className="font-medium text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {activeEvent.desc}
                    </p>

                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5 space-y-2 font-mono text-xs shadow-inner">
                      <p><strong className="text-zinc-500 uppercase text-[9px] tracking-wider block">Assembly Schedule:</strong> {activeEvent.schedule}</p>
                      <p><strong className="text-zinc-500 uppercase text-[9px] tracking-wider block">Security Level:</strong> Protected under court guidelines (SSL checksum validated)</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-end">
                    {registeredEvents.includes(activeEvent.id) ? (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Registered for Court</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => registerEvent(activeEvent.id)}
                        className={cn(
                          "text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5",
                          activeEvent.activeColor
                        )}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Join Assembly Chamber</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>

            </div>

            {/* Window Footer Status bar */}
            <div className="bg-zinc-300 dark:bg-zinc-900 px-4 py-1.5 text-[9px] font-mono text-zinc-600 dark:text-zinc-400 flex justify-between border-t border-black/5 dark:border-white/5 select-none shadow-sm">
              <span>Assembly Hub Connected</span>
              <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
