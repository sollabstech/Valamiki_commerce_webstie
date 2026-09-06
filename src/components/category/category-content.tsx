"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronRight, PackageSearch } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { SortSelect, type SortOption } from "@/components/category/sort-select";
import { FilterPanel, matchesPriceBand, type PriceBand } from "@/components/category/filter-panel";
import { useCatalog } from "@/hooks/use-catalog";
import { effectivePrice, isRecentlyAdded } from "@/types/firestore";

function sortProducts(products: ReturnType<typeof useCatalog>["products"], sort: SortOption) {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    case "price-desc":
      return sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    default:
      return sorted;
  }
}

export function CategoryContent({ categoryId }: { categoryId: string }) {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const { products, categories, loading } = useCatalog();
  const [sort, setSort] = useState<SortOption>("relevance");
  const [priceBand, setPriceBand] = useState<PriceBand>("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  // Use Firestore categories (not hardcoded nav list) so real doc IDs match.
  const category = categories.find((c) => c.id === categoryId);
  const isAll = categoryId === "all";

  const heading = isAll
    ? filter === "featured"
      ? "Featured Products"
      : filter === "bestsellers"
      ? "Best Sellers"
      : filter === "new"
      ? "New Arrivals"
      : "All Products"
    : category?.name ?? "Products";

  const filtered = useMemo(() => {
    let list = isAll
      ? products
      : products.filter((p) => p.categoryId === categoryId);

    if (isAll && filter === "featured") list = list.filter((p) => p.isFeatured);
    if (isAll && filter === "bestsellers") list = list.filter((p) => p.isPopular);
    if (isAll && filter === "new") list = list.filter((p) => isRecentlyAdded(p));

    list = list.filter((p) => matchesPriceBand(effectivePrice(p), priceBand));
    if (inStockOnly) list = list.filter((p) => p.stock > 0);

    return sortProducts(list, sort);
  }, [products, isAll, categoryId, filter, priceBand, inStockOnly, sort]);

  return (
    <Container className="py-6 sm:py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink-500">
        <Link href="/" className="hover:text-secondary-600">Home</Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-ink-900">{heading}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{heading}</h1>
          <p className="mt-1 text-sm text-ink-500">
            {loading ? "Loading products..." : `${filtered.length} products`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-lg border border-border-strong bg-surface px-3.5 text-sm font-medium text-ink-900 lg:hidden"
              >
                <SlidersHorizontal className="size-4" />
                Filters
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[75vh] rounded-t-2xl p-6">
              <h2 className="mb-4 text-base font-semibold text-ink-900">Filters</h2>
              <FilterPanel
                priceBand={priceBand}
                onPriceBandChange={setPriceBand}
                inStockOnly={inStockOnly}
                onInStockOnlyChange={setInStockOnly}
              />
            </SheetContent>
          </Sheet>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
            <FilterPanel
              priceBand={priceBand}
              onPriceBandChange={setPriceBand}
              inStockOnly={inStockOnly}
              onInStockOnlyChange={setInStockOnly}
            />
          </div>
        </aside>

        <div>
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4.2] animate-pulse rounded-lg bg-primary-50" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg bg-surface py-16 text-center shadow-soft ring-1 ring-border">
              <PackageSearch className="size-10 text-ink-300" />
              <p className="font-medium text-ink-900">No products match your filters</p>
              <p className="text-sm text-ink-500">Try adjusting your filters or check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
