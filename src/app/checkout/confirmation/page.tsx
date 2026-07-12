import { Suspense } from "react";
import type { Metadata } from "next";
import { OrderConfirmationContent } from "@/components/checkout/order-confirmation-content";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: true },
};

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <OrderConfirmationContent />
    </Suspense>
  );
}
