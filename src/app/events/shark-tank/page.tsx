import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

export default function SharkTankPage() {
  return (
    <main className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500 pt-32">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <CurtainReveal>
          <section className="px-6 py-20 max-w-7xl mx-auto text-center relative">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 mb-6 drop-shadow-md">
              Shark Tank
            </h1>
            <p className="text-base md:text-xl font-bold text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-12">
              The boardroom awaits. Pitch your vision to the royal council.
            </p>
            
            <div className="stained-glass bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md p-12 rounded-3xl border border-black/10 dark:border-white/10 mt-16 max-w-5xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-black text-foreground uppercase tracking-wider mb-6">Enter the Court</h3>
              <div className="flex flex-col md:flex-row gap-8 text-left">
                <div className="flex-1 font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <p className="mb-4">For founders, visionaries, and leaders. Present your startup or initiative to a panel of distinguished alumni and investors.</p>
                  <p>The stakes are high. The reward is funding, mentorship, and prestige.</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <button className="px-10 py-5 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-xs w-full md:w-auto shadow-md">Apply to Pitch</button>
                </div>
              </div>
            </div>
          </section>
        </CurtainReveal>
        
        <Footer />
      </div>
    </main>
  );
}
