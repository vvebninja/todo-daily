import { useFirestoreTodos } from "@/shared/api/use.firestore.todos";
import { type Todo } from "@/shared/global.types";
import { AddButton, Modal } from "@/shared/ui";
import { useState } from "react";
import { useLoaderData } from "react-router";
import AddTodoForm from "./add.todo.form";
import { TodoList } from "./todo.list";
import { useAuth } from "@/context/auth";

function TodoPage() {
  const initialTodos = useLoaderData() as Todo[];
  const { liveTodos, updateField, addTodo, deleteTodo, toggleComplete } =
    useFirestoreTodos(initialTodos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  console.log(user);

  const handleSubmit = (todo: Pick<Todo, "title" | "description">) => {
    try {
      addTodo(todo);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add todo: ", error);
    }
  };

  const handleCompleteChange = (id: Todo["id"], isCompleted: Todo["isCompleted"]) => {
    try {
      toggleComplete(id, isCompleted);
    } catch (error) {
      console.error("Failed to toggle complete: ", error);
    }
  };

  const handleDeleteClick = (id: Todo["id"]) => {
    try {
      deleteTodo(id);
    } catch (error) {
      console.error("Failed to delete todo: ", error);
    }
  };

  const handleUpdateFieldBlur = (
    id: Todo["id"],
    field: keyof Pick<Todo, "title" | "description">,
    text: string,
  ) => {
    updateField(id, field, text);
  };

  return (
    <div className="container mx-auto px-3 pt-16 pb-20">
      {liveTodos?.length ? (
        <TodoList
          todos={liveTodos}
          onDeleteTodoClick={handleDeleteClick}
          onCompleteChange={handleCompleteChange}
          onUpdateFieldBlur={handleUpdateFieldBlur}
        />
      ) : (
        <div className="flex items-center justify-center gap-8 mt-35 font-secondary font-extrabold text-3xl text-slate-400">
          <AddButton
            label="Create todo"
            type="button"
            iconName="note"
            iconSize="md"
            color="smoke"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}
      <AddButton
        type="button"
        iconName="addCircle"
        iconSize="lg"
        color="accent"
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-12 left-[50%] z-10 -translate-x-3/6"
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="max-w-2xl w-full"
      >
        <AddTodoForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

export const Component = TodoPage;
