"use client";

import Link from "next/link";
import { PackageSearch, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/use-orders";
import { formatDate, formatPrice } from "@/lib/utils";
import type { OrderStatus } from "@/types/firestore";

const statusVariant: Record<OrderStatus, "primary" | "success" | "error" | "secondary"> = {
  pending: "secondary",
  confirmed: "primary",
  shipped: "primary",
  delivered: "success",
  cancelled: "error",
};

export function OrdersContent() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <Container className="py-6 sm:py-8">
        <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">My Orders</h1>
        <div className="mt-6 flex flex-col items-center gap-3 rounded-lg bg-surface py-20 text-center shadow-soft ring-1 ring-border">
          <PackageSearch className="size-12 text-ink-300" />
          <p className="text-lg font-semibold text-ink-900">No orders yet</p>
          <p className="text-sm text-ink-500">Your order history will show up here.</p>
          <Button asChild className="mt-3">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6 sm:py-8">
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">My Orders</h1>

      <div className="mt-6 flex flex-col gap-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="flex items-center gap-4 rounded-lg bg-surface p-4 shadow-soft ring-1 ring-border transition-colors hover:border-primary-300 sm:p-5"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink-900">{order.id}</span>
                <Badge variant={statusVariant[order.orderStatus]}>
                  {order.orderStatus[0].toUpperCase() + order.orderStatus.slice(1)}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-ink-500">
                {order.products.length} item{order.products.length !== 1 ? "s" : ""} · {formatDate(order.createdAt)}
              </p>
              <p className="mt-1 line-clamp-1 text-sm text-ink-700">
                {order.products.map((p) => p.name).join(", ")}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-ink-900">{formatPrice(order.totalPrice)}</p>
              <ChevronRight className="ml-auto mt-1 size-4 text-ink-300" />
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
