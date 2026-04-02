import { Sidebar } from '@/features/todos/ui/sidebar.tsx'
import { Typography } from '@/shared/ui/typography.tsx'
import { todoCategories } from './model/categories.ts'
import { useSelectedTodoCategory } from './model/use-selected-category.tsx'
import { useTodos } from './model/use-todos.ts'
import { TodoCategoriesList } from './ui/categories-list.tsx'
import { CreateTodoDialog } from './ui/create-dialog.tsx'
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

  if (todosError) {
    return <div>{todosError.message}</div>
  }

  return (
    <div className="container mx-auto grow lg:grid lg:grid-cols-[240px_1fr] lg:gap-x-5">
      <Sidebar
        todosCategories={(
          <TodoCategoriesList
            categories={todoCategories}
            selectedCategory={selectedTodoCategory}
            onCategoryClick={handleSelectedTodoCategoryClick}
            counts={counts}
            isLoading={isLoadingTodos}
            className="flex-col justify-start gap-1"
          />
        )}
        className="max-lg:hidden"
      />

      <main className="px-4 pt-5 md:px-8 md:pt-8">
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

          <CreateTodoDialog />
        </header>

        <TodoCategoriesList
          categories={todoCategories}
          selectedCategory={selectedTodoCategory}
          onCategoryClick={handleSelectedTodoCategoryClick}
          counts={counts}
          isLoading={isLoadingTodos}
          className="mb-4 lg:hidden"
        />

        <TodoList items={todos} isLoading={isLoadingTodos} />
      </main>
    </div>
  )
}

export const Component = TodosPage
