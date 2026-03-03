import { cn } from "@/shared/lib/css";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const typographyVariants = cva(
  "text-foreground transition-colors", // Базові стилі для тексту
  {
    variants: {
      variant: {
        h1: "font-bold tracking-tight",
        h2: "text-2xl font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        blockquote: "mt-6 border-l-2 pl-6 italic",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg lg:text-2xl",
        xl: "text-3xl lg:text-5xl",
      },
    },
    defaultVariants: {
      variant: "p",
      color: "default",
      size: "default",
    },
  }
);

interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, size, color, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, size, color, className }))}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";
