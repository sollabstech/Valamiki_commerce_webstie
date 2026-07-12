"use client";

import { Smartphone, CreditCard, Landmark, Wallet, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaymentMethodType } from "@/lib/payments";

const methods: { value: PaymentMethodType; label: string; icon: typeof Smartphone; hint: string }[] = [
  { value: "upi", label: "UPI", icon: Smartphone, hint: "Google Pay, PhonePe, Paytm & more" },
  { value: "card", label: "Cards", icon: CreditCard, hint: "Credit or Debit card" },
  { value: "netbanking", label: "Net Banking", icon: Landmark, hint: "All major banks" },
  { value: "wallet", label: "Wallets", icon: Wallet, hint: "Paytm, Amazon Pay & more" },
  { value: "cod", label: "Cash on Delivery", icon: Banknote, hint: "Pay when your order arrives" },
];

export function PaymentMethodSelector({
  value,
  onChange,
  codEnabled = true,
}: {
  value: PaymentMethodType | null;
  onChange: (value: PaymentMethodType) => void;
  codEnabled?: boolean;
}) {
  return (
    <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
      <h2 className="mb-1 text-base font-bold text-ink-900">Payment Method</h2>
      <p className="mb-4 text-xs text-ink-500">Secured by Razorpay</p>

      <div className="flex flex-col gap-2.5">
        {methods
          .filter((m) => m.value !== "cod" || codEnabled)
          .map((method) => {
            const Icon = method.icon;
            const selected = value === method.value;
            return (
              <button
                key={method.value}
                type="button"
                onClick={() => onChange(method.value)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3.5 text-left transition-colors",
                  selected ? "border-primary-700 bg-primary-50" : "border-border-strong hover:border-primary-300"
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full",
                    selected ? "bg-primary-700 text-white" : "bg-cream-100 text-ink-700"
                  )}
                >
                  <Icon className="size-4.5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-ink-900">{method.label}</span>
                  <span className="block text-xs text-ink-500">{method.hint}</span>
                </span>
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                    selected ? "border-primary-700 bg-primary-700" : "border-border-strong"
                  )}
                >
                  {selected && <span className="size-2 rounded-full bg-white" />}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
}
