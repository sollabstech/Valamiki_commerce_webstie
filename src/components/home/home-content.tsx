"use client";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { useCatalog } from "@/hooks/use-catalog";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProductRail } from "@/components/home/product-rail";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

export function HomeContent() {
  const { banners, featured, bestsellers, newArrivals, loading } = useCatalog();

  if (loading) {
    return (
      <Container className="py-8">
        <div className="aspect-[16/9] animate-pulse rounded-2xl bg-primary-100 sm:aspect-[21/9]" />
      </Container>
    );
  }

  return (
    <div className="flex flex-col gap-10 py-6 sm:gap-14 sm:py-10">
      <Container>
        <HeroBanner banners={banners} />
      </Container>

      <Container>
        <Reveal as="section">
          <CategoryGrid />
        </Reveal>
      </Container>

      <Container>
        <Reveal as="section">
          <ProductRail title="Featured Products" subtitle="Hand-picked for you" products={featured} viewAllHref="/category/all?filter=featured" />
        </Reveal>
      </Container>

      <Container>
        <Reveal as="section">
          <ProductRail title="Best Sellers" subtitle="Loved by shoppers across Salem" products={bestsellers} viewAllHref="/category/all?filter=bestsellers" />
        </Reveal>
      </Container>

      <Container>
        <Reveal as="section">
          <ProductRail title="New Arrivals" subtitle="Freshly added to our catalog" products={newArrivals} viewAllHref="/category/all?filter=new" />
        </Reveal>
      </Container>

      <Container>
        <Reveal as="section">
          <Testimonials />
        </Reveal>
      </Container>

      <Container>
        <Reveal as="section">
          <Newsletter />
        </Reveal>
      </Container>
    </div>
  );
}
