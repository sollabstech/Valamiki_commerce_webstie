import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck, Truck, RotateCcw, Headset } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { categories } from "@/config/nav";
import { siteConfig } from "@/config/site";

const trustBadges = [
  { icon: Truck, label: "Same-day delivery in Salem" },
  { icon: ShieldCheck, label: "100% genuine products" },
  { icon: RotateCcw, label: "Easy 7-day returns" },
  { icon: Headset, label: "WhatsApp support" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white pb-24 md:pb-0">
      <div className="h-1 w-full bg-gradient-gold" />
      <Container className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4 sm:py-12">
        {trustBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-primary-50/60"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 shadow-soft ring-1 ring-primary-100 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-medium text-ink-700">{badge.label}</span>
            </div>
          );
        })}
      </Container>

      <div className="border-t border-border">
        <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-500">{siteConfig.description}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Shop</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`} className="text-sm text-ink-500 hover:text-primary-700">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/orders" className="text-sm text-ink-500 hover:text-primary-700">Track your order</Link></li>
              <li><Link href="/account" className="text-sm text-ink-500 hover:text-primary-700">My account</Link></li>
              <li><Link href="/wishlist" className="text-sm text-ink-500 hover:text-primary-700">Wishlist</Link></li>
              <li><Link href="/about#faq" className="text-sm text-ink-500 hover:text-primary-700">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Contact us</h3>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-700" />
                <span>
                  {siteConfig.address.line1}, {siteConfig.address.line2},<br />
                  {siteConfig.address.city}, {siteConfig.address.state} - {siteConfig.address.pincode}
                </span>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-primary-700">
                  <Phone className="size-4 shrink-0 text-primary-700" /> {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-primary-700">
                  <Mail className="size-4 shrink-0 text-primary-700" /> {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </div>

      <div className="border-t border-border py-5">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-700">Terms of Service</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
