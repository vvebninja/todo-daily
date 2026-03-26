import { Sidebar } from '@/features/todos/ui/sidebar.tsx'
import { Typography } from '@/shared/ui/typography.tsx'
import { useTodos } from './model/use-todos.ts'
import { useSelectedTodoCategory } from './model/useSelectedTodoCategory.tsx'
import { TodosCategories } from './ui/categories.tsx'
import { CreateTodoDialog } from './ui/create-dialog.tsx'
import { TodoList } from './ui/list.tsx'
import { TodoStats } from './ui/stats.tsx'

function TodosPage() {
  const { selectedTodoCategory, handleSelectedTodoCategoryClick }
    = useSelectedTodoCategory()
  const {
    todos,
    completedCount,
    error: todosError,
    isLoading: isLoadingTodos,
  } = useTodos({ category: selectedTodoCategory.value })

  if (todosError) {
    return <div>{todosError.message}</div>
  }

  return (
    <div className="container mx-auto grow md:grid md:grid-cols-[200px_1fr] md:gap-x-4 lg:grid-cols-[250px_1fr]">
      <Sidebar
        todosCategories={(
          <TodosCategories
            selectedCategory={selectedTodoCategory}
            onCategoryClick={handleSelectedTodoCategoryClick}
            className="flex-col justify-start gap-1"
          />
        )}
        className="max-md:hidden"
      />

      <main className="px-4 pt-5 lg:pt-9">
        <header className="col-span-full mb-8">
          <Typography
            variant="h1"
            color="primary"
            size="xl"
            className="mb-2 md:mb-4"
          >
            {selectedTodoCategory.title}
          </Typography>
          <TodoStats
            completed={completedCount}
            count={todos?.length}
            className="mb-6"
          />
          <CreateTodoDialog />
        </header>
        <TodosCategories
          selectedCategory={selectedTodoCategory}
          onCategoryClick={handleSelectedTodoCategoryClick}
          className="mb-4 md:hidden"
        />
        <TodoList items={todos} isLoading={isLoadingTodos} />
      </main>
    </div>
  )
}

export const Component = TodosPage
