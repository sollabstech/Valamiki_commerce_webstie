"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CouponInput } from "@/components/cart/coupon-input";
import { GiftWrapOption } from "@/components/cart/gift-wrap-option";
import { OrderSummary } from "@/components/cart/order-summary";
import { useCart } from "@/hooks/use-cart";

export function CartContent() {
  const { lines, hydrated } = useCart();

  if (!hydrated) return null;

  if (lines.length === 0) {
    return (
      <Container className="py-6 sm:py-8">
        <div className="flex flex-col items-center gap-3 rounded-lg bg-surface py-20 text-center shadow-soft ring-1 ring-border">
          <ShoppingCart className="size-12 text-ink-300" />
          <p className="text-lg font-semibold text-ink-900">Your cart is empty</p>
          <p className="text-sm text-ink-500">Browse our grocery and stationery picks to get started.</p>
          <Button asChild className="mt-3">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6 sm:py-8">
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Shopping Cart</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <div className="rounded-lg bg-surface p-4 shadow-soft ring-1 ring-border sm:p-5">
            {lines.map((line) => (
              <CartLineItem key={line.product.id} product={line.product} quantity={line.quantity} />
            ))}
          </div>
          <CouponInput />
          <GiftWrapOption />
        </div>

        <div className="flex flex-col gap-4">
          <OrderSummary />
          <Button size="lg" variant="secondary" className="justify-center" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
