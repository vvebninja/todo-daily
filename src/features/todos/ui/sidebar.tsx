import { cn } from '@/shared/lib/css'

interface SidebarProps {
  todosCategories: React.ReactNode
  className?: string
}

export function Sidebar(props: SidebarProps) {
  return (
    <aside
      className={cn('grid bg-primary/5 pt-13 md:pl-2 lg:pl-6', props.className)}
    >
      {props.todosCategories}
    </aside>
  )
}
