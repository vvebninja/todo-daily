import type { Todo } from '@/shared/api/todo-service'
import { useTodos } from '@/features/todo/model/use-todos'

function selectTodoCounts(todos: Todo[]) {
  let active = 0
  let completed = 0

  for (const todo of todos) {
    if (todo.isCompleted) {
      completed++
    }
    else if (!todo.isCompleted) {
      active++
    }
  }

  return { all: todos.length, active, completed }
}

export function useTodoStatusCounts() {
  return useTodos({
    select: selectTodoCounts,
  })
}
