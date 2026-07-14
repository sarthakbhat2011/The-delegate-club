"use client";

import React, { useState, useEffect } from "react";
import { 
  X, Square, Minus, Mail, FileText, ArrowRight, 
  Calendar, Check, ShieldAlert, Award, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="retro-window-outset rounded-lg border-2 border-black flex flex-col min-h-[580px] shadow-[8px_8px_0px_rgba(0,0,0,1)]">
      
      {/* Title Bar */}
      <div className="px-3 py-1.5 flex justify-between items-center text-white font-mono bg-gradient-to-r from-[var(--color-brand-marigold)] to-[#b28800]">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-white animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-black">GAZETTE_READER.EXE // Sutras &amp; Decrees</span>
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
      <div className="bg-[#c0c0c0] px-3 py-1 border-b border-[#808080] flex justify-between items-center text-[10px] font-mono text-black border-t border-white select-none">
        <div className="flex gap-4 font-medium">
          <span className="hover:underline cursor-pointer">File</span>
          <span className="hover:underline cursor-pointer">Edit</span>
          <span className="hover:underline cursor-pointer">Folder</span>
          <span className="hover:underline cursor-pointer">Help</span>
        </div>
        
        {/* Search bar inside menu */}
        <div className="flex items-center gap-1.5">
          <label className="text-[9px] font-bold uppercase text-gray-700">Search Gazette:</label>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="bg-white border border-gray-400 px-1.5 py-0.5 text-[9px] outline-none w-32 focus:border-black font-mono text-black"
          />
        </div>
      </div>

      {/* Main Workspace split: Top List, Bottom Reader */}
      <div className="flex-grow bg-[#dfdfdf] p-4 flex flex-col gap-4 min-h-0 border-t border-white">
        
        {/* Top Pane: Decrees Table Grid */}
        <div className="retro-window-inset rounded overflow-y-auto max-h-[180px] min-h-[120px] bg-white border border-gray-400 select-none">
          <table className="w-full text-left font-mono text-[11px] border-collapse text-black">
            <thead className="bg-[#c0c0c0] sticky top-0 text-[10px] font-bold border-b border-[#808080] z-10">
              <tr>
                <th className="px-3 py-2 border-r border-[#808080]">SUBJECT</th>
                <th className="px-3 py-2 border-r border-[#808080] w-28">DATE</th>
                <th className="px-3 py-2 border-r border-[#808080] w-20 text-center">PRIORITY</th>
                <th className="px-3 py-2 w-28">ISSUED BY</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500 italic">
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
                      className={`hover:bg-[#dfdfdf] cursor-pointer transition-colors border-b border-gray-200 ${isSelected ? "bg-[#000080] text-white" : ""}`}
                    >
                      <td className="px-3 py-2 font-bold truncate max-w-[200px] border-r border-gray-200">
                        ✉ {post.title}
                      </td>
                      <td className="px-3 py-2 border-r border-gray-200">{post.date}</td>
                      <td className="px-3 py-2 text-center border-r border-gray-200 font-bold">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] border ${
                          post.urgency === "HIGH" 
                            ? isSelected ? "bg-red-950 border-red-500 text-red-300" : "bg-red-100 border-red-300 text-red-700" 
                            : isSelected ? "bg-yellow-950 border-yellow-500 text-yellow-300" : "bg-yellow-100 border-yellow-300 text-yellow-700"
                        }`}>
                          {post.urgency}
                        </span>
                      </td>
                      <td className="px-3 py-2">{post.author}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pane: Selected Decree Document Viewer */}
        <div className="flex-grow retro-window-inset rounded bg-white p-4 relative overflow-y-auto min-h-[220px] flex flex-col justify-between border border-gray-400 select-text">
          
          {/* Parchment high opacity background overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.22] pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=800&q=50')" }}
          />

          <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.08]" />

          {selectedPost ? (
            <div className="relative z-10 space-y-4 h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Stamp Details Header */}
                <div className="flex justify-between items-start border-b border-gray-300 pb-3">
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">Assembly Gazette Decree //</span>
                    <h4 className="font-serif text-lg font-black text-black uppercase leading-tight mt-0.5">
                      {selectedPost.title}
                    </h4>
                  </div>
                  {/* Wax seal ornament */}
                  <div className="w-10 h-10 rounded-full bg-[var(--color-brand-terracotta)] border-2 border-black flex items-center justify-center font-serif text-[10px] text-white font-bold rotate-12 shadow-[2px_2px_0px_rgba(0,0,0,1)] select-none">
                    SEAL
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[9px] text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-200">
                  <p><strong>DATE:</strong> {selectedPost.date}</p>
                  <p><strong>PRIORITY:</strong> {selectedPost.urgency}</p>
                  <p><strong>ISSUED BY:</strong> {selectedPost.author}</p>
                  <p><strong>SECURITY:</strong> SHA256-VERIFIED</p>
                </div>

                {/* Body Content */}
                <div className="font-serif text-sm text-gray-800 leading-relaxed space-y-3 prose max-w-none">
                  {selectedPost.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("#") || para.startsWith("##")) {
                      return <h4 key={i} className="font-serif text-base font-black text-[#b28800] uppercase pt-2">{para.replace(/^[#\s]+/, "")}</h4>;
                    }
                    if (para.startsWith("-")) {
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1 font-sans text-xs font-semibold text-gray-700">
                          {para.split("\n").map((li, idx) => (
                            <li key={idx}>{li.replace(/^[\s-*-]+/, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith(">")) {
                      return (
                        <blockquote key={i} className="border-l-4 border-[var(--color-brand-terracotta)] pl-4 py-1 italic font-medium my-2 bg-red-50/40 pr-2">
                          {para.replace(/^[>\s]+/, "")}
                        </blockquote>
                      );
                    }
                    return <p key={i} className="font-medium">{para}</p>;
                  })}
                </div>
              </div>

              {/* Verified Footer Signature */}
              <div className="pt-4 border-t border-gray-300 mt-6 flex justify-between items-center text-[9px] font-mono text-[#b28800] font-black">
                <span>VERIFIED SIGNATURE // COURT COUNCIL OF DELEGATES</span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <Check className="w-3.5 h-3.5" /> Checked &amp; Cryptographically Sown
                </span>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-grow py-12 text-gray-500 font-mono text-xs">
              <ShieldAlert className="w-12 h-12 text-gray-300 mb-2" />
              <span>Select a decree from the mail list above.</span>
            </div>
          )}

        </div>

      </div>

      {/* Window Footer Status bar */}
      <div className="bg-[#c0c0c0] px-3 py-1 border-t border-[#808080] text-[9px] font-mono text-black flex justify-between border-b border-white select-none">
        <span>Gazette Mail Client Running</span>
        <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
      </div>

    </div>
  );
}
