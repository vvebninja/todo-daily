import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/css'

const typographyVariants = cva('text-foreground transition-colors', {
  variants: {
    variant: {
      h1: 'font-bold tracking-tight',
      h2: 'font-medium tracking-tight',
      h3: 'font-normal tracking-tight',
      p: 'leading-7 font-normal',
    },
    font: {
      default: 'font-primary',
      secondary: 'font-secondary',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      inherit: 'text-inherit',
    },
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-lg md:text-[22px]',
      lg: 'text-xl md:text-2xl',
      xl: 'text-3xl md:text-5xl',
    },
  },
  defaultVariants: {
    variant: 'p',
    font: 'default',
    color: 'default',
    size: 'default',
  },
})

export type TypographyProps<T extends React.ElementType = 'p'> = VariantProps<
  typeof typographyVariants
>
& Omit<React.ComponentPropsWithoutRef<T>, 'color' | 'className'> & {
  as?: T
  className?: string
  ref?: React.ComponentPropsWithRef<T>['ref']
}

export function Typography<T extends React.ElementType = 'p'>({
  as,
  variant,
  font,
  size,
  color,
  className,
  ref,
  ...props
}: TypographyProps<T>) {
  const Component = as ?? 'p'

  return (
    <Component
      ref={ref}
      className={cn(typographyVariants({ variant, size, color, className }))}
      {...props}
    />
  )
}
