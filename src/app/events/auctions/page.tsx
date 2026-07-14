import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurtainReveal } from "@/components/animations/CurtainReveal";

export default function AuctionsPage() {
  return (
    <main className="relative bg-[var(--color-brand-onyx)] min-h-screen text-[var(--color-brand-silver-light)] selection:bg-[#C0C0C0] selection:text-black pt-32">
      <Navbar />
      
      {/* Crest & Gavel motif background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_center,rgba(192,192,192,0.4),transparent_50%)]" />

      <CurtainReveal>
        <section className="px-6 py-20 max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-serif italic text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-[#C0C0C0] to-[#9A9A9A] mb-6">
            Charity Auctions
          </h1>
          <p className="text-xl md:text-2xl font-light text-[var(--color-brand-silver-dark)] max-w-3xl mx-auto mb-12">
            The gavel strikes for a cause. Bid on exclusive items and experiences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto text-left">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-card p-6 rounded-xl flex flex-col h-full group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-brand-midnight)] opacity-50 z-0" />
                <div className="relative z-10">
                  <div className="w-full h-48 bg-black/40 rounded-lg mb-6 border border-[var(--color-brand-silver)]/10 flex items-center justify-center">
                    <span className="text-[var(--color-brand-silver-dark)] font-serif italic">Item Image</span>
                  </div>
                  <h3 className="font-serif text-xl text-[var(--color-brand-silver-light)] mb-2 group-hover:text-white transition-colors">Exclusive Lot #{item}</h3>
                  <p className="text-sm text-[var(--color-brand-silver-dark)] mb-6 flex-grow">A rare artifact or VIP experience up for bidding.</p>
                  <div className="flex justify-between items-center mt-auto border-t border-[var(--color-brand-silver)]/20 pt-4">
                    <span className="font-mono text-[var(--color-brand-gold-antique)]">Current: $250</span>
                    <button className="px-4 py-2 bg-[var(--color-brand-silver)] text-black text-sm rounded-full font-semibold hover:bg-white transition-colors">Place Bid</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </CurtainReveal>
      
      <Footer />
    </main>
  );
}
