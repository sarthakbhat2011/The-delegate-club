"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, X, Minus, Square, Key, User } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials. The Council denies access.");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-brand-khaki-sand)] flex items-center justify-center relative overflow-hidden px-4 select-none">
      
      {/* Background CRT Scanlines */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.16] z-30" />

      {/* Retro desktop background grid */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

      <Link href="/" className="absolute top-8 left-8 text-black hover:underline z-20 font-mono tracking-widest text-xs uppercase flex items-center gap-1">
        &larr; Return to Court OS
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="retro-window-outset w-full max-w-md rounded-lg border-2 border-[var(--color-brand-cyber-purple)] flex flex-col shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-shadow duration-300 relative z-10"
      >
        
        {/* Title Bar - Cyber Gradient */}
        <div className="px-3 py-1.5 flex justify-between items-center text-white font-mono bg-gradient-to-r from-[var(--color-brand-cyber-purple)] via-[#5b21b6] to-[var(--color-brand-electric-blue)] select-none">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-white animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">LOGIN.SYS // Cybernetic Auth Portal</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0">
              <Minus className="w-3 h-3 stroke-[3]" />
            </button>
            <button className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0 cursor-not-allowed" disabled>
              <Square className="w-2.5 h-2.5 stroke-[3]" />
            </button>
            <Link href="/" className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0 hover:bg-red-600 hover:text-white">
              <X className="w-3.5 h-3.5 stroke-[3]" />
            </Link>
          </div>
        </div>

        {/* Options Bar */}
        <div className="bg-[#c0c0c0] px-3 py-1 border-b border-[#808080] flex justify-between items-center text-[10px] font-mono text-black font-medium border-t border-white select-none">
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Security</span>
            <span className="hover:underline cursor-pointer">Help</span>
          </div>
          {/* Cyber status pill */}
          <div className="flex items-center gap-1 bg-black/90 border border-emerald-400 text-emerald-400 px-1.5 py-0.5 rounded text-[8px] font-bold shadow-[0_0_8px_rgba(52,211,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CYBER_SHIELD: ON</span>
          </div>
        </div>

        {/* Login Form body */}
        <form onSubmit={handleSubmit} className="bg-[#dfdfdf] p-6 flex flex-col gap-5 border-t border-white">
          
          {/* Intro diagnostic alert block */}
          <div className="bg-[#fff8f5] p-3 rounded border border-gray-300 font-mono text-[10px] text-[#87361e] space-y-1">
            <span className="block font-bold">WARNING:</span>
            <span className="block">Authorized Council members only. Credentials routed through multi-layered cryptographic vaults.</span>
          </div>

          <div className="space-y-4 font-mono text-xs text-black">
            
            {/* Username field */}
            <div className="space-y-1">
              <label className="block font-bold text-gray-700 uppercase">User Name / Email:</label>
              <div className="relative">
                <input 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full retro-window-inset bg-white border border-gray-400 p-2.5 rounded text-black outline-none focus:border-[var(--color-brand-electric-blue)] focus:ring-1 focus:ring-[var(--color-brand-electric-blue)] focus:shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all font-mono"
                  placeholder="delegate@court.edu"
                />
              </div>
            </div>

            {/* Passphrase field */}
            <div className="space-y-1">
              <label className="block font-bold text-gray-700 uppercase">Passphrase / Key:</label>
              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full retro-window-inset bg-white border border-gray-400 p-2.5 rounded text-black outline-none focus:border-[var(--color-brand-electric-blue)] focus:ring-1 focus:ring-[var(--color-brand-electric-blue)] focus:shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-red-700 font-mono text-xs text-center border-t border-red-200 pt-2"
            >
              ⚠️ {error}
            </motion.p>
          )}

          {/* Form buttons row */}
          <div className="border-t border-[#808080] pt-4 mt-2 flex justify-end gap-2.5 select-none">
            <Link 
              href="/join"
              className="retro-button px-5 py-2 text-xs font-mono font-bold uppercase text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center justify-center"
            >
              Apply now
            </Link>
            <button 
              type="submit"
              disabled={isLoading}
              className="retro-button px-6 py-2 text-xs font-mono font-bold uppercase text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-wait"
            >
              {isLoading ? "Verifying..." : "OK [Enter]"}
            </button>
          </div>

        </form>

        {/* Window Footer Status bar */}
        <div className="bg-[#c0c0c0] px-3 py-1 border-t border-[#808080] text-[9px] font-mono text-black flex justify-between border-b border-white select-none">
          <span>Auth Module Active</span>
          <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
        </div>

      </motion.div>
    </main>
  );
}
