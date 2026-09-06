"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
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

/** Firestore doc -> Order, coping with Timestamp | string | Date shapes. */
function fromFirestore(data: Record<string, unknown>, docId: string): Order {
  const toDate = (v: unknown): Date | undefined => {
    if (!v) return undefined;
    if (typeof (v as { toDate?: () => Date }).toDate === "function") {
      return (v as { toDate: () => Date }).toDate();
    }
    const d = new Date(v as string | number | Date);
    return isNaN(d.getTime()) ? undefined : d;
  };
  return {
    ...(data as unknown as Order),
    id: (data.id as string) || docId,
    createdAt: toDate(data.createdAt) ?? new Date(),
    updatedAt: toDate(data.updatedAt),
  };
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Instant paint / offline: load whatever this browser saved last time.
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

  // Live source of truth: this user's orders in Firestore. Picks up status
  // changes (shipped / delivered / cancelled) made from the admin panel.
  useEffect(() => {
    const db = getDb();
    if (!db || !user?.uid) return;

    const q = query(collection(db, "orders"), where("userId", "==", user.uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const remote = snap.docs.map((d) => fromFirestore(d.data(), d.id));
        setOrders((prev) => {
          const remoteIds = new Set(remote.map((o) => o.id));
          const localOnly = prev.filter((o) => !remoteIds.has(o.id));
          return [...remote, ...localOnly].sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          );
        });
      },
      () => {
        // offline / rules error — keep the cached orders
      }
    );
    return unsub;
  }, [user?.uid]);

  const placeOrder = (input: OrderInput) => {
    const order: Order = {
      ...input,
      id: `VLM${Date.now().toString().slice(-8)}`,
      orderStatus: input.orderStatus ?? "confirmed",
      createdAt: new Date(),
    };
    setOrders((prev) => [order, ...prev]);

    // Save to Firestore so the admin can see it (and so status updates flow back).
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
