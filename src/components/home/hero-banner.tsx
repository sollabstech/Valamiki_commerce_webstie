"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Banner } from "@/types/firestore";
import { cn } from "@/lib/utils";

function bannerHref(banner: Banner) {
  if (!banner.linkType || !banner.linkValue) return "/categories";
  if (banner.linkType === "category") return `/category/${banner.linkValue}`;
  if (banner.linkType === "route") return banner.linkValue;
  return "/categories";
}

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const withImages = banners.filter((b) => b.imageUrl);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="section-dark on-dark-grid relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-1/2 size-[34rem] -translate-y-1/2 rounded-full bg-secondary-500/12 blur-[120px]" />
      <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-8">
        {/* Copy */}
        <div className="animate-fade-up max-w-xl">
          <span className="eyebrow">Your neighbourhood store, online</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-on-dark sm:text-5xl md:text-[3.4rem]">
            Groceries &amp; Stationery.
            <span className="mt-1 block italic text-secondary-300">Delivered fast.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-on-dark-muted sm:text-base">
            Everyday essentials and school supplies from Valmiki, Salem — genuine
            brands, fair prices, same-day delivery.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/category/all">
                Shop now <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-on-dark">
              <Link href="/categories">Browse categories</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-on-dark-muted">
            <span className="flex items-center gap-0.5 text-secondary-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span>4.8/5 from shoppers across Salem</span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="rounded-2xl bg-gradient-gold p-[3px] shadow-dark">
            <div
              className="overflow-hidden rounded-[0.95rem] bg-dark-800"
              ref={emblaRef}
            >
              <div className="flex">
                {(withImages.length > 0 ? withImages : [null]).map((banner, i) => (
                  <div key={banner?.id ?? i} className="relative min-w-0 flex-[0_0_100%]">
                    {banner ? (
                      <Link
                        href={bannerHref(banner)}
                        className="group relative block aspect-[4/3] overflow-hidden sm:aspect-[16/11]"
                      >
                        <Image
                          src={banner.imageUrl}
                          alt={banner.title}
                          fill
                          priority={i === 0}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        {banner.title && (
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="font-display text-lg font-semibold text-white">
                              {banner.title}
                            </p>
                          </div>
                        )}
                      </Link>
                    ) : (
                      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-dark sm:aspect-[16/11]">
                        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_20%,var(--color-secondary-500)_1px,transparent_1px)] [background-size:26px_26px]" />
                        <span className="relative font-display text-2xl italic text-secondary-300">
                          Valmiki
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {withImages.length > 1 && (
            <div className="mt-4 flex justify-center gap-1.5">
              {withImages.map((b, i) => (
                <button
                  key={b.id}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    selected === i ? "w-7 bg-secondary-400" : "w-1.5 bg-on-dark-muted/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
