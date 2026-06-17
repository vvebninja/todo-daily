import { CalendarDays, ListChecks } from 'lucide-react'

export const todoFilters = [
  {
    title: 'Active',
    value: 'active',
    icon: CalendarDays,
  },
  {
    title: 'Completed',
    value: 'completed',
    icon: ListChecks,
  },
] as const

export type TodoFilter = (typeof todoFilters)[number]
