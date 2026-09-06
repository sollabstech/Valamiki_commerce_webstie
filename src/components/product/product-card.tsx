"use client";

import Link from "next/link";
import { Heart, Plus, Check } from "lucide-react";
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

  const handleAddToCart = () => {
    addItem(product);
    setJustAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="glass-card group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-elevated hover:ring-1 hover:ring-secondary-400/50">
      <div className="relative">
        <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            categoryId={product.categoryId}
            className="size-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {product.isFlashDeal && <Badge variant="deal">Flash Deal</Badge>}
            {isNew && <Badge variant="secondary">New</Badge>}
            {product.isPopular && <Badge variant="primary">Bestseller</Badge>}
          </div>
          {discounted && (
            <div className="absolute right-2 top-2 rounded-full bg-error px-2 py-1 text-xs font-bold text-white shadow-soft">
              {product.discountPercent}% OFF
            </div>
          )}
        </Link>

        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product.id)}
          className="absolute right-2 bottom-2 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn(
              "size-4.5 transition-colors",
              wishlisted ? "fill-error text-error" : "text-ink-500"
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-xs font-medium text-ink-500">{product.categoryName}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-ink-900 transition-colors hover:text-secondary-700">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-ink-500">{product.unit}</p>

        <div className="flex items-center gap-1.5">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-ink-500">({product.reviewCount})</span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-secondary-700">{formatPrice(price)}</span>
            {discounted && (
              <span className="text-xs text-ink-300 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="Add to cart"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full text-white shadow-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated active:scale-95 disabled:opacity-50",
              justAdded ? "bg-success" : "bg-gradient-navy hover:brightness-110"
            )}
          >
            {justAdded ? <Check className="size-4.5" /> : <Plus className="size-4.5" />}
          </button>
        </div>
        {product.stock <= 0 && (
          <span className="text-xs font-medium text-error">Out of stock</span>
        )}
      </div>
    </div>
  );
}
