import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";

export default function SufiNightPage() {
  return (
    <main className="relative bg-[var(--color-brand-midnight)] min-h-screen text-[var(--color-brand-silver-light)] selection:bg-[#C0C0C0] selection:text-black pt-32">
      <Navbar />
      
      {/* Candlelight overlay effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(201,162,39,0.15),transparent_60%)]" />

      <CurtainReveal>
        <section className="px-6 py-20 max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-serif italic text-5xl md:text-7xl text-[var(--color-brand-gold-antique)] mb-6 drop-shadow-[0_0_15px_rgba(201,162,39,0.5)]">
            Sufi Night
          </h1>
          <p className="text-xl md:text-2xl font-light text-[var(--color-brand-silver-dark)] max-w-3xl mx-auto mb-12">
            A cultural evening of mysticism, poetry, and transcendent music.
          </p>
          
          <div className="glass-panel p-12 rounded-3xl border border-[var(--color-brand-gold-antique)]/20 mt-16 max-w-4xl mx-auto backdrop-blur-2xl bg-[var(--color-brand-onyx)]/60">
            <h3 className="font-serif italic text-2xl text-[var(--color-brand-silver-light)] mb-4">An Evening of Elegance</h3>
            <p className="text-[var(--color-brand-silver-dark)] mb-8">Join us for a candlelight performance featuring renowned Qawwali artists, traditional cuisine, and an atmosphere of pure royal serenity.</p>
            <button className="px-8 py-4 bg-[var(--color-brand-gold-antique)] text-[var(--color-brand-onyx)] rounded-full hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-shadow font-semibold uppercase tracking-widest text-sm">Reserve Your Ticket</button>
          </div>
        </section>
      </CurtainReveal>
      
      <Footer />
    </main>
  );
}
