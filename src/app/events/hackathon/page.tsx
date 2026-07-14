import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";

export default function HackathonPage() {
  return (
    <main className="relative bg-[var(--color-brand-onyx)] min-h-screen text-[var(--color-brand-silver-light)] selection:bg-[var(--color-brand-electric-violet)] selection:text-white pt-32 overflow-hidden">
      <Navbar />
      
      {/* Neon on velvet background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-brand-electric-violet)] rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-pulse" />

      <CurtainReveal>
        <section className="px-6 py-20 max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-serif italic text-5xl md:text-7xl text-white mb-6 drop-shadow-[0_0_20px_rgba(167,139,250,0.8)]">
            TDC Hackathon
          </h1>
          <p className="text-xl md:text-2xl font-mono text-[var(--color-brand-silver)] max-w-3xl mx-auto mb-12">
            Build the future. Tech-forward energy inside the royal shell.
          </p>
          
          <div className="glass-panel p-12 rounded-3xl border border-[var(--color-brand-electric-violet)]/30 mt-16 max-w-4xl mx-auto backdrop-blur-2xl">
            <h3 className="font-mono text-xl text-[var(--color-brand-electric-violet)] mb-4 uppercase tracking-widest">48 Hours to Innovate</h3>
            <p className="text-[var(--color-brand-silver-dark)] mb-8 font-sans">Compete with the brightest minds across universities. Solve real-world diplomatic and social challenges using code.</p>
            <button className="px-8 py-4 bg-transparent border-2 border-[var(--color-brand-electric-violet)] text-white rounded-full hover:bg-[var(--color-brand-electric-violet)] transition-colors font-mono uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(167,139,250,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.6)]">Initialize Team</button>
          </div>
        </section>
      </CurtainReveal>
      
      <Footer />
    </main>
  );
}
