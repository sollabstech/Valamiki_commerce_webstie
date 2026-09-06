"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { RatingStars } from "@/components/product/rating-stars";
import { mockReviews } from "@/lib/mock-data";

export function Testimonials() {
  return (
    <section>
      <SectionHeading
        eyebrow="Loved locally"
        title="What our customers say"
        subtitle="Real feedback from shoppers across Salem."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockReviews.slice(0, 3).map((review) => (
          <figure
            key={review.id}
            className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-secondary-500/40 hover:shadow-elevated"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-gold-soft font-display text-base font-bold text-on-accent">
                {review.name.charAt(0)}
              </span>
              <div>
                <figcaption className="text-sm font-semibold text-ink-900">{review.name}</figcaption>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-secondary-600">
                  Verified buyer
                </span>
              </div>
            </div>
            <RatingStars rating={review.rating} />
            <blockquote className="flex-1 font-display text-[15px] italic leading-relaxed text-ink-700">
              &ldquo;{review.comment}&rdquo;
            </blockquote>
            <p className="text-xs text-ink-500">{review.location}</p>
          </figure>
        ))}
      </div>
    </section>
  );
}
