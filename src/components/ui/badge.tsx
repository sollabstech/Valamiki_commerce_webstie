import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        primary: "bg-primary-50 text-primary-700",
        secondary: "bg-secondary-100 text-secondary-800",
        success: "bg-success-bg text-success",
        error: "bg-error-bg text-error",
        outline: "border border-border-strong text-ink-700",
        solid: "bg-primary-700 text-white",
        deal: "bg-secondary-500 text-primary-900",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
