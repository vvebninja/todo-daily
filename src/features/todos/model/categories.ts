import { CalendarDays, ListChecks } from 'lucide-react'

export const todoCategories = [
  {
    title: 'All',
    value: 'all',
    icon: CalendarDays,
  },
  {
    title: 'Completed',
    value: 'completed',
    icon: ListChecks,
  },
] as const

export type TodoCategory = Omit<(typeof todoCategories)[number], 'icon'>
