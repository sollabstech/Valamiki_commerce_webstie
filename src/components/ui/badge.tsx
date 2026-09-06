import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset backdrop-blur-sm",
  {
    variants: {
      variant: {
        primary: "bg-primary-50/90 text-primary-700 ring-primary-200/70",
        secondary: "bg-secondary-100/90 text-secondary-800 ring-secondary-300/60",
        success: "bg-success-bg text-success ring-success/20",
        error: "bg-error-bg text-error ring-error/20",
        outline: "border border-border-strong text-ink-700 ring-transparent",
        solid: "bg-gradient-navy text-white shadow-soft ring-white/10",
        deal: "bg-gradient-gold text-primary-900 shadow-gold ring-white/30",
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
