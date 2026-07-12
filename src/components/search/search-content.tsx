"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { useCatalog } from "@/hooks/use-catalog";

export function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const { products, loading } = useCatalog();

  const results = useMemo(() => {
    if (!query) return [];
    const needle = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.categoryName.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle))
    );
  }, [products, query]);

  return (
    <Container className="py-6 sm:py-8">
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
        {query ? `Results for "${query}"` : "Search"}
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        {loading ? "Searching..." : `${results.length} products found`}
      </p>

      {!loading && results.length === 0 && (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-lg bg-surface py-16 text-center shadow-soft ring-1 ring-border">
          <SearchX className="size-10 text-ink-300" />
          <p className="font-medium text-ink-900">No products found</p>
          <p className="text-sm text-ink-500">Try searching for something else, like "rice" or "notebook".</p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
