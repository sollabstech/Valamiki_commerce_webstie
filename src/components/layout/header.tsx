"use client";

import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchBar } from "@/components/layout/search-bar";
import { Container } from "@/components/ui/container";
import { mainNav } from "@/config/nav";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
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
      className="relative flex size-10 items-center justify-center rounded-full text-primary-700 transition-colors hover:bg-primary-50"
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

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur-md">
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
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium text-ink-700 transition-colors hover:text-primary-700",
                    active && "font-semibold text-primary-700"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </div>
    </header>
  );
}
