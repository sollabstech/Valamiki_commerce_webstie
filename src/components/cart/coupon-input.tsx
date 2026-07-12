"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { coupons } from "@/config/coupons";

export function CouponInput() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const ok = applyCoupon(code);
    if (ok) {
      toast.success(`Coupon "${code.toUpperCase()}" applied`);
      setCode("");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (coupon) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-success bg-success-bg px-4 py-3">
        <div className="flex items-center gap-2">
          <Tag className="size-4 text-success" />
          <span className="text-sm font-semibold text-success">{coupon.code}</span>
          <span className="text-xs text-ink-700">{coupon.description}</span>
        </div>
        <button aria-label="Remove coupon" onClick={removeCoupon} className="text-ink-500 hover:text-error">
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleApply} className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-500" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="h-10 w-full rounded-lg border border-border-strong bg-white pl-9 pr-3 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <button
          type="submit"
          className="h-10 shrink-0 rounded-lg border border-primary-700 px-4 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
        >
          Apply
        </button>
      </form>
      <p className="mt-2 text-xs text-ink-500">
        Try: {coupons.map((c) => c.code).join(", ")}
      </p>
    </div>
  );
}
