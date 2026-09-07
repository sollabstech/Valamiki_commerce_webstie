"use client";

import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useCatalog } from "@/hooks/use-catalog";
import { HeroBanner } from "@/components/home/hero-banner";
import { TrustBar } from "@/components/home/trust-bar";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProductRail } from "@/components/home/product-rail";
import { PromoBanner, type PromoBannerProps } from "@/components/home/promo-banner";
import { ImageBanner } from "@/components/home/image-banner";
import { WhyValmiki } from "@/components/home/why-valmiki";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

const PROMOS: Record<string, PromoBannerProps> = {
  featured: {
    eyebrow: "Weekly essentials",
    title: "Stock up and save every week",
    subtitle:
      "The staples you buy again and again — bundled at everyday-low prices, delivered the same day.",
    ctaText: "Shop best value",
    ctaHref: "/category/all?filter=bestsellers",
  },
};

export function HomeContent() {
  const { banners, featured, bestsellers, newArrivals, loading } = useCatalog();

  if (loading) {
    return (
      <Container className="py-16">
        <div className="aspect-[16/9] animate-pulse rounded-2xl bg-primary-100 sm:aspect-[21/9]" />
      </Container>
    );
  }

  // Only rails that actually have products — no empty bands.
  const rails = [
    {
      id: "featured",
      title: "Featured Products",
      eyebrow: "Handpicked for you",
      products: featured,
      viewAllHref: "/category/all?filter=featured",
    },
    {
      id: "bestsellers",
      title: "Best Sellers",
      eyebrow: "Loved across Salem",
      products: bestsellers,
      viewAllHref: "/category/all?filter=bestsellers",
    },
    {
      id: "new",
      title: "New Arrivals",
      eyebrow: "Fresh on the shelf",
      products: newArrivals,
      viewAllHref: "/category/all?filter=new",
    },
  ].filter((r) => r.products.length > 0);

  // Alternate dark / cream across content bands (categories is cream).
  let isDark = false;
  const nextTone = (): "dark" | "cream" => {
    isDark = !isDark;
    return isDark ? "dark" : "cream";
  };

  return (
    <div>
      <HeroBanner banners={banners} />
      <TrustBar />

      <Section tone="cream" className="pt-16 sm:pt-24">
        <Reveal>
          <CategoryGrid />
        </Reveal>
      </Section>

      {rails.map(({ id, ...rail }) => (
        <Fragment key={id}>
          <Section tone={nextTone()}>
            <Reveal>
              <ProductRail {...rail} />
            </Reveal>
          </Section>
          {PROMOS[id] && (
            <Section tone="cream" className="py-6 sm:py-8">
              <Reveal>
                <PromoBanner {...PROMOS[id]} />
              </Reveal>
            </Section>
          )}
          {id === "new" && banners.length > 0 && (
            <Section tone="cream" className="py-6 sm:py-8">
              <Reveal>
                <ImageBanner banner={banners[1] ?? banners[0]} />
              </Reveal>
            </Section>
          )}
        </Fragment>
      ))}

      <Section tone={nextTone()}>
        <Reveal>
          <WhyValmiki />
        </Reveal>
      </Section>

      <Section tone="surface">
        <Reveal>
          <Testimonials />
        </Reveal>
      </Section>

      <Section tone="dark">
        <Reveal>
          <Newsletter />
        </Reveal>
      </Section>
    </div>
  );
}
