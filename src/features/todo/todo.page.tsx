import { useSelectedTodoFilter } from '@/features/todo/model/use-selected-todo-filter.ts'
import { TodoFilterList } from '@/features/todo/ui/filter-list.tsx'
import { TodoList } from '@/features/todo/ui/list.tsx'
import { cn } from '@/shared/lib/css.ts'
import { useIsIntersecting } from '@/shared/lib/use-is-intersecting.ts'
import { CreateTodoForm } from './ui/create-form.tsx'
import DeleteActionsMenu from './ui/delete-dropdown.tsx'

function TodoPage() {
  const { ref: createTodoFormRef, isIntersecting } = useIsIntersecting()

  const { selectedFilter, setSelectedFilter } = useSelectedTodoFilter('active')

  return (
    <main className="container mx-auto px-5 pt-5 pb-30 md:px-6 md:pt-8">
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

      <TodoList filter={selectedFilter} />

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

export const Component = TodoPage
