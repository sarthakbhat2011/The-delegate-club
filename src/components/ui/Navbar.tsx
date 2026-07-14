"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { name: "Legacy", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Archives", href: "/gallery" },
  { name: "Gazette", href: "/news" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="fixed top-0 w-full z-50 px-4 md:px-6 py-4"
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ease-in-out border-2",
          scrolled 
            ? "bg-white/90 backdrop-blur-xl border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
            : "bg-transparent border-transparent shadow-none"
        )}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg border-2 border-black bg-[var(--color-brand-acid-green)] flex items-center justify-center relative shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
            <span className="font-sans font-black text-black text-sm tracking-tighter">TDC</span>
          </div>
          <span className="font-sans font-extrabold text-2xl tracking-tighter text-black uppercase hidden sm:block">
            The Delegate Club
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-bold tracking-tight text-[var(--color-brand-slate)] hover:text-black uppercase transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--color-brand-electric-blue)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm font-bold text-black hover:text-[var(--color-brand-electric-blue)] transition-colors uppercase tracking-tight hidden sm:block">
                Dashboard
              </Link>
              <button onClick={() => signOut()} className="text-sm font-bold text-black hover:text-[var(--color-brand-hot-pink)] transition-colors uppercase tracking-tight hidden sm:block">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-bold text-black hover:text-[var(--color-brand-electric-blue)] transition-colors uppercase tracking-tight hidden sm:block">
              Login
            </Link>
          )}
          
          <Link href="/join">
            <button className="bg-[var(--color-brand-electric-blue)] text-white text-sm font-bold uppercase tracking-wide px-6 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
