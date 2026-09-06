"use client";

import { Gift } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { GIFT_WRAP_FEE } from "@/config/coupons";
import { formatPrice } from "@/lib/utils";

export function GiftWrapOption() {
  const { giftWrap, setGiftWrap, giftMessage, setGiftMessage } = useCart();

  return (
    <div className="rounded-lg border border-border bg-cream-100 p-4">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={giftWrap}
          onChange={(e) => setGiftWrap(e.target.checked)}
          className="mt-0.5 size-4 accent-primary-700"
        />
        <span className="flex-1">
          <span className="flex items-center gap-2 text-sm font-semibold text-ink-900">
            <Gift className="size-4 text-primary-700" /> Add gift wrap ({formatPrice(GIFT_WRAP_FEE)})
          </span>
          <span className="text-xs text-ink-500">Perfect for birthdays, festivals, or a little surprise.</span>
        </span>
      </label>
      {giftWrap && (
        <textarea
          value={giftMessage}
          onChange={(e) => setGiftMessage(e.target.value.slice(0, 200))}
          placeholder="Add a gift message (optional)"
          rows={2}
          className="mt-3 w-full resize-none rounded-lg border border-border-strong bg-surface p-3 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      )}
    </div>
  );
}
