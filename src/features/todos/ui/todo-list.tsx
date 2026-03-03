import type { ApiSchemas } from "@/shared/api/schema";
import { useDeleteTodo } from "../use-delete-todo";
import { useToggleTodo } from "../use-toggle-todo";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  items?: ApiSchemas["Todo"][];
}

export function TodoList({ items }: TodoListProps) {
  const deleteTodo = useDeleteTodo();
  const { toggleCompleted } = useToggleTodo();

  if (!items?.length) return null;

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
  );
}
