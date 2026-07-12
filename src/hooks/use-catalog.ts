"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "@/lib/firestore/products";
import { fetchCategories } from "@/lib/firestore/categories";
import { fetchBanners } from "@/lib/firestore/banners";
import type { Product, Category, Banner } from "@/types/firestore";

const NEW_ARRIVAL_WINDOW_DAYS = 60;

export function useCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([fetchProducts(), fetchCategories(), fetchBanners()]).then(
      ([p, c, b]) => {
        if (!active) return;
        setProducts(p);
        setCategories(c);
        setBanners(b);
        setLoading(false);
      }
    );
    return () => {
      active = false;
    };
  }, []);

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
