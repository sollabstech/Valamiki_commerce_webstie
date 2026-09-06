"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/product/product-image";
import { effectivePrice, type Product } from "@/types/firestore";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

export function CartLineItem({ product, quantity }: { product: Product; quantity: number }) {
  const { setQuantity, removeItem } = useCart();
  const price = effectivePrice(product);

  return (
    <div className="flex gap-3 border-b border-border py-4 last:border-0 sm:gap-4">
      <Link href={`/product/${product.id}`} className="shrink-0">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          categoryId={product.categoryId}
          className="size-20 rounded-lg ring-1 ring-border sm:size-24"
          sizes="96px"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-2">
          <div>
            <Link href={`/product/${product.id}`} className="text-sm font-semibold text-ink-900 hover:text-secondary-600 sm:text-base">
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-ink-500">{product.unit}</p>
          </div>
          <button
            aria-label="Remove item"
            onClick={() => removeItem(product.id)}
            className="shrink-0 text-ink-500 hover:text-error"
          >
            <Trash2 className="size-4.5" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center rounded-lg border border-border-strong">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity(product.id, quantity - 1)}
              className="flex size-8 items-center justify-center text-ink-700 hover:bg-cream-100"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-ink-900">{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stock}
              className="flex size-8 items-center justify-center text-ink-700 hover:bg-cream-100 disabled:opacity-40"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <span className="text-sm font-bold text-ink-900 sm:text-base">{formatPrice(price * quantity)}</span>
        </div>
      </div>
    </div>
  );
}
