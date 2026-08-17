import type { Metadata } from "next";
import { ProductDetailContent } from "@/components/product/product-detail-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // Product data fetched client-side; return a sensible fallback for SEO crawlers.
  const { id } = await params;
  return {
    title: "Product | Valmiki",
    description: "Shop quality groceries and stationery from Valmiki — fast delivery across Salem.",
    openGraph: {
      title: "Product | Valmiki",
      description: "Shop quality groceries and stationery from Valmiki.",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // ProductDetailContent fetches the product client-side via Firestore.
  return <ProductDetailContent productId={id} />;
}
