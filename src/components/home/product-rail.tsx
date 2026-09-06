"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/firestore";

export function ProductRail({
  title,
  subtitle,
  eyebrow,
  viewAllHref,
  products,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  viewAllHref?: string;
  products: Product[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  const arrowClass =
    "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-current/25 bg-surface/90 text-ink-900 shadow-elevated backdrop-blur transition-all duration-300 hover:scale-110 hover:border-secondary-500/70 hover:text-secondary-600 active:scale-95";

  return (
    <section className="relative">
      <SectionHeading
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow}
        viewAllHref={viewAllHref}
      />

      <div className="hidden sm:block">
        <button
          aria-label="Scroll left"
          onClick={() => scrollByAmount(-1)}
          className={`${arrowClass} -left-4 hover:-translate-x-0.5`}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scrollByAmount(1)}
          className={`${arrowClass} -right-4 hover:translate-x-0.5`}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-1 sm:gap-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[46%] shrink-0 sm:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
