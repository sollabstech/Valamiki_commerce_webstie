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
    <nav className="section-dark glass-dark fixed inset-x-0 bottom-0 z-30 border-t border-secondary-500/25 pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 py-2.5 transition-transform active:scale-90"
              >
                <span
                  className={cn(
                    "relative rounded-full px-3 py-1 transition-colors duration-300",
                    active && "bg-white/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5.5 transition-transform duration-300",
                      active
                        ? "-translate-y-px fill-secondary-500/25 text-secondary-300"
                        : "text-on-dark-muted"
                    )}
                    strokeWidth={active ? 2.25 : 1.75}
                  />
                  {!!item.badge && item.badge > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-gradient-gold text-[9px] font-bold text-on-accent">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    active ? "text-secondary-300" : "text-on-dark-muted"
                  )}
                >
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
