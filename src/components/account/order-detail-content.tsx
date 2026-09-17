"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, PackageSearch, AlertTriangle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OrderTrackingTimeline } from "@/components/account/order-tracking-timeline";
import { useOrders } from "@/hooks/use-orders";
import { formatDate, formatPrice } from "@/lib/utils";
import { whatsappLink } from "@/config/site";

export function OrderDetailContent({ orderId }: { orderId: string }) {
  const { getOrder, requestCancellation } = useOrders();
  const order = getOrder(orderId);
  const [requesting, setRequesting] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  // Requesting cancellation only makes sense before the order has shipped,
  // and only when there isn't already a request awaiting review.
  const canRequestCancel =
    (order.orderStatus === "pending" || order.orderStatus === "confirmed") &&
    order.cancelRequest?.status !== "pending";

  const handleSubmitCancellation = async () => {
    if (!reason.trim()) {
      toast.error("Please tell us why you'd like to cancel.");
      return;
    }
    setSubmitting(true);
    const result = await requestCancellation(order.id, reason.trim());
    setSubmitting(false);
    if (result.success) {
      toast.success("Cancellation requested — we'll review it shortly.");
      setRequesting(false);
      setReason("");
    } else {
      toast.error(result.error ?? "Couldn't submit your cancellation request.");
    }
  };

  return (
    <Container className="max-w-none py-6 sm:py-8">
      <Link href="/orders" className="mb-4 flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-secondary-600">
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

            {order.cancelRequest?.status === "pending" && (
              <div className="mt-5 flex items-start gap-2 rounded-lg border border-secondary-500/30 bg-secondary-50 p-3.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-secondary-600" />
                <div>
                  <p className="text-sm font-semibold text-secondary-700">
                    Cancellation requested — awaiting review
                  </p>
                  <p className="mt-1 text-sm text-ink-500">&ldquo;{order.cancelRequest.reason}&rdquo;</p>
                </div>
              </div>
            )}

            {order.cancelRequest?.status === "rejected" && (
              <div className="mt-5 flex items-start gap-2 rounded-lg border border-error/30 bg-error-bg p-3.5">
                <XCircle className="mt-0.5 size-4 shrink-0 text-error" />
                <p className="text-sm font-medium text-error">
                  Your cancellation request was declined. The order continues as usual.
                </p>
              </div>
            )}

            {canRequestCancel && (
              <div className="mt-5 border-t border-border pt-4">
                {!requesting ? (
                  <button
                    type="button"
                    onClick={() => setRequesting(true)}
                    className="text-sm font-semibold text-error hover:underline"
                  >
                    Cancel this order
                  </button>
                ) : (
                  <div className="rounded-lg border border-error/30 bg-error-bg p-3.5">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-error" />
                      <p className="text-sm font-medium text-error">
                        Tell us why you&apos;d like to cancel — our team will review your request.
                      </p>
                    </div>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Reason for cancellation…"
                      rows={3}
                      disabled={submitting}
                      className="mt-3 w-full rounded-md border border-border-strong bg-white p-2.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:border-error focus:ring-2 focus:ring-error/25 disabled:opacity-60"
                    />
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setRequesting(false);
                          setReason("");
                        }}
                        disabled={submitting}
                      >
                        Keep order
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleSubmitCancellation}
                        disabled={submitting}
                      >
                        {submitting ? "Submitting…" : "Submit cancellation request"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
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
