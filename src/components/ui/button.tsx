import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:enabled:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:enabled:bg-destructive/90",
        outline:
          "border border-input bg-background hover:enabled:bg-accent hover:enabled:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:enabled:bg-secondary/80",
        ghost: "hover:enabled:bg-accent hover:enabled:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:enabled:underline",
      },
      size: {
        default: "px-12 py-3 font-bold text-base",
        icon: "h-10 w-10 p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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

export { Button };
/* HTML: <div class="loader"></div> */
