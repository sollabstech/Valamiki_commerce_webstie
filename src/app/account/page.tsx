import type { Metadata } from "next";
import { AccountHubContent } from "@/components/account/account-hub-content";
import { RequireAuth } from "@/components/auth/require-auth";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <RequireAuth>
      <AccountHubContent />
    </RequireAuth>
  );
}
