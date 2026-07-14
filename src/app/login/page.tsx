"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, X, Minus, Square, Key, User } from "lucide-react";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";
import { cn } from "@/lib/utils";

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
    <main className="min-h-screen bg-background dark:bg-black transition-colors duration-500 flex items-center justify-center relative overflow-hidden px-4 select-none">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors z-20 font-sans tracking-widest text-xs font-black uppercase flex items-center gap-1.5">
        &larr; Return to Court OS
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="stained-glass w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 flex flex-col shadow-2xl hover:shadow-[0_0_35px_rgba(225,29,72,0.15)] transition-shadow duration-500 relative z-10 overflow-hidden"
      >
        
        {/* Title Bar */}
        <div className="px-4 py-2 flex justify-between items-center text-white bg-gradient-to-r from-rose-500 to-amber-500 shadow-sm select-none">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-white animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest">LOGIN.SYS // Cybernetic Auth Portal</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button className="w-5 h-5 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white border border-white/10 transition-colors cursor-pointer">
              <Minus className="w-3 h-3 stroke-[3]" />
            </button>
            <button className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center text-white/40 border border-white/5 cursor-not-allowed" disabled>
              <Square className="w-2.5 h-2.5 stroke-[3]" />
            </button>
            <Link href="/" className="w-5 h-5 rounded-lg bg-white/20 hover:bg-rose-600 flex items-center justify-center text-white border border-white/10 transition-colors">
              <X className="w-3 h-3 stroke-[3]" />
            </Link>
          </div>
        </div>

        {/* Options Bar */}
        <div className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md px-4 py-2 border-b border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-sans text-black dark:text-zinc-300 font-black uppercase tracking-wider select-none">
          <div className="flex gap-4">
            <span className="hover:text-rose-500 cursor-pointer">Security</span>
            <span className="hover:text-rose-500 cursor-pointer">Help</span>
          </div>
          {/* Cyber status pill */}
          <div className="flex items-center gap-1.5 bg-black/80 dark:bg-black/90 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-lg text-[8px] font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CYBER_SHIELD: ON</span>
          </div>
        </div>

        {/* Login Form body */}
        <form onSubmit={handleSubmit} className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-6 flex flex-col gap-5 border-t border-black/5 dark:border-white/5 text-foreground">
          
          {/* Intro diagnostic alert block */}
          <div className="bg-rose-500/5 dark:bg-rose-500/2 p-3 rounded-xl border border-rose-500/10 font-mono text-[9px] text-rose-600 dark:text-rose-400 space-y-1 shadow-inner">
            <span className="block font-bold">WARNING:</span>
            <span className="block">Authorized Council members only. Credentials routed through multi-layered cryptographic vaults.</span>
          </div>

          <div className="space-y-4 font-sans text-xs">
            
            {/* Username field */}
            <div className="space-y-1">
              <label className="block font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[10px]">User Name / Email:</label>
              <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-white/60 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 p-3 rounded-xl text-black dark:text-white outline-none focus:border-rose-500 transition-colors font-sans"
                placeholder="delegate@court.edu"
              />
            </div>

            {/* Passphrase field */}
            <div className="space-y-1">
              <label className="block font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[10px]">Passphrase / Key:</label>
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-white/60 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 p-3 rounded-xl text-black dark:text-white outline-none focus:border-rose-500 transition-colors font-sans"
                placeholder="••••••••"
              />
            </div>

          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-rose-500 font-mono text-xs text-center border-t border-rose-500/10 pt-2"
            >
              ⚠️ {error}
            </motion.p>
          )}

          {/* Form buttons row */}
          <div className="border-t border-black/5 dark:border-white/5 pt-4 mt-2 flex justify-end gap-2.5 select-none">
            <Link 
              href="/join"
              className="bg-white/40 dark:bg-zinc-900/40 border border-black/10 dark:border-white/10 text-black dark:text-zinc-300 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              Apply now
            </Link>
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-wait"
            >
              {isLoading ? "Verifying..." : "OK [Enter]"}
            </button>
          </div>

        </form>

        {/* Window Footer Status bar */}
        <div className="bg-zinc-300 dark:bg-zinc-900 px-4 py-1.5 text-[9px] font-mono text-zinc-600 dark:text-zinc-400 flex justify-between border-t border-black/5 dark:border-white/5 select-none shadow-sm">
          <span>Auth Module Active</span>
          <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
        </div>

      </motion.div>
    </main>
  );
}
