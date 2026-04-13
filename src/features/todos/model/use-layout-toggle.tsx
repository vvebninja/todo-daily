import { LayoutGrid, List } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui/kit/button'

export function useLayoutToggle() {
  const [variant, setVariant] = useState<'list' | 'grid'>('grid')

  const controls = (
    <ul className="mb-2 flex justify-end gap-1">
      {[
        { id: 'grid', Icon: LayoutGrid },
        { id: 'list', Icon: List },
      ].map(({ id, Icon }) => (
        <li key={id}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVariant(id as 'list' | 'grid')}
            className={cn(
              'size-8',
              variant === id ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <Icon className="size-5" />
          </Button>
        </li>
      ))}
    </ul>
  )

  return { variant, controls }
}
