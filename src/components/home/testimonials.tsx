"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RatingStars } from "@/components/product/rating-stars";
import { mockReviews } from "@/lib/mock-data";

export function Testimonials() {
  return (
    <section>
      <SectionHeading title="What our customers say" subtitle="Real feedback from shoppers in Salem" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="glass-card flex flex-col gap-3 rounded-lg p-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-elevated hover:ring-1 hover:ring-secondary-400/50"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-gradient-gold text-primary-900 shadow-gold ring-1 ring-white/40">
              <Quote className="size-4.5" />
            </span>
            <p className="flex-1 text-sm leading-relaxed text-ink-700">&ldquo;{review.comment}&rdquo;</p>
            <div>
              <RatingStars rating={review.rating} />
              <p className="mt-1.5 text-sm font-semibold text-ink-900">{review.name}</p>
              <p className="text-xs text-ink-500">{review.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
