import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

export default function MUNEventPage() {
  return (
    <main className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500 pt-32">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <CurtainReveal>
          <section className="px-6 py-20 max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 mb-6 drop-shadow-md">
              Model United Nations
            </h1>
            <p className="text-base md:text-xl font-bold text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-12">
              The flagship diplomatic simulation of The Delegates Club. Step into the shoes of global leaders.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16">
              <div className="stained-glass bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md p-8 rounded-2xl border border-black/10 dark:border-white/10 shadow-xl">
                <h3 className="text-xl font-black text-foreground uppercase tracking-wider mb-4">Committees &amp; Agenda</h3>
                <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-6">Discover the simulated UN bodies and their designated debate topics for this year's summit.</p>
                <button className="px-6 py-3 border border-black/10 dark:border-white/10 text-foreground text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all hover:scale-105 active:scale-95 cursor-pointer">View Agendas</button>
              </div>
              <div className="stained-glass bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md p-8 rounded-2xl border border-black/10 dark:border-white/10 shadow-xl">
                <h3 className="text-xl font-black text-foreground uppercase tracking-wider mb-4">Delegate Registration</h3>
                <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-6">Secure your country assignment and position paper guidelines.</p>
                <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer">Register Now</button>
              </div>
            </div>
          </section>
        </CurtainReveal>
        
        <Footer />
      </div>
    </main>
  );
}
