"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { name: "Legacy", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Archives", href: "/gallery" },
  { name: "Gazette", href: "/news" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
          "max-w-7xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ease-in-out border",
          scrolled || isOpen
            ? "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent shadow-none"
        )}
      >
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-lg border border-black/20 dark:border-white/20 bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-all">
            <span className="font-sans font-black text-white text-sm tracking-tighter">TDC</span>
          </div>
          <span className="font-sans font-black text-xl md:text-2xl tracking-tighter text-black dark:text-white uppercase hidden sm:block">
            The Delegate Club
          </span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-xs font-black tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white uppercase transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-rose-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />
          
          {/* Desktop Auth Links */}
          <div className="hidden sm:flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard" className="text-xs font-black tracking-widest text-black dark:text-white hover:text-rose-500 dark:hover:text-amber-400 transition-colors uppercase">
                  Dashboard
                </Link>
                <button onClick={() => signOut()} className="text-xs font-black tracking-widest text-black dark:text-white hover:text-rose-500 dark:hover:text-rose-400 transition-colors uppercase cursor-pointer">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="text-xs font-black tracking-widest text-black dark:text-white hover:text-rose-500 dark:hover:text-rose-400 transition-colors uppercase">
                Login
              </Link>
            )}
          </div>
          
          <Link href="/join">
            <button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl border border-black/10 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer">
              Apply Now
            </button>
          </Link>

          {/* Mobile Menu Burger Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl border border-black/15 dark:border-white/15 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-black dark:text-white shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-[90px] left-4 right-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-2xl z-40 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-black tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white uppercase transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
              
              <hr className="border-black/10 dark:border-white/10 border-t my-1" />
              
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-black tracking-widest text-black dark:text-white hover:text-rose-500 uppercase transition-colors py-1"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="text-left text-sm font-black tracking-widest text-black dark:text-white hover:text-rose-500 uppercase transition-colors py-1 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-black tracking-widest text-black dark:text-white hover:text-rose-500 uppercase transition-colors py-1"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
