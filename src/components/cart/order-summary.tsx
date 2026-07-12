"use client";

import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { FREE_DELIVERY_THRESHOLD } from "@/config/coupons";

export function OrderSummary() {
  const { subtotal, discount, giftWrapFee, deliveryFee, total, itemCount } = useCart();

  return (
    <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
      <h2 className="mb-4 text-base font-bold text-ink-900">Order Summary</h2>
      <div className="flex flex-col gap-2.5 text-sm">
        <div className="flex justify-between text-ink-700">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Coupon discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        {giftWrapFee > 0 && (
          <div className="flex justify-between text-ink-700">
            <span>Gift wrap</span>
            <span>{formatPrice(giftWrapFee)}</span>
          </div>
        )}
        <div className="flex justify-between text-ink-700">
          <span>Delivery</span>
          {deliveryFee === 0 ? (
            <span className="font-medium text-success">FREE</span>
          ) : (
            <span>{formatPrice(deliveryFee)}</span>
          )}
        </div>
        {deliveryFee > 0 && (
          <p className="text-xs text-ink-500">
            Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery
          </p>
        )}
      </div>
      <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-bold text-ink-900">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
