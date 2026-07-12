import { Suspense } from "react";
import type { Metadata } from "next";
import { CategoryContent } from "@/components/category/category-content";
import { categories } from "@/config/nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);
  const name = category?.name ?? "All Products";
  return {
    title: name,
    description: `Shop ${name} online from Valmiki — fast delivery across Salem.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense>
      <CategoryContent categoryId={id} />
    </Suspense>
  );
}
