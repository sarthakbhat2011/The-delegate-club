"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Monitor, ShieldAlert } from "lucide-react";

interface BIOSBootScreenProps {
  onBootComplete: () => void;
}

export function BIOSBootScreen({ onBootComplete }: BIOSBootScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [bootReady, setBootReady] = useState(false);
  const [booting, setBooting] = useState(false);

  const biosScript = [
    "SABHA AMIBIOS (C) 2026 Sabha Megatrends, Inc.",
    "BIOS Date: 07/13/2026 15:14:14 Ver: 4.0G",
    "CPU : Gen Z Core Processor @ 5.00GHz",
    "Speed: 5000MHz  Cores: 8  L2 Cache: 2048KB",
    "--------------------------------------------------",
    "Memory Test : 16384KB OK",
    "System security status: ENORMOUSLY SECURED (SSL/TLS calibrated)",
    "Detecting IDE devices ...",
    "  Primary Master : DELEGATE-HDD-3.0GB (SATA-III)",
    "  Primary Slave  : GALA-SOUND-DSP (DSP Sound Revision 1)",
    "Initializing Sabha OS components ...",
    "  [+] Debate Resolution Treaty Engine ....... [OK]",
    "  [+] Byte Compiler Cafe Suite ............... [OK]",
    "  [+] Gala Ambient Sound Sequencer ........... [OK]",
    "  [+] Venture Pitch Validator ................ [OK]",
    "  [+] Cryptographic Merit Bidder ............. [OK]",
    "Checking host network interfaces ... Ready.",
    "System Status: 100% OPERATIONAL. SECURE DEBATE PORT READY."
  ];

  // Sequentially display bios lines
  useEffect(() => {
    let currentLineIdx = 0;
    const interval = setInterval(() => {
      if (currentLineIdx < biosScript.length) {
        const nextLine = biosScript[currentLineIdx];
        setLines(prev => [...prev, nextLine]);
        currentLineIdx++;
      } else {
        clearInterval(interval);
        setBootReady(true);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Synthesise Ascending 8-bit Boot Sound
  const playBootSound = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      const ctx = new AudioContextClass();
      
      // We play 4 short square-wave notes in an ascending arpeggio (C4, E4, G4, C5)
      const frequencies = [261.63, 329.63, 392.00, 523.25];
      
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.15);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.18);
      });
    } catch (e) {
      console.warn("Failed to play boot sound:", e);
    }
  };

  const handleBoot = () => {
    if (!bootReady || booting) return;
    setBooting(true);
    playBootSound();
    
    // Simulate system boot delay
    setTimeout(() => {
      onBootComplete();
    }, 1200);
  };

  // Listen to keyboard Enter to boot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && bootReady) {
        handleBoot();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bootReady]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-[#a0a0a0] font-mono p-6 flex flex-col justify-between select-none">
      
      {/* CRT Scanline Layer */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.25] z-40" />

      {/* Top BIOS Area */}
      <div className="max-w-4xl mx-auto w-full space-y-4 overflow-y-auto max-h-[80vh] scrollbar-thin">
        
        {/* Header Logo Info */}
        <div className="flex gap-4 items-start border-b border-gray-800 pb-4">
          <div className="w-10 h-10 border-2 border-[#a0a0a0] flex items-center justify-center font-bold text-lg bg-black shrink-0 text-white shadow-[2px_2px_0px_#a0a0a0]">
            S
          </div>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-wider">Sabha Megatrends v4.0G</h1>
            <p className="text-[10px]">AMIBIOS System Bootloader // Sabha OS Kernel V1.0</p>
          </div>
        </div>

        {/* Dynamic terminal log lines */}
        <div className="space-y-1.5 text-xs">
          {lines.map((line, idx) => {
            if (!line) return null;
            return (
              <p 
                key={idx} 
                className={`leading-relaxed whitespace-pre-wrap ${
                  line.includes("[OK]") 
                    ? "text-emerald-400 font-bold" 
                    : line.includes("SECURED") 
                    ? "text-cyan-400 font-bold" 
                    : ""
                }`}
              >
                {line}
              </p>
            );
          })}
          
          {/* Animated blinking cursor */}
          {!bootReady && (
            <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse ml-1" />
          )}
        </div>

      </div>

      {/* Bottom Interactive Command prompt area */}
      <div className="max-w-4xl mx-auto w-full border-t border-gray-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-50">
        
        <div className="flex items-center gap-2 text-xs">
          <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Security Level: <strong className="text-cyan-400 uppercase font-black">Enormously Protected</strong></span>
        </div>

        {bootReady ? (
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleBoot}
              className={`px-6 py-2.5 rounded border-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                booting
                  ? "bg-[#202020] text-gray-500 border-gray-600 cursor-wait"
                  : "bg-white text-black border-white hover:bg-emerald-500 hover:border-emerald-500 hover:text-white shadow-[4px_4px_0px_#3f3f3f] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#3f3f3f] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
              }`}
              disabled={booting}
            >
              <Monitor className="w-4 h-4 animate-pulse" />
              <span>{booting ? "Booting Court OS..." : "Boot Court OS [Enter]"}</span>
            </button>
            <span className="text-[9px] text-[#808080] uppercase tracking-wider animate-pulse">
              * Click to play arpeggio chime &amp; boot
            </span>
          </div>
        ) : (
          <span className="text-xs text-[#606060] uppercase animate-pulse">
            Performing primary BIOS memory audit...
          </span>
        )}

      </div>

    </div>
  );
}
