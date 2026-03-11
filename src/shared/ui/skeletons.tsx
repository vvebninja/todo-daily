import { Skeleton } from './kit/skeleton'

type SkeletonsProps = Readonly<{
  itemsCount?: number
  className?: string
}>

export function Skeletons({ itemsCount = 1, className = '' }: SkeletonsProps) {
  return Array.from({ length: itemsCount })
    .fill(null)
    .map((_, index) => (
      <Skeleton
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className={className}
      />
    ))
}
