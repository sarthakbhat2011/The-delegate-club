import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

export default function SufiNightPage() {
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
              Sufi Night
            </h1>
            <p className="text-base md:text-xl font-bold text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-12">
              A cultural evening of mysticism, poetry, and transcendent music.
            </p>
            
            <div className="stained-glass bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md p-12 rounded-3xl border border-black/10 dark:border-white/10 mt-16 max-w-4xl mx-auto shadow-2xl">
              <h3 className="text-xl font-black text-foreground uppercase tracking-wider mb-4">An Evening of Elegance</h3>
              <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-8 leading-relaxed">Join us for a candlelight performance featuring renowned Qawwali artists, traditional cuisine, and an atmosphere of pure royal serenity.</p>
              <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-xs shadow-md cursor-pointer">Reserve Your Ticket</button>
            </div>
          </section>
        </CurtainReveal>
        
        <Footer />
      </div>
    </main>
  );
}
