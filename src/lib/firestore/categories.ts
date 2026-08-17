import { collection, getDocs, type DocumentData } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import type { Category } from "@/types/firestore";

function fromDoc(id: string, data: DocumentData): Category {
  return {
    id,
    name: data.name ?? "",
    icon: data.icon ?? "",
    color: data.color ?? "#0e3b5c",
    productCount: data.productCount ?? 0,
    isActive: data.isActive ?? true,
    sortOrder: data.sortOrder,
  };
}

export async function fetchCategories(): Promise<Category[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, "categories"));
    return snap.docs
      .map((d) => fromDoc(d.id, d.data()))
      .filter((c) => c.isActive)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  } catch {
    return [];
  }
}
