import type { Metadata } from "next";
import { AddressesContent } from "@/components/account/addresses-content";
import { RequireAuth } from "@/components/auth/require-auth";

export const metadata: Metadata = {
  title: "Saved Addresses",
  robots: { index: false, follow: true },
};

export default function AddressesPage() {
  return (
    <RequireAuth>
      <AddressesContent />
    </RequireAuth>
  );
}
