import { CalendarDays, LayoutList, ListChecks } from 'lucide-react'
import { useState } from 'react'
import { Typography } from '@/shared/ui/typography.tsx'
import { useTodos } from './model/use-todos.ts'
import { CreateTodoDialog } from './ui/create-dialog.tsx'
import { TodoList } from './ui/list.tsx'
import { TodoStats } from './ui/stats.tsx'

const currentTodoTypeTitle = {
  all: 'Today',
  completed: 'Completed',
}

function TodosPage() {
  const [currentVisibleTodos, setCurrentVisibleTodos] = useState<
    'all' | 'completed'
  >('all')
  const todos = useTodos()

  const activeTodos = todos.data?.filter(todo => !todo.isCompleted)
  const completedTodos = todos.data?.filter(todo => todo.isCompleted)
  const completedCount = todos.data?.filter(todo => todo.isCompleted).length

  if (todos.error) {
    return <div>{JSON.stringify(todos.error.message)}</div>
  }

  return (
    <div className="container mx-auto grow md:grid md:grid-cols-[200px_1fr] md:gap-x-4 lg:grid-cols-[250px_1fr]">
      <aside className="grid bg-primary/5 pt-13 max-md:hidden md:pl-2 lg:pl-6">
        <ul className="flex flex-col gap-2">
          <li>
            <button
              onClick={() => setCurrentVisibleTodos('all')}
              className="flex items-center gap-3 px-2 py-1 text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary"
            >
              <CalendarDays size={28} />
              <Typography size="md" color="inherit">
                All
              </Typography>
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentVisibleTodos('completed')}
              className="flex items-center gap-3 px-2 py-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <ListChecks size={28} />
              <Typography size="md" color="inherit">
                Completed
              </Typography>
            </button>
          </li>
        </ul>
      </aside>

      <main className="px-4 pt-5 lg:pt-9">
        <header className="col-span-full mb-8">
          <Typography
            variant="h1"
            color="primary"
            size="xl"
            className="mb-2 md:mb-4"
          >
            {currentTodoTypeTitle[currentVisibleTodos]}
          </Typography>
          <TodoStats
            completed={completedCount}
            count={todos.data?.length}
            className="mb-6"
          />
          <CreateTodoDialog />
        </header>

        <ul className="mb-6 flex justify-between md:hidden">
          <li>
            <button
              onClick={() => setCurrentVisibleTodos('all')}
              className="flex gap-2 pl-0 transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:text-primary"
            >
              <LayoutList className="text-primary" />
              All
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentVisibleTodos('completed')}
              className="flex gap-2 pr-0 transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:text-primary"
            >
              <ListChecks className="text-primary" />
              Completed
            </button>
          </li>
        </ul>

        {currentVisibleTodos === 'all' && (
          <TodoList items={activeTodos} isLoading={todos.isLoading} />
        )}
        {currentVisibleTodos === 'completed' && (
          <TodoList items={completedTodos} isLoading={todos.isLoading} />
        )}
      </main>
    </div>
  )
}

export const Component = TodosPage
