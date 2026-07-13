"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import type { Order } from "@/types/firestore";

type OrderInput = Omit<Order, "id" | "createdAt" | "orderStatus"> & {
  orderStatus?: Order["orderStatus"];
};

type OrdersContextValue = {
  orders: Order[];
  placeOrder: (input: OrderInput) => Order;
  getOrder: (id: string) => Order | undefined;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);
const STORAGE_KEY = "valmiki-orders";

function reviveOrder(order: Order): Order {
  return {
    ...order,
    createdAt: new Date(order.createdAt),
    updatedAt: order.updatedAt ? new Date(order.updatedAt) : undefined,
  };
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Order[] = JSON.parse(raw);
        setOrders(parsed.map(reviveOrder));
      }
    } catch {
      // ignore corrupted cache
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  const placeOrder = (input: OrderInput) => {
    const order: Order = {
      ...input,
      id: `VLM${Date.now().toString().slice(-8)}`,
      orderStatus: input.orderStatus ?? "confirmed",
      createdAt: new Date(),
    };
    setOrders((prev) => [order, ...prev]);

    // Save to Firestore so admin can see it
    const db = getDb();
    if (db) {
      addDoc(collection(db, "orders"), {
        ...order,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).catch(() => {});
    }

    return order;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  const value = useMemo<OrdersContextValue>(
    () => ({ orders, placeOrder, getOrder }),
    [orders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
