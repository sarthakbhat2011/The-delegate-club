export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-black/10 dark:border-white/10 bg-white/10 dark:bg-zinc-950/10 backdrop-blur-md z-10 text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-rose-500/30 bg-rose-500/20 dark:bg-rose-500/10 flex items-center justify-center shadow-sm">
            <span className="font-sans font-black text-rose-600 dark:text-rose-400 text-[10px] uppercase tracking-wider">TDC</span>
          </div>
          <span className="font-sans font-black text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300">The Delegate Club &copy; {new Date().getFullYear()}</span>
        </div>
        
        <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
          <a 
            href="https://www.instagram.com/thedelegateclub/?utm_source=ig_web_button_share_sheet" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
          >
            Instagram
          </a>
        </div>
        
        <div className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
          Not your average club.
        </div>
      </div>
    </footer>
  );
}
