"use client";

import { useState } from "react";
import { Plus, MapPin, Check } from "lucide-react";
import { useAddresses } from "@/hooks/use-addresses";
import { AddressForm } from "@/components/checkout/address-form";
import { cn } from "@/lib/utils";
import type { Address } from "@/types/firestore";

export function AddressSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (address: Address) => void;
}) {
  const { addresses, addAddress } = useAddresses();
  const [showForm, setShowForm] = useState(addresses.length === 0);

  return (
    <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
      <h2 className="mb-4 text-base font-bold text-ink-900">Delivery Address</h2>

      {addresses.length > 0 && (
        <div className="mb-4 flex flex-col gap-3">
          {addresses.map((address) => (
            <button
              key={address.id}
              type="button"
              onClick={() => onSelect(address)}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors",
                selectedId === address.id
                  ? "border-primary-700 bg-primary-50"
                  : "border-border-strong hover:border-primary-300"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                  selectedId === address.id ? "border-primary-700 bg-primary-700" : "border-border-strong"
                )}
              >
                {selectedId === address.id && <Check className="size-3 text-white" />}
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink-900">{address.name}</span>
                  <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-medium text-ink-700">
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-medium text-secondary-800">
                      Default
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-sm text-ink-500">
                  {address.street}{address.addressLine2 ? `, ${address.addressLine2}` : ""}, {address.city}, {address.state} - {address.pincode}
                </span>
                <span className="mt-1 block text-sm text-ink-500">Phone: {address.phone}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {showForm ? (
        <div className="rounded-lg border border-border p-4">
          <AddressForm
            onSubmit={(values) => {
              const created = addAddress(values);
              onSelect(created);
              setShowForm(false);
            }}
            onCancel={addresses.length > 0 ? () => setShowForm(false) : undefined}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          <Plus className="size-4" /> Add new address
        </button>
      )}

      {addresses.length === 0 && !showForm && (
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-500">
          <MapPin className="size-4" /> No saved addresses yet.
        </p>
      )}
    </div>
  );
}
