import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-6xl font-serif italic text-[var(--color-brand-gold)] mb-8 mt-12">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-sans text-[var(--color-brand-silver)] font-bold mb-4 mt-8">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed text-[var(--color-brand-ivory)]/80 font-sans mb-6">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-[var(--color-brand-gold)] hover:text-[var(--color-brand-neon-magenta)] underline underline-offset-4 decoration-[var(--color-brand-gold)]/30 hover:decoration-[var(--color-brand-neon-magenta)] transition-colors">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-lg leading-relaxed text-[var(--color-brand-ivory)]/80 font-sans mb-6 space-y-2">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="pl-2">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-brand-gold)] pl-6 py-2 my-8 italic text-xl font-serif text-[var(--color-brand-gold-muted)] bg-[var(--color-brand-charcoal)]/30 rounded-r-xl">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
