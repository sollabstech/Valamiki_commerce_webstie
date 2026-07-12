import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-700 text-white shadow-soft hover:bg-primary-800 hover:shadow-medium",
        secondary:
          "bg-secondary-500 text-primary-900 shadow-soft hover:bg-secondary-600 hover:shadow-medium",
        outline:
          "border border-border-strong bg-transparent text-ink-900 hover:bg-white hover:border-primary-300",
        ghost: "bg-transparent text-ink-900 hover:bg-primary-50",
        link: "text-primary-700 underline-offset-4 hover:underline p-0 h-auto",
        destructive: "bg-error text-white hover:bg-error/90 shadow-soft",
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
