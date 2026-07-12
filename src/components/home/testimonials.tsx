"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RatingStars } from "@/components/product/rating-stars";
import { mockReviews } from "@/lib/mock-data";

export function Testimonials() {
  return (
    <section>
      <SectionHeading title="What our customers say" subtitle="Real feedback from shoppers in Salem" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockReviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="flex flex-col gap-3 rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border"
          >
            <Quote className="size-6 text-secondary-500" />
            <p className="flex-1 text-sm leading-relaxed text-ink-700">&ldquo;{review.comment}&rdquo;</p>
            <div>
              <RatingStars rating={review.rating} />
              <p className="mt-1.5 text-sm font-semibold text-ink-900">{review.name}</p>
              <p className="text-xs text-ink-500">{review.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
