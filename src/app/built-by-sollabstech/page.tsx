import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Mail,
  Code2,
  ShoppingCart,
  Smartphone,
  LayoutDashboard,
  Shield,
  Package,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  MessageCircle,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Built by Sollabstech",
  description:
    "Valmiki's e-commerce platform — designed, built, and deployed by Sollabstech, a software development studio from India.",
  openGraph: {
    title: "Built by Sollabstech | Valmiki",
    description:
      "Valmiki's e-commerce platform was designed, built, and deployed by Sollabstech.",
  },
};

const features = [
  {
    icon: Shield,
    title: "Phone OTP Login",
    description:
      "Secure Firebase authentication — no passwords needed. Customers sign in with a one-time code sent to their phone.",
  },
  {
    icon: ShoppingCart,
    title: "Product Catalogue",
    description:
      "Browse hundreds of groceries and stationery items by category or search. Filtered listings with fast, real-time results.",
  },
  {
    icon: Package,
    title: "Cart & Wishlist",
    description:
      "Save items to wishlist, manage cart quantities, and checkout seamlessly — all synced to the user's account.",
  },
  {
    icon: CreditCard,
    title: "Razorpay + COD Payments",
    description:
      "Customers can pay securely online via Razorpay or choose Cash on Delivery — whatever suits them best.",
  },
  {
    icon: Truck,
    title: "Order Tracking",
    description:
      "Real-time order status updates with a full order history, printable receipts, and delivery confirmation.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description:
      "One-tap customer support via WhatsApp — customers reach the store directly without leaving the app.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description:
      "A dedicated admin panel to manage products, orders, banners, users, offers, and store settings in real time.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First UI",
    description:
      "Bottom navigation, swipe-friendly carousels, and tap-optimised product cards — built for how people actually shop.",
  },
];

const stack = [
  { label: "Next.js 16", sublabel: "App Router + RSC" },
  { label: "React 19", sublabel: "UI Layer" },
  { label: "Tailwind CSS v4", sublabel: "Styling" },
  { label: "Firebase v12", sublabel: "Auth + Firestore" },
  { label: "Phone OTP", sublabel: "Firebase Auth" },
  { label: "Razorpay + COD", sublabel: "Payments" },
  { label: "Lucide React", sublabel: "Icon System" },
  { label: "Embla Carousel", sublabel: "Animations" },
  { label: "Vercel", sublabel: "Deployment" },
  { label: "TypeScript", sublabel: "Type Safety" },
];

const deliverables = [
  "Customer-facing e-commerce website",
  "Admin panel (separate app)",
  "Firebase Firestore data layer",
  "Razorpay + Cash on Delivery payments",
  "Phone OTP authentication",
  "Product & category management",
  "Order tracking & print receipts",
  "WhatsApp customer support integration",
  "Mobile-first responsive UI",
  "SEO metadata & Open Graph tags",
];

