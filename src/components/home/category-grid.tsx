"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCatalog } from "@/hooks/use-catalog";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoryGrid() {
  const { categories, loading } = useCatalog();

  if (loading || categories.length === 0) return null;

  return (
    <section>
      <SectionHeading
        eyebrow="Browse the aisles"
        title="Shop by category"
        subtitle="Everything you need, delivered fast across Salem."
      />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-5 text-center shadow-soft transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-secondary-500/50 hover:shadow-elevated"
          >
            <span
              className="flex size-16 items-center justify-center overflow-hidden rounded-full text-3xl ring-1 ring-secondary-500/20 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${category.color}14` }}
            >
              {category.icon?.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={category.icon} alt={category.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                category.icon || "📦"
              )}
            </span>
            <span className="text-sm font-semibold text-ink-900">{category.name}</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Shop now <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
