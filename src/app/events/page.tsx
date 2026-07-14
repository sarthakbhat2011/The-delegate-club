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
}

export default function EventsHubPage() {
  const [activeEventId, setActiveEventId] = useState<EventId>("mun");
  const [registeredEvents, setRegisteredEvents] = useState<EventId[]>([]);
  const [hoveredCalDate, setHoveredCalDate] = useState<{ day: number; info: string } | null>(null);
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
      colorClass: "retro-titlebar-saffron",
      bgUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
      desc: "Step into the shoes of global leaders. High stakes, intense debates, and midnight crisis committees. Debate international security protocols under strict rules.",
      schedule: "July 24, 10:00 AM // Durbar Hall"
    },
    {
      id: "hackathon",
      title: "Hackathons",
      subtitle: "Sleep is a myth.",
      icon: Terminal,
      colorClass: "retro-titlebar-emerald",
      bgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      desc: "48 hours of pure coding adrenaline. Build the next big thing, consume excessive caffeine, and pitch your secure software solutions to industry titans.",
      schedule: "July 25, 09:00 AM // Byte Arena"
    },
    {
      id: "sufi",
      title: "Sufi Night",
      subtitle: "Soulful vibes only.",
      icon: Music,
      colorClass: "retro-titlebar-terracotta",
      bgUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop",
      desc: "When the lights go down, the music takes over. An immersive cultural concert experience to soothe the soul featuring dhol beats and harmoniums.",
      schedule: "July 26, 07:00 PM // Courtyard"
    },
    {
      id: "auction",
      title: "Auctions",
      subtitle: "Going once. Going twice.",
      icon: Gavel,
      colorClass: "retro-titlebar-marigold",
      bgUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop",
      desc: "High society meets Gen Z chaos. Bid on exclusive merit badges, rare court art, and once-in-a-lifetime VIP passes for charity.",
      schedule: "July 26, 04:00 PM // Treasury Office"
    },
    {
      id: "sharktank",
      title: "Shark Tank",
      subtitle: "Pitch or perish.",
      icon: TrendingUp,
      colorClass: "retro-titlebar-electric",
      bgUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
      desc: "Got an idea? Pitch it to our panel of ruthless judges (sharks). Secure backing, royal mentorship, and ultimate bragging rights.",
      schedule: "July 25, 02:00 PM // Sabha Chambers"
    }
  ];

  // Calendar dates details
  const calendarSchedules: { [key: number]: string } = {
    24: "Model UN Opening Crisis (10:00 AM)",
    25: "Hackathon Sprints & Shark Tank Pitching (09:00 AM)",
    26: "Charity Auctions & Sufi Night Concert (04:00 PM)"
  };

  const registerEvent = (id: EventId) => {
    if (registeredEvents.includes(id)) return;
    setRegisteredEvents(prev => [...prev, id]);
  };

  const activeEvent = eventList.find(e => e.id === activeEventId) || eventList[0];
  const ActiveIcon = activeEvent.icon;

  return (
    <main className="relative bg-[var(--color-brand-khaki-sand)] min-h-screen text-black select-none">
      {/* Subtle full-page Sufi concert night watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04] pointer-events-none mix-blend-multiply z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop')" }}
      />
      <Navbar />

      {/* scanlines screen flicker */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.12] z-30" />

      {/* Hero Header */}
      <section className="relative pt-36 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[var(--color-brand-saffron)] font-bold uppercase tracking-widest text-xs font-mono block mb-2">
            ✦ Court Command // Assembly Agenda
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
            <span className="calligraphy-heading glossy-heading">The Grand Agenda</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-mono max-w-xl mx-auto">
            Diplomatic Model UNs, elite hackathons, Sufi music, and venture pits.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------
          EVENTS CONTROL CENTER WINDOW (EVENT_COMMAND.EXE)
          ---------------------------------------------------- */}
      <section className="pb-24 px-4 md:px-8 max-w-6xl mx-auto relative z-20">
        <div className="retro-window-outset rounded-lg border-2 border-black flex flex-col min-h-[580px] shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          
          {/* Window Title Bar */}
          <div className={`px-3 py-1.5 flex justify-between items-center text-white font-mono bg-gradient-to-r ${activeEvent.colorClass}`}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-xs font-bold uppercase tracking-wider">EVENT_COMMAND.EXE // Grand Assembly Manager</span>
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
            <span className="hover:underline cursor-pointer">Register</span>
            <span className="hover:underline cursor-pointer">Calendar</span>
            <span className="hover:underline cursor-pointer">Help</span>
          </div>

          {/* Window Client Workspace */}
          <div className="flex-grow bg-[#dfdfdf] p-4 flex flex-col lg:flex-row gap-4 min-h-0 border-t border-white">
            
            {/* Left Column: Explorer Directory Tree of Events */}
            <div className="lg:w-1/3 retro-window-inset rounded p-3 select-none flex flex-col justify-between bg-white border border-gray-400">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase font-black block border-b border-gray-200 pb-1">
                  Active Chambers
                </span>

                <div className="space-y-2 font-mono text-xs text-black">
                  {eventList.map((evt) => {
                    const EvtIcon = evt.icon;
                    return (
                      <button 
                        key={evt.id}
                        onClick={() => setActiveEventId(evt.id)}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left ${activeEventId === evt.id ? "bg-[#000080] text-white" : "hover:bg-gray-100"}`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <EvtIcon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{evt.title.toUpperCase()}</span>
                        </div>
                        {registeredEvents.includes(evt.id) && (
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${activeEventId === evt.id ? "text-emerald-300" : "text-emerald-600"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Decorative Diagnostic Widget */}
              <div className="bg-[#fff8f5] p-2.5 rounded border border-gray-300 font-mono text-[9px] text-[#87361e] space-y-1 mt-4">
                <span className="block font-bold">STATUS REPORT:</span>
                <span className="block">Dharma checks ....... [OK]</span>
                <span className="block">System Security ..... Verified</span>
                <span className="block">Active Ports ........ 8080</span>
              </div>
            </div>

            {/* Right Column: Active Event Viewer */}
            <div className="flex-grow flex flex-col min-h-0 bg-white rounded border border-gray-400 p-4 relative overflow-y-auto">
              
              {/* High-visibility Court Hall Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.18] pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url('${activeEvent.bgUrl}')` }}
              />
              
              <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.08]" />

              <div className="relative z-10 h-full flex flex-col justify-between gap-4">
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase font-black">
                      Event Node // {activeEvent.id.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-gray-700 font-bold uppercase">
                      Status: <strong className="text-emerald-600">Registering</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-50 border-2 border-black rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                      <ActiveIcon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-black text-black uppercase tracking-tight leading-none">
                        {activeEvent.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[var(--color-brand-electric-blue)] font-bold block mt-1 uppercase">
                        {activeEvent.subtitle}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-gray-700 leading-relaxed font-medium">
                    {activeEvent.desc}
                  </p>

                  <div className="retro-window-inset bg-[#fff8f5] p-3 rounded border border-gray-300 space-y-1.5 font-mono text-xs text-black">
                    <p><strong className="text-gray-500 block text-[9px] uppercase">Assembly Schedule:</strong> {activeEvent.schedule}</p>
                    <p><strong className="text-gray-500 block text-[9px] uppercase">Security Level:</strong> Protected under court guidelines (SSL checksum validated)</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#808080] flex justify-end">
                  {registeredEvents.includes(activeEvent.id) ? (
                    <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Registered for Court</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => registerEvent(activeEvent.id)}
                      className="retro-button px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md transform hover:scale-102 active:scale-95"
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
          <div className="bg-[#c0c0c0] px-3 py-1 border-t border-[#808080] text-[9px] font-mono text-black flex justify-between border-b border-white select-none">
            <span>Assembly Hub Connected</span>
            <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
