import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

export default function JoinPage() {
  return (
    <main className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-36 pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="text-rose-500 dark:text-rose-400 font-black uppercase tracking-widest text-xs block mb-2">
              ✦ Sovereign Registry // Join Assembly
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
              <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">Claim Your Seat</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs font-black uppercase tracking-wider max-w-xl mx-auto">
              Submit your credentials to sit at our Strategy Chambers table.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-24 px-4 md:px-8 relative z-20">
          <ApplicationForm />
        </section>

        <Footer />
      </div>
    </main>
  );
}
