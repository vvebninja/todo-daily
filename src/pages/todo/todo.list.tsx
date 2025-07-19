import { clsn } from "@/shared/utils";
import { TodoItem } from "./todo.item";
import { type Todo } from "@/shared/api/firestore";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodoClick: (id: Todo["id"]) => void;
  onCompleteChange: (id: Todo["id"], isCompleted: Todo["isCompleted"]) => void;
  onUpdateFieldBlur: (
    id: Todo["id"],
    field: keyof Pick<Todo, "title" | "description">,
    text: string,
  ) => void;
  className?: string;
}

export function TodoList({
  todos,
  onDeleteTodoClick,
  onCompleteChange,
  onUpdateFieldBlur,
}: TodoListProps) {
  return (
    <ul
      className={clsn(
        "content-center grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] grid-flow-row gap-5",
      )}
    >
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onDeleteTodoClick={onDeleteTodoClick}
            onCompleteChange={onCompleteChange}
            onUpdateFieldBlur={onUpdateFieldBlur}
          />
        </li>
      ))}
    </ul>
  );
}
