import type { Metadata } from "next";
import { OrderDetailContent } from "@/components/account/order-detail-content";
import { RequireAuth } from "@/components/auth/require-auth";

export const metadata: Metadata = {
  title: "Order Details",
  robots: { index: false, follow: true },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <RequireAuth>
      <OrderDetailContent orderId={id} />
    </RequireAuth>
  );
}
