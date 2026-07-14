export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t-2 border-black bg-white z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-black bg-[var(--color-brand-hot-pink)] flex items-center justify-center">
            <span className="font-sans font-black text-black text-sm uppercase">TDC</span>
          </div>
          <span className="font-sans font-bold text-black uppercase tracking-tight">The Delegate Club &copy; {new Date().getFullYear()}</span>
        </div>
        
        <div className="flex gap-8 text-sm text-black font-bold uppercase tracking-tight">
          <a 
            href="https://www.instagram.com/thedelegateclub/?utm_source=ig_web_button_share_sheet" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[var(--color-brand-neon-orange)] transition-colors"
          >
            Instagram
          </a>
        </div>
        
        <div className="text-sm text-black font-bold uppercase tracking-tight">
          Not your average club.
        </div>
      </div>
    </footer>
  );
}
