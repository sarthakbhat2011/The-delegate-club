import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

export default function HackathonPage() {
  return (
    <main className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500 pt-32 overflow-hidden">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <CurtainReveal>
          <section className="px-6 py-20 max-w-7xl mx-auto text-center relative">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 mb-6 drop-shadow-md">
              TDC Hackathon
            </h1>
            <p className="text-base md:text-xl font-bold text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-12">
              Build the future. Tech-forward energy inside the royal shell.
            </p>
            
            <div className="stained-glass bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md p-12 rounded-3xl border border-black/10 dark:border-white/10 mt-16 max-w-4xl mx-auto shadow-2xl">
              <h3 className="text-base font-black text-rose-500 dark:text-rose-400 mb-4 uppercase tracking-widest">48 Hours to Innovate</h3>
              <p className="text-zinc-700 dark:text-zinc-300 mb-8 font-medium leading-relaxed">Compete with the brightest minds across universities. Solve real-world diplomatic and social challenges using code.</p>
              <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-xs shadow-md hover:shadow-lg cursor-pointer">Initialize Team</button>
            </div>
          </section>
        </CurtainReveal>
        
        <Footer />
      </div>
    </main>
  );
}
