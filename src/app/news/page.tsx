import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GazetteReader } from "@/components/sections/GazetteReader";
import fs from "fs";
import path from "path";

// Server-side helper to read and parse MDX decrees
function getPosts() {
  const postsDir = path.join(process.cwd(), "src/content/news");
  if (!fs.existsSync(postsDir)) return [];
  
  const files = fs.readdirSync(postsDir);
  return files
    .filter(file => file.endsWith(".mdx"))
    .map(file => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(postsDir, file);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      
      // Basic Frontmatter or metadata mockup
      // Since inaugural-decree has no YAML block, we parse details from the text
      const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      const date = "2026-06-25"; // default decree date
      const urgency: "HIGH" | "MEDIUM" | "LOW" = slug.includes("inaugural") ? "HIGH" : "MEDIUM";
      const author = "High Council";

      return {
        slug,
        title,
        date,
        excerpt: "Read the latest decree from the High Council.",
        content: rawContent,
        urgency,
        author
      };
    });
}

export default function NewsFeedPage() {
  const posts = getPosts();

  return (
    <main className="relative bg-[var(--color-brand-khaki-sand)] min-h-screen text-black">
      {/* Subtle full-page vintage news bulletin watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04] pointer-events-none mix-blend-multiply z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop')" }}
      />
      <Navbar />
      
      {/* scanlines screen flicker */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-[0.12] z-30" />

      {/* Gazette Header */}
      <section className="relative pt-36 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[var(--color-brand-saffron)] font-bold uppercase tracking-widest text-xs font-mono block mb-2">
            📰 The Royal Gazette // State Bulletins
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
            <span className="calligraphy-heading glossy-heading">The Royal Gazette</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-mono max-w-xl mx-auto">
            Decrees, announcements, and diplomatic updates issued by the High Council.
          </p>
        </div>
      </section>

      {/* Main Mail Reader widget */}
      <section className="pb-24 px-4 md:px-8 max-w-6xl mx-auto relative z-20">
        <GazetteReader posts={posts} />
      </section>

      <Footer />
    </main>
  );
}
