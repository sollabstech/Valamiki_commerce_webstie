"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product/product-image";
import { RatingStars } from "@/components/product/rating-stars";
import { effectivePrice, hasDiscount, isRecentlyAdded, type Product } from "@/types/firestore";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const discounted = hasDiscount(product);
  const price = effectivePrice(product);
  const isNew = isRecentlyAdded(product);
  const outOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addItem(product);
    setJustAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-soft transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-secondary-500/50 hover:shadow-elevated">
      <div className="relative">
        <Link
          href={`/product/${product.id}`}
          className="relative block aspect-square overflow-hidden bg-cream-100"
        >
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            categoryId={product.categoryId}
            className="size-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
            {product.isFlashDeal && <Badge variant="deal">Flash Deal</Badge>}
            {isNew && <Badge variant="primary">New</Badge>}
            {product.isPopular && <Badge variant="solid">Bestseller</Badge>}
          </div>
          {discounted && (
            <div className="absolute right-2 top-2">
              <Badge variant="error">{product.discountPercent}% Off</Badge>
            </div>
          )}
        </Link>

        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product.id)}
          className="absolute bottom-2 right-2 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-surface/95 shadow-soft backdrop-blur transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn(
              "size-4.5 transition-colors",
              wishlisted ? "fill-error text-error" : "text-ink-500"
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-secondary-600">
          {product.categoryName}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-ink-900 transition-colors group-hover:text-secondary-600">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-ink-500">({product.reviewCount})</span>
        </div>

        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-display text-lg font-bold text-secondary-600">
            {formatPrice(price)}
          </span>
          {discounted && (
            <span className="text-xs text-ink-300 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className={cn(
            "mt-2.5 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 disabled:opacity-50",
            justAdded
              ? "bg-success text-white"
              : "bg-gradient-gold text-on-accent shadow-gold ring-1 ring-inset ring-white/25 hover:brightness-105 hover:-translate-y-0.5"
          )}
        >
          {justAdded ? (
            <>
              <Check className="size-4" /> Added
            </>
          ) : outOfStock ? (
            "Out of stock"
          ) : (
            <>
              <ShoppingCart className="size-4" /> Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
