import { useAuth } from "@/context/auth";
import type { Todo } from "@/shared/common.types";
import { useFirestoreTodos } from "@/shared/firebase/firestore";
import { AddButton } from "@/shared/ui/add.button";
import { Modal } from "@/shared/ui/modal";
import { useState } from "react";
import { useLoaderData } from "react-router";
import AddTodoForm from "./add.todo.form";
import { TodoList } from "./todo.list";

function TodoPage() {
  const { user } = useAuth();
  const initialTodos = useLoaderData() as Todo[];
  const { liveTodos, addTodo, deleteTodo, toggleComplete } = useFirestoreTodos(user, initialTodos);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="container mx-auto px-3 pt-16 pb-20">
      {liveTodos?.length ? (
        <TodoList
          todos={liveTodos}
          onDeleteTodoClick={handleDeleteClick}
          onCompleteChange={handleCompleteChange}
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
