import { collection, doc, getDoc, getDocs, type DocumentData } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { mockProducts } from "@/lib/mock-data";
import type { Product } from "@/types/firestore";

function fromDoc(id: string, data: DocumentData): Product {
  return {
    id,
    name: data.name ?? "",
    description: data.description ?? "",
    categoryId: data.categoryId ?? "",
    categoryName: data.categoryName ?? "",
    price: data.price ?? 0,
    discountPrice: data.discountPrice ?? 0,
    discountPercent: data.discountPercent ?? 0,
    images: data.images ?? [],
    unit: data.unit ?? "",
    stock: data.stock ?? 0,
    isAvailable: data.isAvailable ?? true,
    isFeatured: data.isFeatured ?? false,
    isPopular: data.isPopular ?? false,
    isFlashDeal: data.isFlashDeal ?? false,
    rating: data.rating ?? 0,
    reviewCount: data.reviewCount ?? 0,
    tags: data.tags ?? [],
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const db = getDb();
  if (db) {
    try {
      const snap = await getDocs(collection(db, "products"));
      if (!snap.empty) return snap.docs.map((d) => fromDoc(d.id, d.data()));
    } catch {
      // fall through to mock data
    }
  }
  return mockProducts;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const db = getDb();
  if (db) {
    try {
      const snap = await getDoc(doc(db, "products", id));
      if (snap.exists()) return fromDoc(snap.id, snap.data());
    } catch {
      // fall through to mock data
    }
  }
  return mockProducts.find((p) => p.id === id) ?? null;
}
