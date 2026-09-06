import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  viewAllHref,
  className,
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <div className="flex items-stretch gap-3">
        <span className="mt-1 w-1.5 shrink-0 rounded-full bg-gradient-gold shadow-gold" aria-hidden />
        <div>
          <h2 className="text-balance text-xl font-bold text-ink-900 sm:text-2xl md:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-ink-500 sm:text-base">{subtitle}</p>
          )}
        </div>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="glass-gold group inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold text-secondary-800 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold"
        >
          View all
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
