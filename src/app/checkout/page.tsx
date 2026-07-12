import type { Metadata } from "next";
import { CheckoutContent } from "@/components/checkout/checkout-content";
import { RequireAuth } from "@/components/auth/require-auth";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}
