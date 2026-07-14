import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlurText } from "@/components/ui/BlurText";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // We already know session exists from layout
  const user = session!.user;

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 text-foreground">
      <div className="mb-12 border-b border-black/5 dark:border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <BlurText text="The Member's Quarters" className="text-4xl md:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent mb-2" />
          <p className="text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider text-sm">Welcome back, Excellency.</p>
        </div>
        
        <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md px-6 py-3 rounded-full border border-black/10 dark:border-white/10 inline-flex items-center gap-2.5 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="font-sans font-black text-foreground uppercase tracking-widest text-xs">{user.role || 'DELEGATE'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="stained-glass p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-xl relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 blur-[50px] pointer-events-none" />
          
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Profile</h2>
          
          <div className="space-y-4 font-sans text-sm">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase tracking-widest font-black mb-1">Name</p>
              <p className="font-bold text-lg text-foreground">{user.name}</p>
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase tracking-widest font-black mb-1">Email</p>
              <p className="font-bold text-lg text-foreground">{user.email}</p>
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase tracking-widest font-black mb-1">Status</p>
              <p className="text-rose-500 dark:text-rose-400 text-lg font-black uppercase tracking-wider">Active Member</p>
            </div>
          </div>
        </div>

        {/* Registered Events */}
        <div className="lg:col-span-2 stained-glass p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-xl">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Your Agenda</h2>
          
          <div className="space-y-4">
            {/* Mock Events */}
            {[
              { title: "The 48-Hour Hackathon", date: "Oct 12, 2026", status: "Registered" },
              { title: "Sufi Night Gala", date: "Nov 05, 2026", status: "Waitlisted" }
            ].map((evt, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/60 dark:bg-zinc-900/60 rounded-2xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:scale-101 transition-all duration-300">
                <div>
                  <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-1">{evt.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider text-xs">{evt.date}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-black border ${
                    evt.status === 'Registered' 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
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
