"use client";

import { useState } from "react";
import { Truck, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function DeliveryEstimate() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<{ local: boolean; date: Date } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length !== 6) return;
    const local = pincode.trim().startsWith("636");
    const days = local ? 1 : 4;
    setResult({ local, date: new Date(Date.now() + days * 24 * 60 * 60 * 1000) });
  };

  return (
    <div className="rounded-lg border border-border bg-cream-100 p-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink-900">
        <Truck className="size-4.5 text-primary-700" /> Check delivery availability
      </p>
      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-500" />
          <input
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter pincode"
            inputMode="numeric"
            className="h-10 w-full rounded-lg border border-border-strong bg-white pl-9 pr-3 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <button
          type="submit"
          className="h-10 shrink-0 rounded-lg bg-primary-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
        >
          Check
        </button>
      </form>
      {result && (
        <p className="mt-2.5 text-sm text-ink-700">
          {result.local ? (
            <span className="font-medium text-success">
              Get it by tomorrow, {formatDate(result.date)} — delivering in Salem
            </span>
          ) : (
            <span>Estimated delivery by {formatDate(result.date)}</span>
          )}
        </p>
      )}
    </div>
  );
}
