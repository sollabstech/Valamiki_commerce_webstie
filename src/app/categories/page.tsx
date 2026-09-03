import type { Metadata } from "next";
import { CategoriesContent } from "@/components/categories/categories-content";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all product categories at Valmiki — groceries, stationery and more, delivered fast across Salem.",
};

export default function CategoriesPage() {
  return <CategoriesContent />;
}
