"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
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
    <section className="section-dark overflow-hidden">
      <h1 className="sr-only">Valmiki — groceries &amp; stationery delivered fast in Salem</h1>
      <Container className="py-10 sm:py-14">
        <div className="animate-fade-up mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black" ref={emblaRef}>
            <div className="flex">
              {(withImages.length > 0 ? withImages : [null]).map((banner, i) => (
                <div key={banner?.id ?? i} className="relative min-w-0 flex-[0_0_100%]">
                  {banner ? (
                    <Link
                      href={bannerHref(banner)}
                      className="group relative block aspect-[16/9] overflow-hidden sm:aspect-[21/9]"
                    >
                      <Image
                        src={banner.imageUrl}
                        alt={banner.title}
                        fill
                        priority={i === 0}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {banner.title && (
                        <>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                            <p className="font-display text-lg font-semibold text-white sm:text-xl">
                              {banner.title}
                            </p>
                          </div>
                        </>
                      )}
                    </Link>
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center bg-black sm:aspect-[21/9]">
                      <span className="font-display text-2xl italic text-secondary-400">
                        Valmiki
                      </span>
                    </div>
                  )}
                </div>
              ))}
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
                    selected === i ? "w-7 bg-secondary-500" : "w-1.5 bg-white/25"
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
