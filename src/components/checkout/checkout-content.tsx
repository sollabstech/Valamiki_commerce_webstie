"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OrderSummary } from "@/components/cart/order-summary";
import { AddressSelector } from "@/components/checkout/address-selector";
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector";
import { useCart } from "@/hooks/use-cart";
import { useOrders } from "@/hooks/use-orders";
import { useAuth } from "@/hooks/use-auth";
import { getGatewayForMethod, type PaymentMethodType } from "@/lib/payments";
import { effectivePrice } from "@/types/firestore";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Address } from "@/types/firestore";

export function CheckoutContent() {
  const router = useRouter();
  const { lines, hydrated, subtotal, discount, giftWrapFee, deliveryFee, total, giftWrap, giftMessage, clear } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | null>(null);
  const [placing, setPlacing] = useState(false);
  const orderPlaced = useRef(false);

  useEffect(() => {
    if (hydrated && lines.length === 0 && !orderPlaced.current) router.replace("/cart");
  }, [hydrated, lines.length, router]);

  const estimatedDelivery = new Date(Date.now() + (address?.pincode.startsWith("636") ? 1 : 4) * 24 * 60 * 60 * 1000);

  const handlePlaceOrder = async () => {
    if (!address) return toast.error("Please select or add a delivery address");
    if (!paymentMethod) return toast.error("Please select a payment method");

    setPlacing(true);
    try {
      const orderIdSeed = `${Date.now()}`;
      const gateway = getGatewayForMethod(paymentMethod);
      const result = await gateway?.initiate({ amount: total, orderId: orderIdSeed, method: paymentMethod });

      if (!result?.success) {
        toast.error(result?.error ?? "Payment failed. Please try again.");
        setPlacing(false);
        return;
      }

      const order = placeOrder({
        userId: user!.uid,
        products: lines.map((line) => ({
          productId: line.product.id,
          name: line.product.name,
          imageUrl: line.product.images[0] ?? "",
          price: line.product.price,
          discountPrice: line.product.discountPrice,
          unit: line.product.unit,
          quantity: line.quantity,
          totalPrice: effectivePrice(line.product) * line.quantity,
        })),
        subtotal,
        deliveryCharge: deliveryFee + giftWrapFee,
        discount,
        totalPrice: total,
        deliveryAddress: address,
        paymentMethod,
      });

      orderPlaced.current = true;
      clear();
      toast.success("Order placed successfully!");
      router.push(`/checkout/confirmation?orderId=${order.id}`);
    } finally {
      setPlacing(false);
    }
  };

  if (lines.length === 0) return null;

  return (
    <Container className="py-6 sm:py-8">
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Checkout</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <AddressSelector selectedId={address?.id ?? null} onSelect={setAddress} />
          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />

          <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
            <h2 className="mb-3 text-base font-bold text-ink-900">Items ({lines.length})</h2>
            <div className="flex flex-col gap-2 text-sm">
              {lines.map((line) => (
                <div key={line.product.id} className="flex justify-between text-ink-700">
                  <span className="line-clamp-1">
                    {line.product.name} <span className="text-ink-500">× {line.quantity}</span>
                  </span>
                  <span className="shrink-0 font-medium text-ink-900">
                    {formatPrice(effectivePrice(line.product) * line.quantity)}
                  </span>
                </div>
              ))}
            </div>
            {giftWrap && (
              <p className="mt-3 rounded-lg bg-cream-100 p-3 text-xs text-ink-700">
                🎁 Gift wrapped{giftMessage ? ` — "${giftMessage}"` : ""}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <OrderSummary />
          <div className="rounded-lg border border-border bg-cream-100 p-4 text-sm text-ink-700">
            Estimated delivery: <span className="font-semibold text-ink-900">{formatDate(estimatedDelivery)}</span>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="justify-center"
            onClick={handlePlaceOrder}
            disabled={placing}
          >
            {placing ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Placing order...
              </>
            ) : (
              `Place Order · ${formatPrice(total)}`
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
}
