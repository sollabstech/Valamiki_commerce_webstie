"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { useAuth } from "@/hooks/use-auth";

export function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/account";
  const { user, signInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace(redirectTo);
  }, [user, redirectTo, router]);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const result = await signInWithGoogle();
    if (!result.success) toast.error(result.error);
    setGoogleLoading(false);
  };

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-lg bg-surface p-6 shadow-soft ring-1 ring-border">
          <h1 className="text-center text-xl font-bold text-ink-900">Login to continue</h1>
          <p className="mt-1 text-center text-sm text-ink-500">Sign in to your Valmiki account</p>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-border-strong bg-white text-sm font-semibold text-ink-900 transition-colors hover:bg-cream-100 disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" className="size-4.5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.14c-.22-.66-.35-1.36-.35-2.14s.13-1.48.35-2.14V7.02H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.98l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.48 6.16-4.48z" />
              </svg>
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-ink-500">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-primary-700">Terms</a> &{" "}
            <a href="/privacy" className="underline hover:text-primary-700">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </Container>
  );
}
