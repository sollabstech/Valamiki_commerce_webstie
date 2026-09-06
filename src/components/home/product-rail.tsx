"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/firestore";

export function ProductRail({
  title,
  subtitle,
  viewAllHref,
  products,
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  products: Product[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="relative">
      <SectionHeading title={title} subtitle={subtitle} viewAllHref={viewAllHref} />

      <div className="hidden sm:block">
        <button
          aria-label="Scroll left"
          onClick={() => scrollByAmount(-1)}
          className="absolute -left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full glass shadow-elevated ring-1 ring-secondary-500/20 transition-all duration-300 hover:-translate-x-0.5 hover:scale-110 hover:ring-2 hover:ring-secondary-400/60 active:scale-95"
        >
          <ChevronLeft className="size-5 text-primary-700" />
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scrollByAmount(1)}
          className="absolute -right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full glass shadow-elevated ring-1 ring-secondary-500/20 transition-all duration-300 hover:translate-x-0.5 hover:scale-110 hover:ring-2 hover:ring-secondary-400/60 active:scale-95"
        >
          <ChevronRight className="size-5 text-primary-700" />
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
