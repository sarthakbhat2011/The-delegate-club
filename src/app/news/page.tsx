import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GazetteReader } from "@/components/sections/GazetteReader";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";
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
    <main className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <Navbar />

        {/* Gazette Header */}
        <section className="relative pt-36 pb-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="text-rose-500 dark:text-rose-400 font-black uppercase tracking-widest text-xs block mb-2">
              📰 The Royal Gazette // State Bulletins
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
              <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">The Royal Gazette</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs font-black uppercase tracking-wider max-w-xl mx-auto">
              Decrees, announcements, and diplomatic updates issued by the High Council.
            </p>
          </div>
        </section>

        {/* Main Mail Reader widget */}
        <section className="pb-24 px-4 md:px-8 max-w-6xl mx-auto relative z-20">
          <GazetteReader posts={posts} />
        </section>

        <Footer />
      </div>
    </main>
  );
}
