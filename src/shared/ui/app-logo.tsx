import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Menu } from 'lucide-react'
import { Link } from 'react-router'

import { cn } from '../lib/css'
import { ROUTES } from '../model/routes'

const logoVariants = cva(
  'min-h:11 font-secondary inline-flex items-center gap-2 py-4 text-3xl font-extrabold md:text-4xl',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        defaultVariants: {
          variant: 'default',
        },
      },
    },
  },
)

const logoBoxVariants = cva(
  'flex h-8 w-8 items-center rounded-[4px] pr-1 pl-3 md:h-10 md:w-10',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground',
        secondary: 'bg-primary text-primary-foreground',
        defaultVariants: {
          variant: 'default',
        },
      },
    },
  },
)

export default function AppLogo({
  variant = 'default',
  className,
}: { className?: string } & VariantProps<typeof logoVariants>) {
  return (
    <Link
      to={ROUTES.TODOS}
      viewTransition
      className={cn(logoVariants({ variant, className }))}
    >
      <div className={cn(logoBoxVariants({ variant }))}>
        <Menu className="stroke-4" />
      </div>
      Todo Daily
    </Link>
  )
}
