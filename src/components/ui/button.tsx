import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out will-change-transform disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-gold text-on-accent shadow-gold ring-1 ring-inset ring-white/25 hover:-translate-y-0.5 hover:brightness-[1.05] active:translate-y-0",
        secondary:
          "bg-primary-800 text-secondary-200 shadow-medium ring-1 ring-inset ring-secondary-500/25 hover:-translate-y-0.5 hover:text-secondary-100 hover:ring-secondary-500/50 active:translate-y-0",
        outline:
          "border border-current/35 bg-transparent text-ink-900 hover:-translate-y-0.5 hover:border-secondary-500/80 hover:text-secondary-600 hover:bg-secondary-500/5 active:translate-y-0",
        ghost: "bg-transparent text-ink-900 normal-case tracking-normal hover:bg-secondary-500/10",
        link: "text-secondary-600 normal-case tracking-normal underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-error text-white shadow-soft hover:bg-error/90 hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 text-[11px] rounded",
        md: "h-11 px-6 text-xs rounded-md",
        lg: "h-13 px-8 text-[13px] rounded-md",
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
