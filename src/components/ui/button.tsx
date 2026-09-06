import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 ease-out will-change-transform disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-navy text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),var(--shadow-medium)] ring-1 ring-inset ring-white/10 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),var(--shadow-elevated)] hover:ring-secondary-400/40 active:translate-y-0",
        secondary:
          "bg-gradient-gold text-primary-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),var(--shadow-gold)] ring-1 ring-inset ring-white/40 hover:-translate-y-0.5 hover:brightness-[1.03] hover:ring-2 hover:ring-secondary-200/70 active:translate-y-0",
        outline:
          "glass-gold border border-secondary-500/40 text-ink-900 hover:-translate-y-0.5 hover:border-secondary-500/70 hover:shadow-soft active:translate-y-0",
        ghost: "bg-transparent text-ink-900 hover:bg-primary-50",
        link: "text-primary-700 underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-error text-white shadow-soft hover:bg-error/90 hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        sm: "h-9 px-3.5 text-sm rounded-md",
        md: "h-11 px-5 text-sm rounded-lg",
        lg: "h-13 px-7 text-base rounded-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
