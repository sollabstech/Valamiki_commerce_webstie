"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Address } from "@/types/firestore";

type AddressInput = Omit<Address, "id">;

type AddressesContextValue = {
  addresses: Address[];
  defaultAddress: Address | null;
  addAddress: (input: AddressInput) => Address;
  updateAddress: (id: string, input: AddressInput) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
};

const AddressesContext = createContext<AddressesContextValue | null>(null);
const STORAGE_KEY = "valmiki-addresses";

export function AddressesProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAddresses(JSON.parse(raw));
    } catch {
      // ignore corrupted cache
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses, hydrated]);

  const addAddress = (input: AddressInput) => {
    const newAddress: Address = { ...input, id: `addr_${Date.now()}` };
    setAddresses((prev) => {
      const makeDefault = newAddress.isDefault || prev.length === 0;
      const updated = makeDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev;
      return [...updated, { ...newAddress, isDefault: makeDefault }];
    });
    return newAddress;
  };

  const updateAddress = (id: string, input: AddressInput) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) return { ...input, id };
        return input.isDefault ? { ...a, isDefault: false } : a;
      })
    );
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const value = useMemo<AddressesContextValue>(() => {
    const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0] ?? null;
    return { addresses, defaultAddress, addAddress, updateAddress, removeAddress, setDefaultAddress };
  }, [addresses]);

  return <AddressesContext.Provider value={value}>{children}</AddressesContext.Provider>;
}

export function useAddresses() {
  const ctx = useContext(AddressesContext);
  if (!ctx) throw new Error("useAddresses must be used within AddressesProvider");
  return ctx;
}
