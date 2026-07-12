import { Quote } from "lucide-react";
import { RatingStars } from "@/components/product/rating-stars";
import { mockReviews } from "@/lib/mock-data";
import type { Product } from "@/types/firestore";

function starBreakdown(rating: number, reviewCount: number) {
  const weights = [0.05, 0.06, 0.09, rating >= 4.3 ? 0.15 : 0.3, rating >= 4.3 ? 0.65 : 0.4];
  return [1, 2, 3, 4, 5].map((star, i) => ({
    star,
    percent: Math.round(weights[i] * 100),
    count: Math.max(0, Math.round((weights[i] * reviewCount) || 0)),
  }));
}

export function ProductReviews({ product }: { product: Product }) {
  const breakdown = starBreakdown(product.rating, product.reviewCount).reverse();
  const reviews = mockReviews.slice(0, 3);

  return (
    <div className="grid gap-8 sm:grid-cols-[220px_1fr]">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-ink-900">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-ink-500">/ 5</span>
        </div>
        <RatingStars rating={product.rating} size="md" className="mt-1" />
        <p className="mt-1 text-sm text-ink-500">{product.reviewCount} ratings</p>

        <div className="mt-4 flex flex-col gap-1.5">
          {breakdown.map((row) => (
            <div key={row.star} className="flex items-center gap-2 text-xs text-ink-500">
              <span className="w-8 shrink-0">{row.star}★</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-secondary-500"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-lg bg-surface p-4 shadow-soft ring-1 ring-border">
            <div className="flex items-start gap-2.5">
              <Quote className="mt-0.5 size-4 shrink-0 text-secondary-500" />
              <div>
                <RatingStars rating={review.rating} />
                <p className="mt-1.5 text-sm text-ink-700">{review.comment}</p>
                <p className="mt-1.5 text-xs font-medium text-ink-900">
                  {review.name} <span className="text-ink-500">· {review.location}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
