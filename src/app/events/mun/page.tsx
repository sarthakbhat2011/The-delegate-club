import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";

export default function MUNEventPage() {
  return (
    <main className="relative bg-[var(--color-brand-onyx)] min-h-screen text-[var(--color-brand-silver-light)] selection:bg-[#C0C0C0] selection:text-black pt-32">
      <Navbar />
      
      <CurtainReveal>
        <section className="px-6 py-20 max-w-7xl mx-auto text-center">
          <h1 className="font-serif italic text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-[#C0C0C0] to-[#F2F2F2] mb-6 drop-shadow-lg">
            Model United Nations
          </h1>
          <p className="text-xl md:text-2xl font-light text-[var(--color-brand-silver-dark)] max-w-3xl mx-auto mb-12">
            The flagship diplomatic simulation of The Delegates Club. Step into the shoes of global leaders.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16">
            <div className="glass-panel p-8 rounded-2xl border-t border-l border-[var(--color-brand-silver)]/20">
              <h3 className="font-serif italic text-2xl text-[var(--color-brand-silver-light)] mb-4">Committees & Agenda</h3>
              <p className="text-[var(--color-brand-silver-dark)] mb-6">Discover the simulated UN bodies and their designated debate topics for this year's summit.</p>
              <button className="px-6 py-3 border border-[var(--color-brand-silver)]/50 rounded-full hover:bg-white/10 transition-colors">View Agendas</button>
            </div>
            <div className="glass-panel p-8 rounded-2xl border-t border-l border-[var(--color-brand-silver)]/20">
              <h3 className="font-serif italic text-2xl text-[var(--color-brand-silver-light)] mb-4">Delegate Registration</h3>
              <p className="text-[var(--color-brand-silver-dark)] mb-6">Secure your country assignment and position paper guidelines.</p>
              <button className="px-6 py-3 bg-[var(--color-brand-silver-light)] text-[var(--color-brand-onyx)] rounded-full hover:shadow-[0_0_20px_rgba(242,242,242,0.3)] transition-shadow font-semibold">Register Now</button>
            </div>
          </div>
        </section>
      </CurtainReveal>
      
      <Footer />
    </main>
  );
}
