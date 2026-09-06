"use client";

import { Smartphone, CreditCard, Landmark, Wallet, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaymentMethodType } from "@/lib/payments";

const methods: { value: PaymentMethodType; label: string; icon: typeof Smartphone; hint: string }[] = [
  { value: "upi", label: "UPI / QR Pay", icon: Smartphone, hint: "Google Pay, PhonePe, Paytm & more" },
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
      <p className="mb-4 text-xs text-ink-500">Choose how you&apos;d like to pay</p>

      <div className="flex flex-col gap-2.5">
        {methods
          .filter((m) => m.value !== "cod" || codEnabled)
          .map((method) => {
            const Icon = method.icon;
            const selected = value === method.value;
            return (
              <div key={method.value}>
                <button
                  type="button"
                  onClick={() => onChange(method.value)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition-colors",
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
                    {selected && <span className="size-2 rounded-full bg-surface" />}
                  </span>
                </button>

                {/* UPI QR Panel — shown when UPI is selected */}
                {method.value === "upi" && selected && (
                  <div className="mt-2 rounded-xl border border-primary-200 bg-surface p-5 text-center shadow-sm">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500">Scan &amp; Pay</p>
                    <p className="mb-3 text-sm font-bold text-ink-900">VALMIKI ONLINE SERVICE</p>

                    {/* QR Code Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/upi-qr.png"
                      alt="UPI QR Code — scan to pay"
                      className="mx-auto mb-3 w-52 rounded-lg border border-gray-100 shadow-sm"
                    />

                    {/* UPI ID */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 text-xs font-mono text-ink-700 ring-1 ring-border">
                      UPI: 9994724733@okbizaxis
                    </div>

                    {/* Payment app badges */}
                    <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                      {["G Pay", "PhonePe", "Paytm", "BHIM"].map(app => (
                        <span key={app} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-semibold text-ink-600">{app}</span>
                      ))}
                    </div>

                    <p className="mt-3 text-[11px] text-ink-400">
                      After payment, take a screenshot and keep it for reference.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
