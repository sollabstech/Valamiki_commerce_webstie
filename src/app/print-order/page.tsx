import type { Metadata } from "next";
import { PrintOrderContent } from "@/components/print-order/print-order-content";
import { RequireAuth } from "@/components/auth/require-auth";

export const metadata: Metadata = {
  title: "Print & Xerox Order",
  robots: { index: false, follow: true },
};

export default function PrintOrderPage() {
  return (
    <RequireAuth>
      <PrintOrderContent />
    </RequireAuth>
  );
}
