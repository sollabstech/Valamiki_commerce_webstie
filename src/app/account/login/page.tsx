import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginContent } from "@/components/auth/login-content";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
