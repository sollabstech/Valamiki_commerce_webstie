"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight, LayoutGrid, PackageSearch } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useCatalog } from "@/hooks/use-catalog";

export function CategoriesContent() {
  const { categories, products, loading } = useCatalog();

  const countByCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      map.set(p.categoryId, (map.get(p.categoryId) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const tileClass =
    "group flex h-full flex-col items-center justify-center gap-2.5 rounded-lg bg-surface p-5 text-center shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-medium";

  return (
    <Container className="py-6 sm:py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink-500">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-ink-900">Categories</span>
      </nav>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Shop by Category</h1>
        <p className="mt-1 text-sm text-ink-500">Everything you need, delivered fast</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-primary-50" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg bg-surface py-16 text-center shadow-soft ring-1 ring-border">
          <PackageSearch className="size-10 text-ink-300" />
          <p className="font-medium text-ink-900">No categories yet</p>
          <p className="text-sm text-ink-500">Check back soon — new categories are on the way.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          <Link href="/category/all" className={tileClass}>
            <span className="flex size-14 items-center justify-center rounded-full bg-primary-100 text-primary-700 transition-transform group-hover:scale-110">
              <LayoutGrid className="size-6" />
            </span>
            <span className="text-sm font-semibold text-ink-900">All Products</span>
            <span className="text-xs text-ink-500">
              {products.length} {products.length === 1 ? "item" : "items"}
            </span>
          </Link>

          {categories.map((category) => {
            const count = countByCategory.get(category.id) ?? 0;
            return (
              <Link key={category.id} href={`/category/${category.id}`} className={tileClass}>
                <span
                  className="flex size-14 items-center justify-center overflow-hidden rounded-full text-3xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}1a` }}
                >
                  {category.icon?.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={category.icon} alt={category.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    category.icon || "📦"
                  )}
                </span>
                <span className="text-sm font-semibold text-ink-900">{category.name}</span>
                <span className="text-xs text-ink-500">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </Container>
  );
}
