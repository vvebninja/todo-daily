import { cn } from '@/shared/lib/css'

type SidebarProps = Readonly<{
  todosCategories: React.ReactNode
  className?: string
}>

export function Sidebar(props: SidebarProps) {
  return (
    <aside
      className={cn(
        'grid justify-start bg-primary/5 pt-13 pl-5 shadow-xs shadow-primary/20',
        props.className,
      )}
    >
      {props.todosCategories}
    </aside>
  )
}
