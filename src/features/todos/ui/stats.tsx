import { cn } from '@/shared/lib/css'
import { Typography } from '@/shared/ui/typography'

type TodoStatsProps = Readonly<{
  completed?: number
  count?: number
  className?: string
}>

export function TodoStats({
  completed = 0,
  count = 0,
  className,
}: TodoStatsProps) {
  const label = `completed ${completed}/${count}`

  return (
    <Typography
      variant="p"
      size="lg"
      color="muted"
      className={cn('min-h-7 pl-1', className)}
    >
      {label}
    </Typography>
  )
}
