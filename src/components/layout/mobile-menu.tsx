"use client";

import Link from "next/link";
import { Menu, User, Heart, Package, MapPin, Phone, Tag } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { useCatalog } from "@/hooks/use-catalog";

export function MobileMenu() {
  const { categories } = useCatalog();

  const link =
    "flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-on-dark transition-colors hover:bg-white/10 hover:text-secondary-300";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex size-10 items-center justify-center rounded-full text-on-dark transition-colors hover:bg-white/10 hover:text-secondary-300"
        >
          <Menu className="size-5.5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="section-dark bg-dark-900 p-0">
        <div className="border-b border-white/10 p-4 pt-6">
          <Logo />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <p className="eyebrow mb-2 px-2">Shop by category</p>
          <ul className="mb-4 space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <SheetClose asChild>
                  <Link href={`/category/${category.id}`} className={link}>
                    <span className="flex size-5 shrink-0 items-center justify-center text-secondary-400">
                      {category.icon?.startsWith("http") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={category.icon} alt="" className="size-5 rounded object-cover" />
                      ) : category.icon ? (
                        <span className="text-base leading-none">{category.icon}</span>
                      ) : (
                        <Tag className="size-4.5" />
                      )}
                    </span>
                    {category.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>

          <div className="mb-4 h-px bg-white/10" />

          <ul className="space-y-1">
            <li>
              <SheetClose asChild>
                <Link href="/account" className={link}>
                  <User className="size-4.5 text-secondary-400" /> My Account
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link href="/wishlist" className={link}>
                  <Heart className="size-4.5 text-secondary-400" /> Wishlist
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link href="/orders" className={link}>
                  <Package className="size-4.5 text-secondary-400" /> Orders
                </Link>
              </SheetClose>
            </li>
          </ul>
        </nav>

        <div className="space-y-2 border-t border-white/10 p-4 text-sm text-on-dark-muted">
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-secondary-400" />
            {siteConfig.address.line2}, {siteConfig.address.city} - {siteConfig.address.pincode}
          </p>
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 transition-colors hover:text-secondary-300">
            <Phone className="size-4 shrink-0 text-secondary-400" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
