"use client";

import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchBar } from "@/components/layout/search-bar";
import { Container } from "@/components/ui/container";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCategories } from "@/hooks/use-categories";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function IconLink({
  href,
  label,
  icon,
  count,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex size-10 items-center justify-center rounded-full text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-soft active:scale-95"
    >
      {icon}
      {!!count && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-primary-900">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const pathname = usePathname();
  const categories = useCategories();

  const navItems = [
    { label: "Home", href: "/" },
    ...categories.map((c) => ({ label: c.name, href: `/category/${c.id}` })),
  ];

  return (
    <header className="glass sticky top-0 z-30 border-x-0 border-t-0 border-b border-secondary-500/25 !bg-white/70 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_10px_30px_-14px_rgba(14,59,92,0.22)] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-gradient-gold after:opacity-60 after:content-['']">
      <Container className="flex h-16 items-center gap-3 sm:h-20">
        <div className="flex items-center gap-1 md:hidden">
          <MobileMenu />
        </div>

        <Logo />

        <div className="hidden flex-1 md:block">
          <SearchBar className="max-w-xl" />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <IconLink href="/wishlist" label="Wishlist" icon={<Heart className="size-5" />} count={wishlistCount} />
          </div>
          <div className="hidden md:block">
            <IconLink href="/account" label="Account" icon={<User className="size-5" />} />
          </div>
          <IconLink href="/cart" label="Cart" icon={<ShoppingCart className="size-5" />} count={itemCount} />
        </div>
      </Container>

      <div className="border-t border-border px-4 pb-3 pt-2 md:hidden">
        <SearchBar />
      </div>

      <div className="hidden border-t border-border md:block">
        <Container>
          <nav className="flex h-11 items-center justify-center gap-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative py-1 text-sm font-medium text-ink-700 transition-colors hover:text-primary-700",
                    active && "font-semibold text-primary-700"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-gold transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </Container>
      </div>
    </header>
  );
}