export default function BuiltBySollabstechPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden">
        {/* top gold line */}
        <div className="h-0.5 w-full bg-gradient-gold" />

        {/* background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, #c49a54 0%, transparent 70%)",
          }}
        />

        <Container className="relative py-20 sm:py-28 text-center">
          {/* eyebrow */}
          <span className="eyebrow mb-5 block">A Sollabstech Project</span>

          {/* headline */}
          <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Built with care by{" "}
            <span
              className="bg-gradient-gold-soft bg-clip-text"
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Sollabstech
            </span>
          </h1>

          <div className="mx-auto mt-5 h-px w-16 bg-gradient-gold" aria-hidden />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-on-dark-muted sm:text-lg">
            <strong className="font-semibold text-on-dark">Valmiki Online Service</strong> is
            Salem&apos;s go-to destination for groceries and stationery, delivered right to your
            doorstep. Browse hundreds of products across categories, add to cart, and check out
            in minutes. Built for local families who want everyday essentials without stepping
            out. Fast delivery, easy returns, and prices that make sense.
          </p>

          {/* client + agency cards */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {/* client */}
            <div
              className="glass-dark flex w-full max-w-xs items-center gap-4 rounded-2xl px-5 py-4 text-left"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-900/50">
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-on-dark-muted">
                  Client
                </p>
                <p className="font-display text-base font-bold text-on-dark">
                  {siteConfig.legalName}
                </p>
                <a
                  href={siteConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-secondary-400 hover:text-secondary-300 transition-colors"
                >
                  {siteConfig.url.replace("https://", "")}
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>

            {/* divider arrow */}
            <div className="hidden sm:flex h-px w-8 items-center">
              <div className="h-px w-full bg-gradient-gold opacity-50" />
            </div>

            {/* agency */}
            <div
              className="glass-dark flex w-full max-w-xs items-center gap-4 rounded-2xl px-5 py-4 text-left"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-gold-soft">
                <Code2 className="size-5 text-on-accent" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-on-dark-muted">
                  Developed by
                </p>
                <p className="font-display text-base font-bold text-on-dark">Sollabstech</p>
                <a
                  href="https://sollabstech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-secondary-400 hover:text-secondary-300 transition-colors"
                >
                  sollabstech.com
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/* bottom gold line */}
        <div className="h-px w-full bg-gradient-gold opacity-20" />
      </section>

      {/* ── What we built ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="mb-12 text-center">
            <span className="eyebrow mb-3 block">Features</span>
            <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
              What Sollabstech built
            </h2>
            <div className="mx-auto mt-4 h-px w-14 bg-gradient-gold" aria-hidden />
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-500">
              A production-grade e-commerce platform, from database to deployment,
              designed for a local grocery and stationery business to serve Salem and
              surrounding areas.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-medium"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-gold-soft shadow-gold/30">
                  <Icon className="size-5 text-on-accent" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-900">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Deliverables ──────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-cream-100 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <span className="eyebrow mb-3 block">Scope of Work</span>
              <h2 className="font-display text-3xl font-semibold text-ink-900">
                Everything delivered
              </h2>
              <div className="mx-auto mt-4 h-px w-14 bg-gradient-gold" aria-hidden />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3.5 shadow-soft"
                >
                  <CheckCircle2 className="size-4.5 shrink-0 text-secondary-600" />
                  <span className="text-sm font-medium text-ink-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Tech Stack ────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <div className="mb-10 text-center">
            <span className="eyebrow mb-3 block">Technology</span>
            <h2 className="font-display text-3xl font-semibold text-ink-900">
              Built on a modern stack
            </h2>
            <div className="mx-auto mt-4 h-px w-14 bg-gradient-gold" aria-hidden />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {stack.map(({ label, sublabel }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-0.5 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft"
              >
                <span className="font-display text-sm font-bold text-ink-900">{label}</span>
                <span className="text-[11px] font-medium text-ink-500">{sublabel}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA / Agency info ─────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden">
        <div className="h-px w-full bg-gradient-gold opacity-20" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 110%, #c49a54 0%, transparent 70%)",
          }}
        />

        <Container className="relative py-20 sm:py-24 text-center">
          <span className="eyebrow mb-5 block">Need a website?</span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Work with{" "}
            <span
              className="bg-gradient-gold-soft bg-clip-text"
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Sollabstech
            </span>
          </h2>
          <div className="mx-auto mt-4 h-px w-14 bg-gradient-gold" aria-hidden />

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-on-dark-muted sm:text-base">
            We build web apps, mobile apps, and admin dashboards for businesses
            across India. From concept to deployment — get in touch and let&apos;s
            build something together.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://sollabstech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold-soft px-7 py-3 text-sm font-bold text-on-accent shadow-gold transition-opacity hover:opacity-90"
            >
              <Globe className="size-4" />
              sollabstech.com
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="mailto:sollabstech@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-on-dark transition-colors hover:border-secondary-400/40 hover:text-secondary-300"
            >
              <Mail className="size-4" />
              sollabstech@gmail.com
            </a>
          </div>

          {/* back to store */}
          <div className="mt-14 border-t border-white/10 pt-10">
            <p className="mb-4 text-xs text-on-dark-muted">You&apos;re viewing an attribution page.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-400 transition-colors hover:text-secondary-300"
            >
              ← Back to {siteConfig.name}
            </Link>
          </div>
        </Container>

        <div className="h-0.5 w-full bg-gradient-gold" />
      </section>
    </>
  );
}
