import { collection, getDocs, type DocumentData } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import type { Banner } from "@/types/firestore";

function fromDoc(id: string, data: DocumentData): Banner {
  return {
    id,
    imageUrl: data.imageUrl ?? "",
    title: data.title ?? "",
    subtitle: data.subtitle,
    linkType: data.linkType,
    linkValue: data.linkValue,
    isActive: data.isActive ?? true,
    sortOrder: data.sortOrder,
  };
}

export async function fetchBanners(): Promise<Banner[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, "banners"));
    return snap.docs
      .map((d) => fromDoc(d.id, d.data()))
      .filter((b) => b.isActive)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  } catch {
    return [];
  }
}
