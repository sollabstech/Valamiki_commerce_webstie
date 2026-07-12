"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { AddressesProvider } from "@/hooks/use-addresses";
import { OrdersProvider } from "@/hooks/use-orders";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AddressesProvider>
            <OrdersProvider>
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    background: "var(--color-surface)",
                    color: "var(--color-ink-900)",
                    border: "1px solid var(--color-border)",
                  },
                }}
              />
            </OrdersProvider>
          </AddressesProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
