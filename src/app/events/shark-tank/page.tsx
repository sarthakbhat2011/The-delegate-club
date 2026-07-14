import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";

export default function SharkTankPage() {
  return (
    <main className="relative bg-[var(--color-brand-midnight)] min-h-screen text-[var(--color-brand-silver-light)] selection:bg-[#C0C0C0] selection:text-black pt-32">
      <Navbar />
      
      {/* Throne room lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(192,192,192,0.1),transparent_70%)]" />

      <CurtainReveal>
        <section className="px-6 py-20 max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-serif italic text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-[#C0C0C0] to-[#F2F2F2] mb-6 drop-shadow-2xl">
            Shark Tank
          </h1>
          <p className="text-xl md:text-2xl font-light text-[var(--color-brand-silver-dark)] max-w-3xl mx-auto mb-12">
            The boardroom awaits. Pitch your vision to the royal council.
          </p>
          
          <div className="glass-panel p-12 rounded-none border-y border-[var(--color-brand-silver)]/30 mt-16 max-w-5xl mx-auto backdrop-blur-2xl bg-black/40">
            <h3 className="font-serif italic text-3xl text-[var(--color-brand-silver-light)] mb-6">Enter the Court</h3>
            <div className="flex flex-col md:flex-row gap-8 text-left">
              <div className="flex-1">
                <p className="text-[var(--color-brand-silver-dark)] mb-4">For founders, visionaries, and leaders. Present your startup or initiative to a panel of distinguished alumni and investors.</p>
                <p className="text-[var(--color-brand-silver-dark)]">The stakes are high. The reward is funding, mentorship, and prestige.</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <button className="px-10 py-5 bg-[var(--color-brand-silver-light)] text-[var(--color-brand-onyx)] rounded-sm hover:bg-white transition-colors font-serif italic text-xl w-full md:w-auto shadow-xl">Apply to Pitch</button>
              </div>
            </div>
          </div>
        </section>
      </CurtainReveal>
      
      <Footer />
    </main>
  );
}
