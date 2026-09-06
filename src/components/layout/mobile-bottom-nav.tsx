"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/categories", label: "Categories", icon: LayoutGrid },
    { href: "/cart", label: "Cart", icon: ShoppingCart, badge: itemCount },
    { href: "/wishlist", label: "Wishlist", icon: Heart, badge: wishlistCount },
    { href: "/account", label: "Account", icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-white/80 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_-8px_rgba(14,59,92,0.16)] backdrop-blur-xl backdrop-saturate-150 md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 py-2.5 text-ink-500 transition-transform active:scale-90"
              >
                <span
                  className={cn(
                    "relative rounded-full px-3 py-1 transition-colors duration-300",
                    active && "bg-primary-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5.5 transition-transform duration-300",
                      active ? "fill-primary-100 text-primary-700 -translate-y-px" : "text-ink-500"
                    )}
                    strokeWidth={active ? 2.25 : 1.75}
                  />
                  {!!item.badge && item.badge > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-secondary-500 text-[9px] font-bold text-primary-900">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </span>
                <span className={cn("text-[11px] font-medium", active ? "text-primary-700" : "text-ink-500")}>
                  {item.label}
                </span>
                {active && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-gradient-gold" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
