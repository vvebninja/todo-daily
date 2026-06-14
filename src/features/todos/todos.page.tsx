import { useSelectedTodoFilter } from '@/features/todos/model/use-selected-todo-filter.ts'
import { TodoFilterList } from '@/features/todos/ui/filter-list.tsx'
import { TodoList } from '@/features/todos/ui/list.tsx'
import { cn } from '@/shared/lib/css.ts'
import { useIsIntersecting } from '@/shared/lib/use-is-intersecting.ts'
import { Typography } from '@/shared/ui/typography.tsx'
import { CreateTodoForm } from './ui/create-form.tsx'
import DeleteActionsMenu from './ui/delete-actions-menu.tsx'

function TodosPage() {
  const { ref: createTodoFormRef, isIntersecting } = useIsIntersecting()

  const { selectedFilter, setSelectedFilter } = useSelectedTodoFilter({
    title: 'Active',
    value: 'active',
  })

  return (
    <main className="container mx-auto px-5 pt-5 pb-30 md:px-6 md:pt-8">
      <Typography
        as="h1"
        variant="h1"
        color="primary"
        size="xl"
        className="mb-2 md:mb-4 lg:mb-10"
      >
        {selectedFilter.title}
      </Typography>

      <div ref={createTodoFormRef} className="mb-8 lg:mb-10">
        <CreateTodoForm />
      </div>

      <div className="mb-4 flex items-center justify-between lg:mb-6">
        <TodoFilterList
          selectedFilter={selectedFilter}
          onFilterClick={setSelectedFilter}
        />

        <DeleteActionsMenu />
      </div>

      <TodoList filter={selectedFilter.value} />

      <div className="fixed bottom-10 left-1/2 z-100 container mx-auto w-full -translate-x-1/2 px-4">
        <CreateTodoForm
          className={cn(
            'dark:bg-background/80 bg-secondary-foreground/20 rounded-sm opacity-0 backdrop-blur-md transition-all duration-500',
            !isIntersecting
            && 'animate-in fade-in slide-in-from-bottom-4 opacity-100',
          )}
        />
      </div>
    </main>
  )
}

export const Component = TodosPage
