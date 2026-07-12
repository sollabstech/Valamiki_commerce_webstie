"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Banner } from "@/types/firestore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const gradients = [
  "from-primary-800 via-primary-700 to-primary-600",
  "from-secondary-600 via-secondary-500 to-secondary-400",
  "from-primary-900 via-primary-700 to-secondary-600",
];

function bannerHref(banner: Banner) {
  if (!banner.linkType || !banner.linkValue) return "/";
  if (banner.linkType === "category") return `/category/${banner.linkValue}`;
  if (banner.linkType === "route") return banner.linkValue;
  return "/";
}

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

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

  if (banners.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl sm:rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, i) => (
            <div key={banner.id} className="relative min-w-0 flex-[0_0_100%]">
              <Link href={bannerHref(banner)} className="relative block aspect-[16/9] sm:aspect-[21/9]">
                {banner.imageUrl ? (
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    priority={i === 0}
                    className="object-cover"
                  />
                ) : (
                  <div className={cn("absolute inset-0 bg-gradient-to-br", gradients[i % gradients.length])}>
                    <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col items-start justify-center gap-3 p-6 sm:p-12">
                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md text-balance font-display text-2xl font-extrabold text-white sm:text-4xl"
                  >
                    {banner.title}
                  </motion.h2>
                  {banner.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="max-w-sm text-sm text-white/90 sm:text-base"
                    >
                      {banner.subtitle}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Button variant="secondary" size="md" asChild>
                      <span>Shop Now</span>
                    </Button>
                  </motion.div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-2 text-primary-900 shadow-soft transition-transform hover:scale-110 sm:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-2 text-primary-900 shadow-soft transition-transform hover:scale-110 sm:flex"
          >
            <ChevronRight className="size-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {banners.map((banner, i) => (
              <button
                key={banner.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  selected === i ? "w-6 bg-white" : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
