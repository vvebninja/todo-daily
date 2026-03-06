import type { ApiSchemas } from '@/shared/api/schema'

import { useDeleteTodo } from '../model/use-delete-todo.ts'
import { useToggleTodo } from '../model/use-toggle-todo.ts'

import { TodoItem } from './item.tsx'

type TodoListProps = Readonly<{
  items?: ApiSchemas['Todo'][]
}>

export function TodoList({ items }: TodoListProps) {
  const deleteTodo = useDeleteTodo()
  const { toggleCompleted } = useToggleTodo()

  if (!items?.length)
    return null

  return (
    <ul className="grid gap-2.5">
      {items.map(todo => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            isPending={deleteTodo.getIsPending(todo.id)}
            onDelete={deleteTodo.handleDelete}
            toggleCompleted={toggleCompleted}
          />
        </li>
      ))}
    </ul>
  )
}
