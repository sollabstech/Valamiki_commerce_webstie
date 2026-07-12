"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";

export function ProductGallery({
  images,
  name,
  categoryId,
}: {
  images: string[];
  name: string;
  categoryId: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl bg-surface shadow-soft ring-1 ring-border">
        <ProductImagePlaceholder categoryId={categoryId} className="aspect-square w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative aspect-square overflow-hidden rounded-xl bg-surface shadow-soft ring-1 ring-border">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-125"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2.5">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative size-16 overflow-hidden rounded-lg ring-2 transition-all sm:size-20",
                active === i ? "ring-primary-700" : "ring-border hover:ring-primary-300"
              )}
            >
              <Image src={src} alt={`${name} ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
