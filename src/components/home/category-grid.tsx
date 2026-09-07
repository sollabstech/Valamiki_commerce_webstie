"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCatalog } from "@/hooks/use-catalog";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductImage } from "@/components/product/product-image";

export function CategoryGrid() {
  const { categories, products, loading } = useCatalog();

  // A representative product image + item count for each category.
  const meta = useMemo(() => {
    const map = new Map<string, { image?: string; count: number }>();
    for (const c of categories) map.set(c.id, { count: 0 });
    for (const p of products) {
      const m = map.get(p.categoryId);
      if (!m) continue;
      m.count += 1;
      if (!m.image && p.isAvailable && p.images?.[0]) m.image = p.images[0];
    }
    return map;
  }, [categories, products]);

  if (loading || categories.length === 0) return null;

  return (
    <section>
      <SectionHeading
        eyebrow="Browse the aisles"
        title="Shop by category"
        subtitle="Everything you need, delivered fast across Salem."
      />

      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const m = meta.get(category.id);
          const image = m?.image ?? (category.icon?.startsWith("http") ? category.icon : undefined);
          const count = m?.count ?? 0;

          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group flex w-40 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-secondary-500/50 hover:shadow-elevated sm:w-44 lg:w-52"
            >
              <div className="relative aspect-square overflow-hidden bg-cream-100">
                {image ? (
                  <ProductImage
                    src={image}
                    alt={category.name}
                    categoryId={category.id}
                    className="size-full transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 45vw, 210px"
                  />
                ) : (
                  <span
                    className="flex size-full items-center justify-center text-5xl"
                    style={{ backgroundColor: `${category.color}12` }}
                  >
                    {category.icon || "📦"}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col items-center gap-1 px-3 py-4 text-center">
                <span className="font-display text-[15px] font-semibold text-ink-900">
                  {category.name}
                </span>
                <span className="text-xs text-ink-500">
                  {count > 0 ? `${count} ${count === 1 ? "item" : "items"}` : "New arrivals soon"}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-600 transition-colors group-hover:text-secondary-700">
                  Shop now
                  <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
