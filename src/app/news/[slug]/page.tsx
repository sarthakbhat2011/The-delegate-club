import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

// Utility to read MDX file
function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/news", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const source = getPost(resolvedParams.slug);

  if (!source) {
    notFound();
  }

  return (
    <main className="relative bg-[var(--color-brand-black)] min-h-screen text-[var(--color-foreground)]">
      <Navbar />
      
      <article className="pt-40 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="glass-panel p-8 md:p-16 rounded-3xl border-t-4 border-[var(--color-brand-gold)] relative">
          
          <div className="absolute top-0 right-10 w-20 h-32 bg-[var(--color-brand-burgundy)]/50 blur-[50px] -translate-y-1/2 pointer-events-none" />

          {/* Render MDX using next-mdx-remote for Server Components */}
          <div className="prose prose-invert max-w-none">
            <MDXRemote source={source} components={useMDXComponents({})} />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
