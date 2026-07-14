import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlurText } from "@/components/ui/BlurText";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // We already know session exists from layout
  const user = session!.user;
  
  // In a real app we would fetch registered events from Prisma
  // const userWithEvents = await prisma.user.findUnique({ ... })

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="mb-12 border-b border-[var(--color-brand-gold)]/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <BlurText text="The Member's Quarters" className="text-4xl md:text-6xl font-serif text-[var(--color-brand-gold)] mb-2" />
          <p className="text-[var(--color-brand-silver)] font-sans text-lg">Welcome back, Excellency.</p>
        </div>
        
        <div className="glass-panel px-6 py-3 rounded-full border border-[var(--color-brand-gold)] inline-flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[var(--color-brand-emerald)] shadow-[0_0_10px_var(--color-brand-emerald)]" />
          <span className="font-sans font-bold text-white uppercase tracking-widest text-sm">{user.role || 'DELEGATE'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="glass-panel p-8 rounded-3xl border-t-2 border-[var(--color-brand-gold)]/40 relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-sapphire)]/40 blur-[50px]" />
          
          <h2 className="text-2xl font-serif text-white mb-6">Profile</h2>
          
          <div className="space-y-4 font-sans">
            <div>
              <p className="text-[var(--color-brand-silver)] text-xs uppercase tracking-widest mb-1">Name</p>
              <p className="text-white text-lg">{user.name}</p>
            </div>
            <div>
              <p className="text-[var(--color-brand-silver)] text-xs uppercase tracking-widest mb-1">Email</p>
              <p className="text-white text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-[var(--color-brand-silver)] text-xs uppercase tracking-widest mb-1">Status</p>
              <p className="text-[var(--color-brand-gold)] text-lg italic">Active Member</p>
            </div>
          </div>
        </div>

        {/* Registered Events */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border-t-2 border-[var(--color-brand-gold)]/40">
          <h2 className="text-2xl font-serif text-white mb-6">Your Agenda</h2>
          
          <div className="space-y-4">
            {/* Mock Events */}
            {[
              { title: "The 48-Hour Hackathon", date: "Oct 12, 2026", status: "Registered" },
              { title: "Sufi Night Gala", date: "Nov 05, 2026", status: "Waitlisted" }
            ].map((evt, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[var(--color-brand-charcoal)]/30 rounded-xl border border-[var(--color-brand-gold)]/10 hover:border-[var(--color-brand-gold)]/30 transition-colors">
                <div>
                  <h3 className="text-xl font-serif text-white mb-1">{evt.title}</h3>
                  <p className="text-[var(--color-brand-silver)] font-sans text-sm">{evt.date}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold font-sans ${
                    evt.status === 'Registered' 
                      ? 'bg-[var(--color-brand-emerald)]/20 text-[var(--color-brand-emerald)] border border-[var(--color-brand-emerald)]/50'
                      : 'bg-[var(--color-brand-gold)]/20 text-[var(--color-brand-gold)] border border-[var(--color-brand-gold)]/50'
                  }`}>
                    {evt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}
