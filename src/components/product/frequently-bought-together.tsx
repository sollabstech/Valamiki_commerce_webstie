"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ProductImage } from "@/components/product/product-image";
import { effectivePrice, type Product } from "@/types/firestore";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

export function FrequentlyBoughtTogether({
  product,
  companions,
}: {
  product: Product;
  companions: Product[];
}) {
  const { addItem } = useCart();
  const all = useMemo(() => [product, ...companions], [product, companions]);
  const [selected, setSelected] = useState<Set<string>>(new Set([product.id]));

  const companionIds = companions.map((p) => p.id).join(",");
  useEffect(() => {
    setSelected(new Set(all.map((p) => p.id)));
    // Re-select everything by default whenever the companion set actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, companionIds]);

  if (companions.length === 0) return null;

  const total = all
    .filter((p) => selected.has(p.id))
    .reduce((sum, p) => sum + effectivePrice(p), 0);

  const toggle = (id: string) => {
    if (id === product.id) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddAll = () => {
    all.filter((p) => selected.has(p.id)).forEach((p) => addItem(p));
    toast.success("Added selected items to cart");
  };

  return (
    <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
      <h2 className="mb-4 text-lg font-bold text-ink-900">Frequently Bought Together</h2>
      <div className="flex flex-wrap items-center gap-3">
        {all.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3">
            <label className="flex flex-col items-center gap-1.5">
              <div className="relative">
                <ProductImage
                  src={p.images[0]}
                  alt={p.name}
                  categoryId={p.categoryId}
                  className="size-20 rounded-lg ring-1 ring-border sm:size-24"
                  sizes="96px"
                />
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => toggle(p.id)}
                  disabled={p.id === product.id}
                  className="absolute left-1.5 top-1.5 size-4 accent-primary-700"
                />
              </div>
              <Link
                href={`/product/${p.id}`}
                className="max-w-24 truncate text-center text-xs text-ink-700 hover:text-secondary-600 sm:max-w-28"
              >
                {p.name}
              </Link>
              <span className="text-xs font-semibold text-ink-900">{formatPrice(effectivePrice(p))}</span>
            </label>
            {i < all.length - 1 && <Plus className="size-4 shrink-0 text-ink-300" />}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-sm text-ink-700">
          Total for {selected.size} item{selected.size !== 1 ? "s" : ""}:{" "}
          <span className="text-lg font-bold text-ink-900">{formatPrice(total)}</span>
        </p>
        <button
          onClick={handleAddAll}
          className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
        >
          <ShoppingCart className="size-4" /> Add Selected to Cart
        </button>
      </div>
    </div>
  );
}
