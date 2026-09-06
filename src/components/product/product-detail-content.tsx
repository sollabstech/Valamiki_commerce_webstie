"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ChevronRight, Heart, Minus, Plus, Share2,
  ShieldCheck, RotateCcw, Truck, PackageSearch,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/product/rating-stars";
import { ProductGallery } from "@/components/product/product-gallery";
import { DeliveryEstimate } from "@/components/product/delivery-estimate";
import { ProductReviews } from "@/components/product/product-reviews";
import { FrequentlyBoughtTogether } from "@/components/product/frequently-bought-together";
import { ProductRail } from "@/components/home/product-rail";
import { useCatalog } from "@/hooks/use-catalog";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { effectivePrice, hasDiscount, isRecentlyAdded } from "@/types/firestore";
import { cn, formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";

function ProductDetailSkeleton() {
  return (
    <Container className="py-6 sm:py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-4 flex items-center gap-2">
        {[64, 8, 80, 8, 140].map((w, i) => (
          <div key={i} className={`h-4 animate-pulse rounded bg-primary-50`} style={{ width: w }} />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery skeleton */}
        <div className="space-y-3">
          <div className="aspect-square animate-pulse rounded-2xl bg-primary-50" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 w-16 animate-pulse rounded-lg bg-primary-50" />
            ))}
          </div>
        </div>
        {/* Info skeleton */}
        <div className="space-y-4 pt-2">
          <div className="h-8 w-2/3 animate-pulse rounded-lg bg-primary-50" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-primary-50" />
          <div className="h-5 w-1/4 animate-pulse rounded bg-primary-50" />
          <div className="h-10 w-2/5 animate-pulse rounded-xl bg-primary-50" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-primary-50" />
          <div className="h-14 w-full animate-pulse rounded-xl bg-primary-50" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-primary-50" />
          <div className="h-20 w-full animate-pulse rounded-xl bg-primary-50" />
        </div>
      </div>
    </Container>
  );
}

/**
 * Accepts a productId string and fetches the product client-side via the
 * shared useCatalog() hook. This avoids the server-side Firebase client SDK
 * issue that caused 404 errors on the product page.
 */
