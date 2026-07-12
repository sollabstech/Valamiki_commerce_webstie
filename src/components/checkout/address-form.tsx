"use client";

import { useState } from "react";
import type { Address } from "@/types/firestore";

type AddressFormValues = Omit<Address, "id">;

const emptyForm: AddressFormValues = {
  name: "",
  phone: "",
  street: "",
  addressLine2: "",
  city: "Salem",
  state: "Tamil Nadu",
  pincode: "",
  type: "Home",
  isDefault: false,
};

export function AddressForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: AddressFormValues;
  onSubmit: (values: AddressFormValues) => void;
  onCancel?: () => void;
}) {
  const [values, setValues] = useState<AddressFormValues>(initial ?? emptyForm);

  const update = <K extends keyof AddressFormValues>(key: K, value: AddressFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.phone || !values.street || values.pincode.length !== 6) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Full name"
          className="h-11 rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        <input
          required
          value={values.phone}
          onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="Phone number"
          inputMode="numeric"
          className="h-11 rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      </div>
      <input
        required
        value={values.street}
        onChange={(e) => update("street", e.target.value)}
        placeholder="House no., street, area"
        className="h-11 rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
      />
      <input
        value={values.addressLine2 ?? ""}
        onChange={(e) => update("addressLine2", e.target.value)}
        placeholder="Landmark (optional)"
        className="h-11 rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
      />
      <div className="grid grid-cols-3 gap-3">
        <input
          required
          value={values.city}
          onChange={(e) => update("city", e.target.value)}
          placeholder="City"
          className="h-11 rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        <input
          required
          value={values.state}
          onChange={(e) => update("state", e.target.value)}
          placeholder="State"
          className="h-11 rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        <input
          required
          value={values.pincode}
          onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Pincode"
          inputMode="numeric"
          className="h-11 rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {(["Home", "Work", "Other"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update("type", type)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                values.type === type
                  ? "border-primary-700 bg-primary-50 text-primary-700"
                  : "border-border-strong text-ink-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-ink-700">
          <input
            type="checkbox"
            checked={values.isDefault}
            onChange={(e) => update("isDefault", e.target.checked)}
            className="size-4 accent-primary-700"
          />
          Set as default
        </label>
      </div>

      <div className="mt-2 flex gap-3">
        <button
          type="submit"
          className="h-11 flex-1 rounded-lg bg-primary-700 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
        >
          Save Address
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="h-11 rounded-lg border border-border-strong px-5 text-sm font-medium text-ink-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
