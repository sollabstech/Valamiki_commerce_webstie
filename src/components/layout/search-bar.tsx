"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useCatalog } from "@/hooks/use-catalog";
import { ProductImage } from "@/components/product/product-image";
import { effectivePrice } from "@/types/firestore";
import { cn, formatPrice } from "@/lib/utils";

export function SearchBar({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const router = useRouter();
  const { products } = useCatalog();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions =
    query.trim().length > 0
      ? products
          .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(0, 6)
      : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-ink-500" />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for groceries, stationery & more..."
          className="h-11 w-full rounded-full border border-border bg-surface/85 pl-10 pr-10 text-sm text-ink-900 placeholder:text-ink-500 outline-none transition-colors focus:border-secondary-400 focus:ring-2 focus:ring-secondary-500/25"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-900"
          >
            <X className="size-4.5" />
          </button>
        )}
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-lg border border-border bg-surface shadow-elevated">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-2.5 transition-colors hover:bg-secondary-500/10"
            >
              <ProductImage
                src={product.images[0]}
                alt={product.name}
                categoryId={product.categoryId}
                className="size-11 shrink-0 overflow-hidden rounded-md"
                sizes="44px"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">{product.name}</p>
                <p className="text-xs text-ink-500">{product.categoryName}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-ink-900">
                {formatPrice(effectivePrice(product))}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
