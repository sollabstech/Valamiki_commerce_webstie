"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, PackageSearch } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/use-orders";
import { formatDate, formatPrice } from "@/lib/utils";

export function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { getOrder } = useOrders();
  const order = orderId ? getOrder(orderId) : undefined;

  if (!order) {
    return (
      <Container className="py-16 text-center">
        <PackageSearch className="mx-auto size-12 text-ink-300" />
        <p className="mt-4 text-lg font-semibold text-ink-900">Order not found</p>
        <Button asChild className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </Container>
    );
  }

  const estimatedDelivery = new Date(order.createdAt.getTime() + (order.deliveryAddress.pincode.startsWith("636") ? 1 : 4) * 24 * 60 * 60 * 1000);

  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto size-16 text-success" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Order Placed!</h1>
        <p className="mt-2 text-sm text-ink-500">
          Thank you — your order has been confirmed. A confirmation will be sent to your phone shortly.
        </p>

        <div className="mt-6 rounded-lg bg-surface p-5 text-left shadow-soft ring-1 ring-border">
          <div className="flex justify-between text-sm">
            <span className="text-ink-500">Order ID</span>
            <span className="font-semibold text-ink-900">{order.id}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-ink-500">Order Date</span>
            <span className="font-medium text-ink-900">{formatDate(order.createdAt)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-ink-500">Estimated Delivery</span>
            <span className="font-medium text-ink-900">{formatDate(estimatedDelivery)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-ink-500">Payment Method</span>
            <span className="font-medium uppercase text-ink-900">{order.paymentMethod}</span>
          </div>
          <div className="mt-3 border-t border-border pt-3 flex justify-between text-base font-bold text-ink-900">
            <span>Total Paid</span>
            <span>{formatPrice(order.totalPrice)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="flex-1 justify-center">
            <Link href="/orders">Track Order</Link>
          </Button>
          <Button asChild variant="secondary" className="flex-1 justify-center">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
