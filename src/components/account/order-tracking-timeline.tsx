import { CheckCircle2, Circle, PackageCheck, Truck, XCircle } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/firestore";

const steps: { status: OrderStatus; label: string; icon: typeof Circle }[] = [
  { status: "confirmed", label: "Order Confirmed", icon: CheckCircle2 },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: PackageCheck },
];

/** Simulates progression for demo orders that don't yet have live logistics
 * updates from the admin panel — swap for the real `orderStatus` once
 * the admin dashboard writes status changes to this order. */
function simulateStatus(order: Order): OrderStatus {
  if (order.orderStatus === "cancelled") return "cancelled";
  const hoursSince = (Date.now() - order.createdAt.getTime()) / (1000 * 60 * 60);
  if (hoursSince < 6) return "confirmed";
  if (hoursSince < 24) return "shipped";
  return "delivered";
}

export function OrderTrackingTimeline({ order }: { order: Order }) {
  const currentStatus = simulateStatus(order);

  if (currentStatus === "cancelled") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-error/30 bg-error-bg p-4">
        <XCircle className="size-5 text-error" />
        <p className="text-sm font-medium text-error">This order has been cancelled.</p>
      </div>
    );
  }

  const currentIndex = steps.findIndex((s) => s.status === currentStatus);

  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const done = i <= currentIndex;
        return (
          <div key={step.status} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full",
                  done ? "bg-primary-700 text-white" : "bg-cream-100 text-ink-300"
                )}
              >
                <Icon className="size-4" />
              </span>
              {i < steps.length - 1 && (
                <span className={cn("w-0.5 flex-1", done ? "bg-primary-700" : "bg-border")} />
              )}
            </div>
            <div className="pb-6">
              <p className={cn("text-sm font-semibold", done ? "text-ink-900" : "text-ink-300")}>
                {step.label}
              </p>
              {i === currentIndex && (
                <p className="text-xs text-ink-500">Updated {formatDate(order.createdAt)}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
