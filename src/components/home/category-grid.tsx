"use client";

import Link from "next/link";
import { useCatalog } from "@/hooks/use-catalog";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoryGrid() {
  const { categories, loading } = useCatalog();

  if (loading || categories.length === 0) return null;

  return (
    <section>
      <SectionHeading title="Shop by Category" subtitle="Everything you need, delivered fast" />
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="glass-card group flex flex-col items-center gap-2.5 rounded-lg p-4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-elevated hover:ring-1 hover:ring-secondary-400/50"
          >
            <span
              className="flex size-14 items-center justify-center overflow-hidden rounded-full text-3xl shadow-inner ring-1 ring-secondary-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
              style={{ backgroundColor: `${category.color}1a` }}
            >
              {category.icon?.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={category.icon} alt={category.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                category.icon || "📦"
              )}
            </span>
            <span className="text-center text-xs font-semibold text-ink-900 sm:text-sm">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