export function ProductDetailContent({ productId }: { productId: string }) {
  const router = useRouter();
  const { products, loading } = useCatalog();
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"description" | "specifications">("description");

  // Derive product and related items from the catalog.
  const product = useMemo(
    () => products.find((p) => p.id === productId) ?? null,
    [products, productId],
  );
  const related = useMemo(
    () =>
      product
        ? products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
        : [],
    [products, product],
  );

  // ─── Loading ─────────────────────────────────────────────────────────────
  if (loading) return <ProductDetailSkeleton />;

  // ─── Not found ───────────────────────────────────────────────────────────
  if (!product) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <PackageSearch className="mb-4 size-14 text-ink-200" />
        <h1 className="mb-2 font-display text-2xl font-bold text-ink-900">Product Not Found</h1>
        <p className="mb-6 text-sm text-ink-500">
          This product doesn&apos;t exist or may have been removed.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-border-strong px-5 py-2.5 text-sm font-semibold text-ink-900 hover:bg-cream-100"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    );
  }

  // ─── Product found ────────────────────────────────────────────────────────
  const discounted = hasDiscount(product);
  const price = effectivePrice(product);
  const isNew = isRecentlyAdded(product);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : siteConfig.url;
    const message = `Check out ${product.name} on Valmiki — ${formatPrice(price)}\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <Container className="py-6 sm:py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink-500">
        <Link href="/" className="hover:text-secondary-600">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href={`/category/${product.categoryId}`} className="hover:text-secondary-600">
          {product.categoryName}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="line-clamp-1 font-medium text-ink-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} name={product.name} categoryId={product.categoryId} />

        <div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {product.isFlashDeal && <Badge variant="deal">Flash Deal</Badge>}
            {isNew && <Badge variant="secondary">New</Badge>}
            {product.isPopular && <Badge variant="primary">Bestseller</Badge>}
          </div>

          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-ink-500">{product.unit}</p>

          <div className="mt-2 flex items-center gap-2">
            <RatingStars rating={product.rating} size="md" />
            <span className="text-sm text-ink-500">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-ink-900">{formatPrice(price)}</span>
            {discounted && (
              <>
                <span className="text-lg text-ink-300 line-through">{formatPrice(product.price)}</span>
                <span className="rounded-full bg-error/10 px-2.5 py-1 text-sm font-bold text-error">
                  {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-500">Inclusive of all taxes</p>

          <p className={cn("mt-3 text-sm font-medium", outOfStock ? "text-error" : "text-success")}>
            {outOfStock
              ? "Out of Stock"
              : product.stock <= 10
              ? `Only ${product.stock} left in stock`
              : "In Stock"}
          </p>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-border-strong">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-10 items-center justify-center text-ink-700 hover:bg-cream-100"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold text-ink-900">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                className="flex size-10 items-center justify-center text-ink-700 hover:bg-cream-100"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <button
              type="button"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggle(product.id)}
              className="flex size-10 items-center justify-center rounded-lg border border-border-strong hover:bg-cream-100"
            >
              <Heart className={cn("size-4.5", wishlisted ? "fill-error text-error" : "text-ink-700")} />
            </button>

            <button
              type="button"
              aria-label="Share on WhatsApp"
              onClick={handleShare}
              className="flex size-10 items-center justify-center rounded-lg border border-border-strong hover:bg-cream-100"
            >
              <Share2 className="size-4.5 text-ink-700" />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 justify-center"
              disabled={outOfStock}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex-1 justify-center"
              disabled={outOfStock}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-5">
            <DeliveryEstimate />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-ink-500">
            <div className="flex flex-col items-center gap-1.5 rounded-lg bg-cream-100 p-3">
              <ShieldCheck className="size-4.5 text-primary-700" />
              100% Genuine
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-lg bg-cream-100 p-3">
              <Truck className="size-4.5 text-primary-700" />
              Fast Delivery
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-lg bg-cream-100 p-3">
              <RotateCcw className="size-4.5 text-primary-700" />
              Easy Returns
            </div>
          </div>
        </div>
      </div>

      {/* Description / Specs tabs */}
      <div className="mt-12">
        <div className="flex gap-6 border-b border-border">
          {(["description", "specifications"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "border-b-2 pb-3 text-sm font-semibold capitalize transition-colors",
                tab === t
                  ? "border-primary-700 text-primary-700"
                  : "border-transparent text-ink-500",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-5">
          {tab === "description" ? (
            <p className="max-w-3xl text-sm leading-relaxed text-ink-700">{product.description}</p>
          ) : (
            <dl className="grid max-w-xl grid-cols-1 gap-y-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between border-b border-border py-2">
                <dt className="text-ink-500">Category</dt>
                <dd className="font-medium text-ink-900">{product.categoryName}</dd>
              </div>
              <div className="flex justify-between border-b border-border py-2">
                <dt className="text-ink-500">Unit</dt>
                <dd className="font-medium text-ink-900">{product.unit}</dd>
              </div>
              <div className="flex justify-between border-b border-border py-2">
                <dt className="text-ink-500">Stock</dt>
                <dd className="font-medium text-ink-900">
                  {outOfStock ? "Out of stock" : `${product.stock} available`}
                </dd>
              </div>
              <div className="flex justify-between border-b border-border py-2">
                <dt className="text-ink-500">Tags</dt>
                <dd className="font-medium capitalize text-ink-900">
                  {product.tags.join(", ") || "—"}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>

      <div className="mt-10">
        <ProductReviews product={product} />
      </div>

      <div className="mt-10">
        <FrequentlyBoughtTogether product={product} companions={related.slice(0, 2)} />
      </div>

      <div className="mt-10">
        <ProductRail title="Related Products" products={related.slice(0, 10)} />
      </div>
    </Container>
  );
}
