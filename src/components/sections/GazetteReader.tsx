"use client";

import React, { useState, useEffect } from "react";
import { 
  X, Square, Minus, Mail, FileText, ArrowRight, 
  Calendar, Check, ShieldAlert, Award, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  urgency: "HIGH" | "MEDIUM" | "LOW";
  author: string;
}

interface GazetteReaderProps {
  posts: Post[];
}

export function GazetteReader({ posts }: GazetteReaderProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(posts[0]?.slug || "");
  const [currentTime, setCurrentTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const selectedPost = posts.find(p => p.slug === selectedSlug) || posts[0];

  // Filter posts based on search
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stained-glass border border-black/10 dark:border-white/10 rounded-2xl flex flex-col min-h-[580px] shadow-2xl overflow-hidden">
      
      {/* Title Bar */}
      <div className="px-4 py-2 flex justify-between items-center text-white bg-gradient-to-r from-amber-500 to-yellow-500 shadow-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-white animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest">GAZETTE_READER.EXE // Sutras &amp; Decrees</span>
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
      <div className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md px-4 py-2 border-b border-black/5 dark:border-white/5 flex flex-wrap justify-between items-center text-[10px] font-sans text-black dark:text-zinc-300 select-none gap-2">
        <div className="flex gap-4 font-black uppercase tracking-wider">
          <span className="hover:text-amber-500 cursor-pointer">File</span>
          <span className="hover:text-amber-500 cursor-pointer">Edit</span>
          <span className="hover:text-amber-500 cursor-pointer">Folder</span>
          <span className="hover:text-amber-500 cursor-pointer">Help</span>
        </div>
        
        {/* Search bar inside menu */}
        <div className="flex items-center gap-1.5">
          <label className="text-[9px] font-black uppercase tracking-wider text-zinc-500">Search Gazette:</label>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search decrees..."
            className="bg-white/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-lg px-2 py-1 text-[9px] font-bold outline-none w-32 focus:border-amber-500 transition-colors text-black dark:text-white"
          />
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="flex-grow bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-4 flex flex-col gap-4 min-h-0 border-t border-black/5 dark:border-white/5">
        
        {/* Top Pane: Decrees Table Grid */}
        <div className="bg-white/40 dark:bg-zinc-900/40 border border-black/10 dark:border-white/10 rounded-xl overflow-y-auto max-h-[180px] min-h-[120px] shadow-sm">
          <table className="w-full text-left font-sans text-xs border-collapse text-black dark:text-white">
            <thead className="bg-zinc-300 dark:bg-zinc-800 sticky top-0 text-[10px] font-black uppercase tracking-wider border-b border-black/10 dark:border-white/10 z-10 text-zinc-600 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2.5 border-r border-black/5 dark:border-white/5">SUBJECT</th>
                <th className="px-4 py-2.5 border-r border-black/5 dark:border-white/5 w-28">DATE</th>
                <th className="px-4 py-2.5 border-r border-black/5 dark:border-white/5 w-24 text-center">PRIORITY</th>
                <th className="px-4 py-2.5 w-28">ISSUED BY</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-zinc-500 italic font-medium">
                    No decrees match the search query.
                  </td>
                </tr>
              ) : (
                filteredPosts.map(post => {
                  const isSelected = post.slug === selectedSlug;
                  return (
                    <tr 
                      key={post.slug}
                      onClick={() => setSelectedSlug(post.slug)}
                      className={cn(
                        "hover:bg-white/60 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors border-b border-black/5 dark:border-white/5",
                        isSelected ? "bg-amber-500 text-white font-bold" : "text-zinc-700 dark:text-zinc-300"
                      )}
                    >
                      <td className="px-4 py-2.5 font-bold truncate max-w-[200px] border-r border-black/5 dark:border-white/5">
                        ✉ {post.title}
                      </td>
                      <td className="px-4 py-2.5 border-r border-black/5 dark:border-white/5">{post.date}</td>
                      <td className="px-4 py-2.5 text-center border-r border-black/5 dark:border-white/5">
                        <span className={cn(
                          "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider border",
                          post.urgency === "HIGH" 
                            ? isSelected ? "bg-red-950/60 border-red-500 text-red-300" : "bg-red-500/10 border-red-500/30 text-red-600" 
                            : isSelected ? "bg-yellow-950/60 border-yellow-500 text-yellow-300" : "bg-yellow-500/10 border-yellow-500/30 text-yellow-600"
                        )}>
                          {post.urgency}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">{post.author}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pane: Selected Decree Document Viewer */}
        <div className="flex-grow bg-white/60 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 rounded-xl p-4 relative overflow-y-auto min-h-[220px] flex flex-col justify-between shadow-sm select-text text-black dark:text-white">
          
          {selectedPost ? (
            <div className="relative z-10 space-y-4 h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Stamp Details Header */}
                <div className="flex justify-between items-start border-b border-black/5 dark:border-white/5 pb-3">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold tracking-wider">Assembly Gazette Decree //</span>
                    <h4 className="font-sans text-xl font-black text-foreground uppercase leading-tight mt-1">
                      {selectedPost.title}
                    </h4>
                  </div>
                  {/* Wax seal ornament - ruby stained glass gem */}
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 dark:bg-rose-500/10 border border-rose-500/30 flex items-center justify-center font-sans text-[8px] text-rose-600 dark:text-rose-400 font-black rotate-12 shadow-sm select-none">
                    TDC
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[9px] text-zinc-600 dark:text-zinc-400 bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5">
                  <p><strong>DATE:</strong> {selectedPost.date}</p>
                  <p><strong>PRIORITY:</strong> {selectedPost.urgency}</p>
                  <p><strong>ISSUED BY:</strong> {selectedPost.author}</p>
                  <p><strong>SECURITY:</strong> SHA256-VERIFIED</p>
                </div>

                {/* Body Content */}
                <div className="font-medium text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-3 prose dark:prose-invert max-w-none">
                  {selectedPost.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("#") || para.startsWith("##")) {
                      return <h4 key={i} className="font-sans text-base font-black text-amber-600 dark:text-amber-400 uppercase pt-2 tracking-wider">{para.replace(/^[#\s]+/, "")}</h4>;
                    }
                    if (para.startsWith("-")) {
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1 font-sans text-xs font-black uppercase text-zinc-600 dark:text-zinc-400 tracking-wider">
                          {para.split("\n").map((li, idx) => (
                            <li key={idx}>{li.replace(/^[\s-*-]+/, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith(">")) {
                      return (
                        <blockquote key={i} className="border-l-4 border-rose-500 pl-4 py-1 italic font-serif my-2 bg-rose-500/5 pr-2">
                          {para.replace(/^[>\s]+/, "")}
                        </blockquote>
                      );
                    }
                    return <p key={i} className="leading-relaxed">{para}</p>;
                  })}
                </div>
              </div>

              {/* Verified Footer Signature */}
              <div className="pt-4 border-t border-black/5 dark:border-white/5 mt-6 flex justify-between items-center text-[9px] font-sans text-amber-600 dark:text-amber-400 font-black tracking-widest">
                <span>VERIFIED SIGNATURE // COURT COUNCIL OF DELEGATES</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Checked &amp; Cryptographically Sown
                </span>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-grow py-12 text-zinc-400 dark:text-zinc-500 font-sans text-xs">
              <ShieldAlert className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-2 animate-bounce" />
              <span>Select a decree from the mail list above.</span>
            </div>
          )}

        </div>

      </div>

      {/* Window Footer Status bar */}
      <div className="bg-zinc-300 dark:bg-zinc-900 px-4 py-1.5 text-[9px] font-mono text-zinc-600 dark:text-zinc-400 flex justify-between border-t border-black/5 dark:border-white/5 select-none shadow-sm">
        <span>Gazette Mail Client Running</span>
        <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
      </div>

    </div>
  );
}
