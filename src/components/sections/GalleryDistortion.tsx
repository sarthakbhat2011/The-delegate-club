"use client";

import { useRef } from "react";
import gsap from "gsap";
import { KineticText } from "@/components/ui/KineticText";

const placeholders = [
  "linear-gradient(45deg, var(--color-brand-black), var(--color-brand-primary))",
  "linear-gradient(135deg, var(--color-brand-charcoal), var(--color-brand-black))",
  "linear-gradient(to bottom, var(--color-brand-primary), var(--color-brand-black))",
  "linear-gradient(to right, var(--color-brand-black), var(--color-brand-charcoal))"
];

export function GalleryDistortion() {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, el: HTMLDivElement) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(el, {
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (el: HTMLDivElement) => {
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section className="py-32 bg-[var(--color-brand-black)] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <KineticText text="The Archives" className="text-4xl md:text-5xl" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {placeholders.map((bg, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              {/* Image Placeholder */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out hover:scale-110"
                style={{ background: bg }}
              />
              {/* Silver Tint Overlay */}
              <div className="absolute inset-0 bg-[#C0C0C0]/10 mix-blend-overlay pointer-events-none" />
              {/* Glass frame */}
              <div className="absolute inset-0 border border-[#C0C0C0]/20 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
