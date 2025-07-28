import type { Todo } from "@/shared/common.types";
import { clsn } from "@/shared/utils/clsn";
import { TodoItem } from "./todo.item";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodoClick: (id: Todo["id"]) => void;
  onCompleteChange: (id: Todo["id"], isCompleted: Todo["isCompleted"]) => void;
  className?: string;
}

export function TodoList({ todos, onDeleteTodoClick, onCompleteChange }: TodoListProps) {
  return (
    <ul className={clsn("content-center grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] grid-flow-row gap-5")}>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onDeleteTodoClick={onDeleteTodoClick}
            onCompleteChange={onCompleteChange}
          />
        </li>
      ))}
    </ul>
  );
}
