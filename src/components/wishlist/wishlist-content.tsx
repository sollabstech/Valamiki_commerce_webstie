"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { useCatalog } from "@/hooks/use-catalog";
import { useWishlist } from "@/hooks/use-wishlist";

export function WishlistContent() {
  const { products, loading } = useCatalog();
  const { ids } = useWishlist();

  const items = products.filter((p) => ids.includes(p.id));

  return (
    <Container className="py-6 sm:py-8">
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">My Wishlist</h1>
      <p className="mt-1 text-sm text-ink-500">
        {loading ? "Loading..." : `${items.length} item${items.length !== 1 ? "s" : ""} saved`}
      </p>

      {!loading && items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-lg bg-surface py-16 text-center shadow-soft ring-1 ring-border">
          <Heart className="size-10 text-ink-300" />
          <p className="font-medium text-ink-900">Your wishlist is empty</p>
          <p className="text-sm text-ink-500">Tap the heart icon on any product to save it here.</p>
          <Button asChild className="mt-3">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
