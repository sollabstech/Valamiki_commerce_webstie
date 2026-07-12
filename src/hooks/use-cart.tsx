"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { effectivePrice, type Product } from "@/types/firestore";
import {
  findCoupon,
  calculateDiscount,
  GIFT_WRAP_FEE,
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  type Coupon,
} from "@/config/coupons";

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  coupon: Coupon | null;
  discount: number;
  giftWrap: boolean;
  giftMessage: string;
  giftWrapFee: number;
  deliveryFee: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setGiftWrap: (value: boolean) => void;
  setGiftMessage: (value: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "valmiki-cart";
const META_STORAGE_KEY = "valmiki-cart-meta";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartLine[] = JSON.parse(raw);
        setLines(
          parsed.map((l) => ({
            ...l,
            product: { ...l.product, createdAt: new Date(l.product.createdAt) },
          }))
        );
      }
      const rawMeta = window.localStorage.getItem(META_STORAGE_KEY);
      if (rawMeta) {
        const meta = JSON.parse(rawMeta);
        if (meta.couponCode) setCoupon(findCoupon(meta.couponCode) ?? null);
        if (meta.giftWrap) setGiftWrap(true);
        if (meta.giftMessage) setGiftMessage(meta.giftMessage);
      }
    } catch {
      // ignore corrupted cache
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      META_STORAGE_KEY,
      JSON.stringify({ couponCode: coupon?.code ?? null, giftWrap, giftMessage })
    );
  }, [coupon, giftWrap, giftMessage, hydrated]);

  const addItem = (product: Product, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  };

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    setLines((prev) =>
      prev.map((l) => (l.product.id === productId ? { ...l, quantity } : l))
    );
  };

  const clear = () => {
    setLines([]);
    setCoupon(null);
    setGiftWrap(false);
    setGiftMessage("");
  };

  const applyCoupon = (code: string) => {
    const found = findCoupon(code);
    if (!found) return false;
    setCoupon(found);
    return true;
  };

  const removeCoupon = () => setCoupon(null);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = lines.reduce(
      (sum, l) => sum + effectivePrice(l.product) * l.quantity,
      0
    );
    const discount = coupon ? calculateDiscount(coupon, subtotal) : 0;
    const giftWrapFee = giftWrap ? GIFT_WRAP_FEE : 0;
    const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const total = Math.max(0, subtotal - discount) + giftWrapFee + deliveryFee;

    return {
      lines,
      hydrated,
      itemCount,
      subtotal,
      coupon,
      discount,
      giftWrap,
      giftMessage,
      giftWrapFee,
      deliveryFee,
      total,
      addItem,
      removeItem,
      setQuantity,
      clear,
      applyCoupon,
      removeCoupon,
      setGiftWrap,
      setGiftMessage,
    };
  }, [lines, hydrated, coupon, giftWrap, giftMessage]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
