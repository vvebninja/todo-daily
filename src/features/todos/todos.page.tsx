import { cn } from '@/shared/lib/css.ts'
import { useIsIntersecting } from '@/shared/lib/use-is-intersecting.ts'
import { Typography } from '@/shared/ui/typography.tsx'
import { todoCategories } from './model/categories.ts'
import { useSelectedTodoCategory } from './model/use-selected-category.tsx'
import { useTodoDraft } from './model/use-todo-draft.ts'
import { useTodos } from './model/use-todos.ts'
import { TodoCategoriesList } from './ui/categories-list.tsx'
import { CreateTodoForm } from './ui/create-form.tsx'
import { TodoList } from './ui/list.tsx'

function TodosPage() {
  const { selectedTodoCategory, handleSelectedTodoCategoryClick }
    = useSelectedTodoCategory()
  const {
    todos,
    counts,
    error: todosError,
    isLoading: isLoadingTodos,
  } = useTodos({ category: selectedTodoCategory.value })
  const { ref: createFormRef, isIntersecting: isTopInputVisible }
    = useIsIntersecting()
  const { title, setTitle, submit, isPending } = useTodoDraft()
  if (todosError) {
    return <div>{todosError.message}</div>
  }

  return (
    <main className="container mx-auto px-5 pt-5 pb-30 md:px-6 md:pt-8">
      <header className="col-span-full mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Typography
            as="h1"
            variant="h1"
            color="primary"
            size="xl"
            className="mb-2 md:mb-4"
          >
            {selectedTodoCategory.title}
          </Typography>
        </div>
        <div ref={createFormRef}>
          <CreateTodoForm
            value={title}
            onChange={setTitle}
            disabled={isPending}
            onSubmit={submit}
          />
        </div>
      </header>

      <TodoCategoriesList
        categories={todoCategories}
        selectedCategory={selectedTodoCategory}
        onCategoryClick={handleSelectedTodoCategoryClick}
        counts={counts}
        isLoading={isLoadingTodos}
        className="mb-4"
      />

      <TodoList items={todos} isLoading={isLoadingTodos} />

      <div className="fixed bottom-10 left-1/2 z-100 container mx-auto w-full -translate-x-1/2 px-4">
        <CreateTodoForm
          value={title}
          onChange={setTitle}
          disabled={isPending}
          onSubmit={submit}
          className={cn(
            'dark:bg-background/80 bg-secondary-foreground/20 invisible rounded-sm opacity-0 backdrop-blur-md transition-all duration-250',
            !isTopInputVisible
            && 'animate-in fade-in slide-in-from-bottom-4 visible opacity-100',
          )}
        />
      </div>
    </main>
  )
}

export const Component = TodosPage
