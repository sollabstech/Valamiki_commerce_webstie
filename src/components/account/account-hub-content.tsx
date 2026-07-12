"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  User,
  MapPin,
  Package,
  Heart,
  Bell,
  Gift,
  Share2,
  Sparkles,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { formatPrice } from "@/lib/utils";

const links = [
  { href: "/orders", label: "My Orders", icon: Package },
  { href: "/account/addresses", label: "Saved Addresses", icon: MapPin },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/profile", label: "Profile Settings", icon: User },
];

export function AccountHubContent() {
  const { user, signOutUser } = useAuth();
  const { orders } = useOrders();

  const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const loyaltyPoints = Math.floor(totalSpent / 10);
  const referralCode = `VLM${(user?.uid ?? "GUEST").slice(-6).toUpperCase()}`;

  const handleShareReferral = () => {
    const message = `Join Valmiki Online Service and get great deals on groceries & stationery! Use my code ${referralCode} — https://www.valmikionline.in`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleLogout = async () => {
    await signOutUser();
    toast.success("Logged out successfully");
  };

  return (
    <Container className="py-6 sm:py-8">
      <div className="mb-6 flex items-center gap-4 rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
          {(user?.displayName ?? user?.phoneNumber ?? "U").slice(0, 1).toUpperCase()}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-ink-900">{user?.displayName || "Valmiki Customer"}</p>
          <p className="text-sm text-ink-500">{user?.phoneNumber || user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg border border-border-strong px-3 py-2 text-sm font-medium text-ink-700 hover:bg-cream-100"
        >
          <LogOut className="size-4" /> Logout
        </button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 p-5 text-primary-900 shadow-soft">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/30">
            <Sparkles className="size-6" />
          </span>
          <div>
            <p className="text-sm font-medium opacity-80">Loyalty Points</p>
            <p className="text-2xl font-bold">{loyaltyPoints} pts</p>
            <p className="text-xs opacity-80">Earned from {formatPrice(totalSpent)} spent</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg bg-primary-800 p-5 text-white shadow-soft">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Gift className="size-6" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium opacity-80">Your Referral Code</p>
            <p className="text-lg font-bold tracking-wide">{referralCode}</p>
          </div>
          <button
            onClick={handleShareReferral}
            aria-label="Share referral code"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
          >
            <Share2 className="size-4" />
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-surface shadow-soft ring-1 ring-border">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-5 py-4 hover:bg-cream-100 ${
                i !== links.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <Icon className="size-4.5 text-primary-700" />
              <span className="flex-1 text-sm font-medium text-ink-900">{link.label}</span>
              <ChevronRight className="size-4 text-ink-300" />
            </Link>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-cream-100 p-4 text-sm text-ink-700">
        <Bell className="size-4.5 shrink-0 text-primary-700" />
        Notifications for order updates and offers will appear here once you place an order.
      </div>
    </Container>
  );
}
