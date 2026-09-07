"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "@/lib/firestore/products";
import { fetchCategories } from "@/lib/firestore/categories";
import { fetchBanners } from "@/lib/firestore/banners";
import type { Product, Category, Banner } from "@/types/firestore";

const NEW_ARRIVAL_WINDOW_DAYS = 60;

type CatalogData = { products: Product[]; categories: Category[]; banners: Banner[] };
const EMPTY: CatalogData = { products: [], categories: [], banners: [] };

// One fetch per session, shared across every component that calls useCatalog().
let cache: CatalogData | null = null;
let inflight: Promise<CatalogData> | null = null;

function loadCatalog(): Promise<CatalogData> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = Promise.all([fetchProducts(), fetchCategories(), fetchBanners()])
      .then(([products, categories, banners]) => {
        cache = { products, categories, banners };
        return cache;
      })
      .catch(() => EMPTY);
  }
  return inflight;
}

/** Clears the cache so the next useCatalog() mount refetches. */
export function refreshCatalog() {
  cache = null;
  inflight = null;
}

export function useCatalog() {
  const [data, setData] = useState<CatalogData>(cache ?? EMPTY);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    let active = true;
    loadCatalog().then((d) => {
      if (!active) return;
      setData(d);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const { products, categories, banners } = data;

  const derived = useMemo(() => {
    const cutoff = Date.now() - NEW_ARRIVAL_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    return {
      featured: products.filter((p) => p.isFeatured && p.isAvailable),
      bestsellers: products.filter((p) => p.isPopular && p.isAvailable),
      flashDeals: products.filter((p) => p.isFlashDeal && p.isAvailable),
      newArrivals: products
        .filter((p) => p.isAvailable && p.createdAt.getTime() >= cutoff)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    };
  }, [products]);

  return { products, categories, banners, loading, ...derived };
}

export function useProductsByCategory(categoryId: string) {
  const { products, loading } = useCatalog();
  return {
    products: products.filter((p) => p.categoryId === categoryId),
    loading,
  };
}
