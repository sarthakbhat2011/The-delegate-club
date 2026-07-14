import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Delegates Club",
  description: "A premium multi-event society that runs Model United Nations conferences, auctions, hackathons, and exclusive socials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300">
        <AuthProvider>
          <CustomCursor />
          <ScrollProgress />
          
          {/* Global 3D Stained Glass Background */}
          <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
            <StainedGlass3D />
          </div>
          
          {/* Gothic Cathedral Stained-Glass Window Frame Overlay */}
          <div className="pointer-events-none fixed inset-0 z-40 select-none hidden md:flex flex-col justify-between">
            {/* Left pillar border with ruby glow */}
            <div className="absolute left-0 top-0 bottom-0 w-3.5 md:w-5 bg-zinc-950 dark:bg-black border-r border-rose-500/30 dark:border-rose-500/10 shadow-[0_0_15px_rgba(225,29,72,0.15)]" />
            
            {/* Right pillar border with sapphire glow */}
            <div className="absolute right-0 top-0 bottom-0 w-3.5 md:w-5 bg-zinc-950 dark:bg-black border-l border-blue-500/30 dark:border-blue-500/10 shadow-[0_0_15px_rgba(37,99,235,0.15)]" />
            
            {/* Top border with amber arch glow */}
            <div className="absolute top-0 left-0 right-0 h-3.5 md:h-5 bg-zinc-950 dark:bg-black border-b border-amber-500/30 dark:border-amber-500/10 shadow-[0_0_15px_rgba(217,119,6,0.15)]" />
            
            {/* Bottom border with emerald glow */}
            <div className="absolute bottom-0 left-0 right-0 h-3.5 md:h-5 bg-zinc-950 dark:bg-black border-t border-emerald-500/30 dark:border-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]" />

            {/* Corner Decorative Glass Gems */}
            <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 bg-rose-500/20 dark:bg-rose-500/10 border-r border-b border-rose-500/30 rounded-br-2xl backdrop-blur-sm" />
            <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 bg-amber-500/20 dark:bg-amber-500/10 border-l border-b border-amber-500/30 rounded-bl-2xl backdrop-blur-sm" />
            <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 bg-blue-500/20 dark:bg-blue-500/10 border-r border-t border-blue-500/30 rounded-tr-2xl backdrop-blur-sm" />
            <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 bg-emerald-500/20 dark:bg-emerald-500/10 border-l border-t border-emerald-500/30 rounded-tl-2xl backdrop-blur-sm" />

            {/* Viewport inner border highlight */}
            <div className="absolute inset-3.5 md:inset-5 border border-white/5" />
          </div>

          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
