import type { Metadata } from "next";
import { ProfileContent } from "@/components/account/profile-content";
import { RequireAuth } from "@/components/auth/require-auth";

export const metadata: Metadata = {
  title: "Profile Settings",
  robots: { index: false, follow: true },
};

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfileContent />
    </RequireAuth>
  );
}
