"use client";

import Link from "next/link";
import { ChevronLeft, PackageSearch } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OrderTrackingTimeline } from "@/components/account/order-tracking-timeline";
import { useOrders } from "@/hooks/use-orders";
import { formatDate, formatPrice } from "@/lib/utils";
import { whatsappLink } from "@/config/site";

export function OrderDetailContent({ orderId }: { orderId: string }) {
  const { getOrder } = useOrders();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <Container className="py-16 text-center">
        <PackageSearch className="mx-auto size-12 text-ink-300" />
        <p className="mt-4 text-lg font-semibold text-ink-900">Order not found</p>
        <Button asChild className="mt-4">
          <Link href="/orders">Back to Orders</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-6 sm:py-8">
      <Link href="/orders" className="mb-4 flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-primary-700">
        <ChevronLeft className="size-4" /> Back to Orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{order.id}</h1>
          <p className="mt-1 text-sm text-ink-500">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <a
          href={whatsappLink(`Hi, I need help with my order ${order.id}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border-strong px-3.5 py-2 text-sm font-medium text-ink-700 hover:bg-cream-100"
        >
          Need help?
        </a>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
            <h2 className="mb-4 text-base font-bold text-ink-900">Tracking Status</h2>
            <OrderTrackingTimeline order={order} />
          </div>

          <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
            <h2 className="mb-3 text-base font-bold text-ink-900">Items</h2>
            <div className="flex flex-col divide-y divide-border">
              {order.products.map((item) => (
                <div key={item.productId} className="flex justify-between py-2.5 text-sm">
                  <span className="text-ink-700">
                    {item.name} <span className="text-ink-500">× {item.quantity}</span>
                  </span>
                  <span className="font-medium text-ink-900">{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
            <h2 className="mb-2 text-base font-bold text-ink-900">Delivery Address</h2>
            <p className="text-sm text-ink-700">{order.deliveryAddress.name}</p>
            <p className="text-sm text-ink-500">
              {order.deliveryAddress.street}
              {order.deliveryAddress.addressLine2 ? `, ${order.deliveryAddress.addressLine2}` : ""},{" "}
              {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
            </p>
            <p className="text-sm text-ink-500">Phone: {order.deliveryAddress.phone}</p>
          </div>
        </div>

        <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
          <h2 className="mb-4 text-base font-bold text-ink-900">Payment Summary</h2>
          <div className="flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between text-ink-700">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ink-700">
              <span>Delivery & Charges</span>
              <span>{formatPrice(order.deliveryCharge)}</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold text-ink-900">
            <span>Total</span>
            <span>{formatPrice(order.totalPrice)}</span>
          </div>
          <p className="mt-3 text-xs uppercase text-ink-500">Paid via {order.paymentMethod}</p>
        </div>
      </div>
    </Container>
  );
}
