"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronLeft, Plus, Pencil, Trash2, MapPin, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AddressForm } from "@/components/checkout/address-form";
import { useAddresses } from "@/hooks/use-addresses";
import type { Address } from "@/types/firestore";

export function AddressesContent() {
  const { addresses, addAddress, updateAddress, removeAddress, setDefaultAddress } = useAddresses();
  const [editing, setEditing] = useState<Address | "new" | null>(null);

  const handleSubmit = (values: Omit<Address, "id">) => {
    if (editing === "new") {
      addAddress(values);
      toast.success("Address added");
    } else if (editing) {
      updateAddress(editing.id, values);
      toast.success("Address updated");
    }
    setEditing(null);
  };

  return (
    <Container className="py-6 sm:py-8">
      <Link href="/account" className="mb-4 flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-secondary-600">
        <ChevronLeft className="size-4" /> Back to Account
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Saved Addresses</h1>
        {editing === null && (
          <button
            onClick={() => setEditing("new")}
            className="flex items-center gap-1.5 rounded-lg bg-primary-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-primary-800"
          >
            <Plus className="size-4" /> Add New
          </button>
        )}
      </div>

      {editing !== null && (
        <div className="mt-5 max-w-md rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
          <h2 className="mb-4 text-base font-bold text-ink-900">
            {editing === "new" ? "Add New Address" : "Edit Address"}
          </h2>
          <AddressForm
            initial={editing === "new" ? undefined : editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3">
        {addresses.length === 0 && editing === null && (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-surface py-14 text-center shadow-soft ring-1 ring-border">
            <MapPin className="size-9 text-ink-300" />
            <p className="text-sm text-ink-500">No saved addresses yet.</p>
          </div>
        )}
        {addresses.map((address) => (
          <div key={address.id} className="rounded-lg bg-surface p-4 shadow-soft ring-1 ring-border">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink-900">{address.name}</span>
                  <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-medium text-ink-700">
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-medium text-secondary-800">
                      Default
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-500">
                  {address.street}{address.addressLine2 ? `, ${address.addressLine2}` : ""}, {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="mt-1 text-sm text-ink-500">Phone: {address.phone}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                {!address.isDefault && (
                  <button
                    aria-label="Set as default"
                    onClick={() => setDefaultAddress(address.id)}
                    className="flex size-8 items-center justify-center rounded-lg border border-border-strong text-ink-700 hover:bg-cream-100"
                  >
                    <Star className="size-4" />
                  </button>
                )}
                <button
                  aria-label="Edit address"
                  onClick={() => setEditing(address)}
                  className="flex size-8 items-center justify-center rounded-lg border border-border-strong text-ink-700 hover:bg-cream-100"
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  aria-label="Delete address"
                  onClick={() => removeAddress(address.id)}
                  className="flex size-8 items-center justify-center rounded-lg border border-border-strong text-error hover:bg-error-bg"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
