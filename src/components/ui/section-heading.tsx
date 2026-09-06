import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  viewAllHref,
  align = "center",
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  viewAllHref?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-2",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-display text-2xl font-semibold text-balance text-ink-900 sm:text-3xl md:text-[2rem]">
        {title}
      </h2>
      <span
        className={cn(
          "mt-1 h-px w-14 bg-gradient-gold",
          centered ? "mx-auto" : ""
        )}
        aria-hidden
      />
      {subtitle && (
        <p className="mt-1 max-w-xl text-sm text-ink-500">{subtitle}</p>
      )}
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-secondary-600 transition-colors hover:text-secondary-700"
        >
          View all
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
