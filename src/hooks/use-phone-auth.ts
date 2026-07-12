"use client";

import { useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

export const RECAPTCHA_CONTAINER_ID = "recaptcha-container";

function mapAuthError(e: unknown): string {
  const code = (e as { code?: string })?.code ?? "";
  if (code.includes("invalid-phone-number")) return "Enter a valid 10-digit mobile number.";
  if (code.includes("too-many-requests")) return "Too many attempts. Please try again later.";
  if (code.includes("invalid-verification-code")) return "Incorrect OTP. Please try again.";
  if (code.includes("operation-not-allowed"))
    return "Phone sign-in isn't enabled yet for this store. Please try Google sign-in.";
  return "Something went wrong. Please try again.";
}

export function usePhoneAuth() {
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const sendOtp = async (phoneNumber: string) => {
    setError(null);
    const auth = getFirebaseAuth();
    if (!auth || !isFirebaseConfigured()) {
      setError("Phone login isn't configured yet. Please try Google sign-in instead.");
      return false;
    }
    setSending(true);
    try {
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, RECAPTCHA_CONTAINER_ID, {
          size: "invisible",
        });
      }
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaRef.current);
      setConfirmation(result);
      return true;
    } catch (e) {
      setError(mapAuthError(e));
      return false;
    } finally {
      setSending(false);
    }
  };

  const verifyOtp = async (code: string) => {
    setError(null);
    if (!confirmation) {
      setError("Please request a new OTP.");
      return false;
    }
    setVerifying(true);
    try {
      await confirmation.confirm(code);
      return true;
    } catch (e) {
      setError(mapAuthError(e));
      return false;
    } finally {
      setVerifying(false);
    }
  };

  return { sendOtp, verifyOtp, sending, verifying, error, otpSent: !!confirmation };
}
