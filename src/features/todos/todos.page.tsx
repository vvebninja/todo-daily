import { useSelectedFilter } from '@/features/todos/model/use-selected-filter.ts'
import { TodoFilterList } from '@/features/todos/ui/filter-list.tsx'
import { cn } from '@/shared/lib/css.ts'
import { useIsIntersecting } from '@/shared/lib/use-is-intersecting.ts'
import { Typography } from '@/shared/ui/typography.tsx'
import { useTodoDraft } from './model/use-todo-draft.ts'
import { CreateTodoForm } from './ui/create-form.tsx'
import { TodoList } from './ui/list.tsx'

function TodosPage() {
  const { ref: createTodoFormRef, isIntersecting } = useIsIntersecting()

  const { selectedFilter, setSelectedFilter } = useSelectedFilter({
    title: 'Active',
    value: 'active',
  })

  const { title, setTitle, submit, isPending } = useTodoDraft()

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
        <CreateTodoForm
          value={title}
          onChange={setTitle}
          disabled={isPending}
          onSubmit={submit}
        />
      </div>

      <TodoFilterList
        selectedFilter={selectedFilter}
        onFilterClick={setSelectedFilter}
        className="mb-4 lg:mb-6"
      />

      <TodoList filter={selectedFilter.value} />

      <div className="fixed bottom-10 left-1/2 z-100 container mx-auto w-full -translate-x-1/2 px-4">
        <CreateTodoForm
          value={title}
          onChange={setTitle}
          disabled={isPending}
          onSubmit={submit}
          className={cn(
            'dark:bg-background/80 bg-secondary-foreground/20 invisible rounded-sm opacity-0 backdrop-blur-md transition-all duration-250',
            !isIntersecting
            && 'animate-in fade-in slide-in-from-bottom-4 visible opacity-100',
          )}
        />
      </div>
    </main>
  )
}

export const Component = TodosPage
