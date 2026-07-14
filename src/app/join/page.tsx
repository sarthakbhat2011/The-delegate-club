import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ApplicationForm } from "@/components/sections/ApplicationForm";

export default function JoinPage() {
  return (
    <main className="relative bg-[var(--color-brand-khaki-sand)] min-h-screen text-black select-none">
      {/* Subtle full-page royal invitation script watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04] pointer-events-none mix-blend-multiply z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=1200&auto=format&fit=crop')" }}
      />
      <Navbar />
      
      {/* CRT Scanline Layer */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.12] z-30" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[var(--color-brand-saffron)] font-bold uppercase tracking-widest text-xs font-mono block mb-2">
            ✦ Sovereign Registry // Join Assembly
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
            <span className="calligraphy-heading glossy-heading">Claim Your Seat</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-mono max-w-xl mx-auto">
            Submit your credentials to sit at our Strategy Chambers table.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 px-4 md:px-8 relative z-20">
        <ApplicationForm />
      </section>

      <Footer />
    </main>
  );
}
