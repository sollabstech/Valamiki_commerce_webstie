import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PromoBannerProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  imageUrl?: string;
};

export function PromoBanner({
  eyebrow,
  title,
  subtitle,
  ctaText,
  ctaHref,
  imageUrl,
}: PromoBannerProps) {
  return (
    <div className="section-dark relative overflow-hidden rounded-2xl border border-white/10">
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-secondary-500/15 blur-3xl" />
      <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h3 className="mt-3 font-display text-2xl font-semibold text-on-dark sm:text-3xl md:text-[2.1rem]">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-on-dark-muted">
              {subtitle}
            </p>
          )}
          <Button asChild className="mt-7">
            <Link href={ctaHref}>
              {ctaText} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="relative hidden aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-dark-800 lg:block">
          {imageUrl ? (
            <Image src={imageUrl} alt="" fill className="object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-display text-3xl italic text-secondary-400/80">
              Valmiki
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
