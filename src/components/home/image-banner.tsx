import Link from "next/link";
import Image from "next/image";
import type { Banner } from "@/types/firestore";

function bannerHref(banner: Banner) {
  if (!banner.linkType || !banner.linkValue) return "/category/all";
  if (banner.linkType === "category") return `/category/${banner.linkValue}`;
  if (banner.linkType === "route") return banner.linkValue;
  return "/category/all";
}

/** A single full-width promo banner image (clickable). No form, no text block. */
export function ImageBanner({ banner }: { banner?: Banner }) {
  if (!banner?.imageUrl) return null;

  return (
    <Link
      href={bannerHref(banner)}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-black"
    >
      <div className="relative aspect-[16/9] sm:aspect-[24/9]">
        <Image
          src={banner.imageUrl}
          alt={banner.title || "Promotion"}
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {banner.title && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center p-6 sm:p-10">
              <p className="font-display text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                {banner.title}
              </p>
              {banner.subtitle && (
                <p className="mt-1 text-sm text-white/80 sm:text-base">{banner.subtitle}</p>
              )}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
