import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  size = "sm",
  className,
}: {
  rating: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const dimension = size === "sm" ? "size-3.5" : "size-4.5";
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.round(rating);
        return (
          <Star
            key={i}
            className={cn(
              dimension,
              filled ? "fill-secondary-500 text-secondary-500" : "fill-transparent text-ink-300"
            )}
          />
        );
      })}
    </div>
  );
}
