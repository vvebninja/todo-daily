import { useState } from 'react'
import { Sidebar } from '@/features/todos/ui/sidebar.tsx'
import { Typography } from '@/shared/ui/typography.tsx'
import { todoCategories } from './model/categories.ts'
import { useTodos } from './model/use-todos.ts'
import { TodosCategories } from './ui/categories.tsx'
import { CreateTodoDialog } from './ui/create-dialog.tsx'
import { TodoList } from './ui/list.tsx'
import { TodoStats } from './ui/stats.tsx'

export type TodoCategory = Omit<(typeof todoCategories)[number], 'icon'>

function TodosPage() {
  const [selectedCategory, setSelectedCategory] = useState<TodoCategory>(
    todoCategories[0],
  )
  const todos = useTodos()
  const completedCount = todos.data?.filter(todo => todo.isCompleted).length

  const todosByCategory = {
    all: todos.data?.filter(todo => !todo.isCompleted),
    completed: todos.data?.filter(todo => todo.isCompleted),
  }

  function handleTodosCategoryClick(category: TodoCategory) {
    setSelectedCategory(category)
  }

  if (todos.error) {
    return <div>{todos.error.message}</div>
  }

  return (
    <div className="container mx-auto grow md:grid md:grid-cols-[200px_1fr] md:gap-x-4 lg:grid-cols-[250px_1fr]">
      <Sidebar
        todosCategories={(
          <TodosCategories
            selectedCategory={selectedCategory}
            onCategoryClick={handleTodosCategoryClick}
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
            {selectedCategory.title}
          </Typography>
          <TodoStats
            completed={completedCount}
            count={todos.data?.length}
            className="mb-6"
          />
          <CreateTodoDialog />
        </header>
        <TodosCategories
          selectedCategory={selectedCategory}
          onCategoryClick={handleTodosCategoryClick}
          className="mb-4 md:hidden"
        />
        <TodoList
          items={todosByCategory[selectedCategory.value]}
          isLoading={todos.isLoading}
        />
      </main>
    </div>
  )
}

export const Component = TodosPage
