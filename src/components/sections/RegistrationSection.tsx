"use client";

import { useState } from "react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export function RegistrationSection() {
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setMessage("Application received. We will be in touch.");
        setFormData({ fullName: "", email: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "An error occurred");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="apply" className="relative min-h-[90vh] py-32 px-6 z-10 overflow-hidden flex items-center justify-center bg-[var(--color-brand-charcoal)]">
      



      {/* Floating Royal Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] opacity-20 text-[var(--color-brand-gold)] z-10"
        >
          <Crown size={80} />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -15, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[15%] opacity-10 text-white z-10"
        >
          <Crown size={120} />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <GlassCard className="!p-12 md:!p-20 text-center relative overflow-hidden border-[var(--color-brand-crimson)]/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-crimson)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-brand-gold)] rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-serif italic mb-6 relative z-10">
            Take Your Seat at the Table
          </h2>
          <p className="text-gray-300 font-sans font-light text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Membership is strictly vetted. Applications for the upcoming season are now open for a limited time.
          </p>
          
          <form className="relative z-10 max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-brand-crimson)] transition-colors"
              required
              disabled={status === "loading" || status === "success"}
            />
            <input 
              type="email" 
              placeholder="Institutional Email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-brand-crimson)] transition-colors"
              required
              disabled={status === "loading" || status === "success"}
            />
            
            {status === "error" && (
              <p className="text-[var(--color-brand-crimson-light)] text-sm mt-2">{message}</p>
            )}
            {status === "success" && (
              <p className="text-[var(--color-brand-gold)] text-sm mt-2">{message}</p>
            )}

            <GlassButton 
              type="submit" 
              className="w-full py-4 mt-4 text-lg font-bold disabled:opacity-50"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
            </GlassButton>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
