"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { 
  Folder, X, Square, Minus, Image as ImageIcon, Eye, Trash2, Edit3, Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ArchiveImage {
  id: number;
  category: string;
  src: string;
  title: string;
  fileName: string;
  size: string;
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1598977123418-45f04b615e0e?q=80&w=600&auto=format&fit=crop";

const defaultImages: ArchiveImage[] = [
  // MUN Images
  {
    id: 1,
    category: "MUN",
    src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
    title: "Model United Nations Assembly Chamber Hall",
    fileName: "mun_chamber_v1.png",
    size: "2.1 MB"
  },
  {
    id: 2,
    category: "MUN",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
    title: "Global Geopolitics Press Conference Debate",
    fileName: "mun_press_conf.png",
    size: "1.9 MB"
  },
  {
    id: 3,
    category: "MUN",
    src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=600&auto=format&fit=crop",
    title: "Sovereign Diplomacy Negotiation Chambers",
    fileName: "mun_negotiation.png",
    size: "2.4 MB"
  },
  
  // Hackathon Images
  {
    id: 4,
    category: "Hackathon",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    title: "Byte Arena Security & Development Hackathon",
    fileName: "hackathon_sys_v1.png",
    size: "3.4 MB"
  },
  {
    id: 5,
    category: "Hackathon",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    title: "Sabha Cybersecurity Node Core Architecture",
    fileName: "server_nodes.png",
    size: "4.1 MB"
  },
  {
    id: 6,
    category: "Hackathon",
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
    title: "Chamber Developers Security Audit Sandbox",
    fileName: "audit_sandbox.png",
    size: "2.8 MB"
  },

  // Socials Images
  {
    id: 7,
    category: "Socials",
    src: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop",
    title: "Sufi Concert and Traditional Dhol Mehfil Night",
    fileName: "sufi_concert_v1.png",
    size: "1.8 MB"
  },
  {
    id: 8,
    category: "Socials",
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    title: "Mehfil Percussion Beats and Live Music Gala",
    fileName: "percussion_gala.png",
    size: "3.2 MB"
  },
  {
    id: 9,
    category: "Socials",
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop",
    title: "Delegates Royal Court Banquets and Dining",
    fileName: "banquet_dining.png",
    size: "2.2 MB"
  },

  // Auctions Images
  {
    id: 10,
    category: "Auctions",
    src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop",
    title: "Royal Court Rare Art & Asset Bidding Registry",
    fileName: "auction_court_v1.png",
    size: "4.2 MB"
  },
  {
    id: 11,
    category: "Auctions",
    src: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=600&auto=format&fit=crop",
    title: "Sovereign Heritage Coins Registry & Bidding",
    fileName: "coin_bid_registry.png",
    size: "3.1 MB"
  },
  {
    id: 12,
    category: "Auctions",
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    title: "Elite Crown Jewels Bid Log Archive",
    fileName: "crown_jewels_log.png",
    size: "5.0 MB"
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState<ArchiveImage[]>(defaultImages);
  const [selectedImage, setSelectedImage] = useState<ArchiveImage | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Edit details States
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editFileName, setEditFileName] = useState("");
  const [editCategory, setEditCategory] = useState("");

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

  // Initialize edit fields when an image is selected
  useEffect(() => {
    if (selectedImage) {
      setEditTitle(selectedImage.title);
      setEditFileName(selectedImage.fileName);
      setEditCategory(selectedImage.category);
      setIsEditing(false);
    }
  }, [selectedImage]);

  const handleDeleteImage = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id));
    setSelectedImage(null);
  };

  const handleSaveEdit = () => {
    if (!selectedImage) return;
    
    const updatedImages = images.map(img => {
      if (img.id === selectedImage.id) {
        return {
          ...img,
          title: editTitle.trim() || img.title,
          fileName: editFileName.trim() || img.fileName,
          category: editCategory
        };
      }
      return img;
    });

    setImages(updatedImages);
    
    // Update local selected state view
    setSelectedImage(prev => {
      if (!prev) return null;
      return {
        ...prev,
        title: editTitle.trim() || prev.title,
        fileName: editFileName.trim() || prev.fileName,
        category: editCategory
      };
    });

    setIsEditing(false);
  };

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <main className="relative bg-transparent min-h-screen text-foreground transition-colors duration-500 select-none">
      {/* Subtle full-page palace architecture watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04] pointer-events-none mix-blend-multiply z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598977123418-45f04b615e0e?q=80&w=1200&auto=format&fit=crop')" }}
      />
      <Navbar />

      {/* Screen flicker */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.12] z-30" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[var(--color-brand-saffron)] font-bold uppercase tracking-widest text-xs font-mono block mb-2">
            🖼 Visual Chronicles // Court Archives
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
            <span className="calligraphy-heading glossy-heading">The Sabha Gallery</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-mono max-w-xl mx-auto">
            Interactive folder manager containing historic image files of the court.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------
          ARCHIVE EXPLORER WIDGET (ARCHIVE_EXPLORER.EXE)
          ---------------------------------------------------- */}
      <section className="pb-24 px-4 md:px-8 max-w-6xl mx-auto relative z-20">
        <div className="retro-window-outset rounded-lg border-2 border-black flex flex-col min-h-[520px] shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          
          {/* Title Bar */}
          <div className="px-3 py-1.5 flex justify-between items-center text-white font-mono bg-gradient-to-r from-[var(--color-brand-marigold)] to-[#b28800]">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-black" />
              <span className="text-xs font-bold uppercase tracking-wider text-black">ARCHIVE_EXPLORER.EXE // Image browser</span>
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

          {/* Menu bar */}
          <div className="bg-[#c0c0c0] px-3 py-1 border-b border-[#808080] flex gap-4 text-[10px] font-mono text-black font-medium border-t border-white select-none">
            <span className="hover:underline cursor-pointer">File</span>
            <span className="hover:underline cursor-pointer">View</span>
            <span className="hover:underline cursor-pointer">Go</span>
            <span className="hover:underline cursor-pointer">Help</span>
          </div>

          {/* Main workspace */}
          <div className="flex-grow bg-[#dfdfdf] p-4 flex flex-col md:flex-row gap-4 min-h-0 border-t border-white">
            
            {/* Left Column: Explorer Directory tree */}
            <div className="md:w-1/4 retro-window-inset rounded p-3 select-none flex flex-col justify-between bg-white border border-gray-400 gap-4 overflow-y-auto">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase font-black block border-b border-gray-200 pb-1">
                  Folder Tree
                </span>

                <div className="space-y-2 font-mono text-xs text-black">
                  {["All", "MUN", "Hackathon", "Socials", "Auctions"].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-left ${activeCategory === cat ? "bg-[#000080] text-white" : "hover:bg-gray-100"}`}
                    >
                      <Folder className="w-4 h-4 shrink-0" />
                      <span>{cat.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#fff8f5] p-2 rounded border border-gray-300 font-mono text-[9px] text-[#87361e] space-y-1 mt-auto">
                <span className="block font-bold">DIRECTORY:</span>
                <span className="block truncate">C:\SABHA\ARCHIVES\{activeCategory.toUpperCase()}</span>
              </div>
            </div>

            {/* Right Column: File Grid display */}
            <div className="flex-grow flex flex-col min-h-0 bg-white rounded border border-gray-400 p-4 relative overflow-y-auto">
              
              {/* High-visibility Court hall overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.15] pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598977123418-45f04b615e0e?q=80&w=800&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.08]" />

              <div className="relative z-10">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase font-black">
                    File List // {activeCategory.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-gray-700 font-bold uppercase">
                    Files Mapped: {filteredImages.length} (Unique)
                  </span>
                </div>

                {filteredImages.length === 0 ? (
                  <div className="text-center py-16 font-mono text-xs text-gray-400">
                    No files found in this category directory.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredImages.map((img) => (
                      <div
                        key={img.id}
                        onClick={() => setSelectedImage(img)}
                        className="p-2 bg-gray-50 border-2 border-black rounded-lg text-center hover:bg-gray-100 cursor-pointer shadow-[3px_3px_0_rgba(0,0,0,1)] transition-transform hover:scale-103 hover:-translate-y-0.5"
                      >
                        <div className="relative aspect-square rounded border border-gray-400 overflow-hidden bg-black flex items-center justify-center">
                          <img 
                            src={img.src} 
                            alt={img.title} 
                            className="object-cover w-full h-full opacity-80" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DEFAULT_FALLBACK;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/35 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Eye className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        
                        <div className="mt-2 text-left font-mono text-[9px] text-black flex justify-between items-center">
                          <span className="block font-bold truncate max-w-[80%]">📁 {img.fileName}</span>
                          <span className="text-gray-500 text-[8px]">Size: {img.size}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Window Status Bar */}
          <div className="bg-[#c0c0c0] px-3 py-1 border-t border-[#808080] text-[9px] font-mono text-black flex justify-between border-b border-white select-none">
            <span>Explorer Connected</span>
            <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
          </div>

        </div>
      </section>

      {/* Lightbox dialog styled as a classic Windows dialogue warning/info popup box */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-3xl retro-window-outset rounded-lg border-2 border-black overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Dialogue Header */}
              <div className="px-3 py-1 flex justify-between items-center text-white font-mono bg-[#000080] select-none">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">DIALOG // VIEWING {selectedImage.fileName}</span>
                </div>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="w-4 h-4 rounded border border-black flex items-center justify-center text-[9px] bg-[#c0c0c0] text-black hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Dialogue Body */}
              <div className="p-4 bg-[#dfdfdf] flex flex-col gap-4 border-t border-white text-black">
                <div className="relative aspect-video rounded border border-gray-400 overflow-hidden bg-black flex items-center justify-center">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.title} 
                    className="object-contain w-full h-full p-2" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_FALLBACK;
                    }}
                  />
                </div>

                {/* Metadata details block */}
                <div className="retro-window-inset p-3 bg-white border border-gray-400 font-mono text-[10px] space-y-2">
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-grow">
                          <label className="text-[8px] text-gray-500 uppercase block font-bold">File Name:</label>
                          <input 
                            type="text"
                            value={editFileName}
                            onChange={(e) => setEditFileName(e.target.value)}
                            className="w-full border border-gray-400 px-2 py-0.5 rounded text-[10px]"
                          />
                        </div>
                        <div className="w-full sm:w-1/3">
                          <label className="text-[8px] text-gray-500 uppercase block font-bold">Category:</label>
                          <select 
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="w-full border border-gray-400 px-2 py-0.5 rounded text-[10px]"
                          >
                            <option value="MUN">MUN</option>
                            <option value="Hackathon">Hackathon</option>
                            <option value="Socials">Socials</option>
                            <option value="Auctions">Auctions</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[8px] text-gray-500 uppercase block font-bold">Title (Description):</label>
                        <input 
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full border border-gray-400 px-2 py-0.5 rounded text-[10px]"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p><strong>FILE NAME:</strong> {selectedImage.fileName}</p>
                      <p><strong>MILESTONE:</strong> {selectedImage.title}</p>
                      <p><strong>CATEGORY:</strong> {selectedImage.category.toUpperCase()}</p>
                      <p><strong>FILE SIZE:</strong> {selectedImage.size}</p>
                      <p><strong>SECURITY STATUS:</strong> 🔒 SYSTEM VERIFIED OK</p>
                    </>
                  )}
                </div>
              </div>

              {/* Dialogue Footer Controls */}
              <div className="bg-[#c0c0c0] px-4 py-3 border-t border-[#808080] flex justify-between items-center border-b border-white select-none">
                {/* Delete/Edit Action Block */}
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="retro-button px-3 py-1 text-xs font-mono font-bold uppercase border border-black hover:bg-gray-200 cursor-pointer flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="retro-button px-3 py-1 text-xs font-mono font-bold uppercase border border-black hover:bg-gray-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="retro-button px-3 py-1 text-xs font-mono font-bold uppercase border border-black hover:bg-gray-200 cursor-pointer flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit details
                      </button>
                      <button
                        onClick={() => handleDeleteImage(selectedImage.id)}
                        className="retro-button px-3 py-1 text-xs font-mono font-bold uppercase border border-black hover:bg-red-500 hover:text-white cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete File
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="retro-button px-4 py-1 text-xs font-mono font-bold uppercase border border-black hover:bg-gray-200 cursor-pointer"
                >
                  Close Window [Esc]
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
