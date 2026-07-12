import type { Metadata } from "next";
import { OrdersContent } from "@/components/account/orders-content";
import { RequireAuth } from "@/components/auth/require-auth";

export const metadata: Metadata = {
  title: "My Orders",
  robots: { index: false, follow: true },
};

export default function OrdersPage() {
  return (
    <RequireAuth>
      <OrdersContent />
    </RequireAuth>
  );
}
