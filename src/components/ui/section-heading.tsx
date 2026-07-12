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
    <div className={cn("flex items-end justify-between gap-4 mb-6", className)}>
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink-900 text-balance">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm sm:text-base text-ink-500">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 hover:gap-2 transition-all"
        >
          View all
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
