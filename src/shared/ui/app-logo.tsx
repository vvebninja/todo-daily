import { cva, type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { cn } from "../lib/css";
import { ROUTES } from "../model/routes";

const logoVariants = cva(
  "inline-flex items-center gap-2 min-h:11 py-4 font-secondary text-3xl text-primary-foreground font-extrabold md:text-4xl",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        defaultVariants: {
          variant: "default",
        },
      },
    },
  },
);

const logoBoxVariants = cva(
  "flex items-center w-8 h-8 pl-3 pr-1 rounded-[4px] md:w-10 md:h-10",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        secondary: "bg-primary text-primary-foreground",
        defaultVariants: {
          variant: "default",
        },
      },
    },
  },
);

export default function AppLogo({
  variant = "default",
  className,
}: { className?: string } & VariantProps<typeof logoVariants>) {
  return (
    <Link to={ROUTES.HOME} className={cn(logoVariants({ variant, className }))}>
      <div className={cn(logoBoxVariants({ variant }))}>
        <Menu className="stroke-4" />
      </div>
      Todo Daily
    </Link>
  );
}
