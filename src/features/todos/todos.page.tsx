import { Typography } from '@/shared/ui/typography.tsx'
import { useTodos } from './model/use-todos.ts'
import { AddTodoDialog } from './ui/add-dialog.tsx'
import { TodoList } from './ui/list.tsx'
import { TodoStats } from './ui/stats.tsx'

function TodosPage() {
  const todos = useTodos()

  const completedCount = todos.data?.filter(todo => todo.isCompleted).length

  if (todos.error) {
    return <div>{JSON.stringify(todos.error.message)}</div>
  }

  return (
    <div className="px-4 pt-5 lg:pt-9">
      <header className="mb-4 md:mb-8">
        <Typography
          variant="h1"
          color="primary"
          size="xl"
          className="mb-2 md:mb-4"
        >
          Today
        </Typography>
        <TodoStats completed={completedCount} count={todos.data?.length} />
      </header>

      <AddTodoDialog />

      <TodoList items={todos.data} isLoading={todos.isLoading} />
    </div>
  )
}

export const Component = TodosPage
