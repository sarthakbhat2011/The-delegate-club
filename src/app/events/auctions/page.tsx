import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

export default function AuctionsPage() {
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
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 mb-6">
              Charity Auctions
            </h1>
            <p className="text-base md:text-xl font-bold text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-12">
              The gavel strikes for a cause. Bid on exclusive items and experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto text-left">
              {[1, 2, 3].map((item) => (
                <div key={item} className="stained-glass bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-black/10 dark:border-white/10 p-6 rounded-2xl flex flex-col h-full group relative overflow-hidden shadow-xl hover:scale-103 transition-all duration-300">
                  <div className="relative z-10">
                    <div className="w-full h-48 bg-zinc-900 rounded-xl mb-6 border border-white/10 flex items-center justify-center">
                      <span className="text-zinc-500 text-xs font-black uppercase tracking-wider">Item Image</span>
                    </div>
                    <h3 className="font-sans text-xl font-black text-foreground uppercase mb-2 group-hover:text-rose-500 transition-colors">Exclusive Lot #{item}</h3>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-6 flex-grow">A rare artifact or VIP experience up for bidding.</p>
                    <div className="flex justify-between items-center mt-auto border-t border-black/5 dark:border-white/5 pt-4">
                      <span className="font-mono text-xs font-black text-rose-500 dark:text-rose-400 uppercase tracking-widest">Current: $250</span>
                      <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer">Place Bid</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </CurtainReveal>
        
        <Footer />
      </div>
    </main>
  );
}
