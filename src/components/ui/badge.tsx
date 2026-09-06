import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ring-1 ring-inset",
  {
    variants: {
      variant: {
        primary: "bg-secondary-100 text-secondary-800 ring-secondary-400/40",
        secondary: "bg-gradient-gold text-on-accent ring-white/25 shadow-gold",
        success: "bg-success-bg text-success ring-success/20",
        error: "bg-error text-white ring-white/15 shadow-soft",
        outline: "border border-current/40 text-ink-700 ring-transparent",
        solid: "bg-primary-800 text-secondary-100 ring-secondary-500/25",
        deal: "bg-gradient-gold text-on-accent ring-white/25 shadow-gold",
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
