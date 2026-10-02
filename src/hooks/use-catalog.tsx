"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { fromDoc } from "@/lib/firestore/products";
import { fetchCategories } from "@/lib/firestore/categories";
import { fetchBanners } from "@/lib/firestore/banners";
import type { Product, Category, Banner } from "@/types/firestore";

type CatalogContextValue = {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  loading: boolean;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  // Products change often (admin edits price/stock/New/Featured/etc.) — keep
  // this live so a tab that's already open picks up admin changes without
  // the customer needing to manually refresh the page.
  useEffect(() => {
    const db = getDb();
    if (!db) {
      setProductsLoaded(true);
      return;
    }
    const unsub = onSnapshot(
      collection(db, "products"),
      (snap) => {
        setProducts(snap.docs.map((d) => fromDoc(d.id, d.data())));
        setProductsLoaded(true);
      },
      () => setProductsLoaded(true)
    );
    return unsub;
  }, []);

  // Categories/banners change far less often — one fetch per session is enough.
  useEffect(() => {
    Promise.all([fetchCategories(), fetchBanners()]).then(([c, b]) => {
      setCategories(c);
      setBanners(b);
    });
  }, []);

  const value = useMemo<CatalogContextValue>(
    () => ({ products, categories, banners, loading: !productsLoaded }),
    [products, categories, banners, productsLoaded]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  const { products, categories, banners, loading } = ctx;

  const derived = useMemo(() => {
    return {
      featured: products.filter((p) => p.isFeatured && p.isAvailable),
      bestsellers: products.filter((p) => p.isPopular && p.isAvailable),
      flashDeals: products.filter((p) => p.isFlashDeal && p.isAvailable),
      newArrivals: products
        .filter((p) => p.isAvailable && p.isNew)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      mainBanners: banners.filter((b) => (b.bannerType ?? "main") === "main"),
      subBanners: banners.filter((b) => b.bannerType === "sub"),
      printBanners: banners.filter((b) => b.bannerType === "print"),
    };
  }, [products, banners]);

  return { products, categories, banners, loading, ...derived };
}

export function useProductsByCategory(categoryId: string) {
  const { products, loading } = useCatalog();
  return {
    products: products.filter((p) => p.categoryId === categoryId),
    loading,
  };
}
