import { cn } from '@/shared/lib/css'

type SidebarProps = Readonly<{
  todosCategories: React.ReactNode
  className?: string
}>

export function Sidebar(props: SidebarProps) {
  return (
    <aside
      className={cn(
        'bg-primary/5 shadow-primary/20 grid justify-start pt-13 pl-5 shadow-xs',
        props.className,
      )}
    >
      {props.todosCategories}
    </aside>
  )
}
