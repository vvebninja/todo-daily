import { Todo } from "@/shared/common.types";
import { AddButton } from "@/shared/ui/add.button";
import { clsn } from "@/shared/utils/clsn";
import { useState } from "react";
import { SlNote } from "react-icons/sl";

interface AddTodoFormProps {
  onSubmit: (todo: Pick<Todo, "title" | "description">) => void;
  className?: string;
}

const initialState = { title: "", description: "" };

function AddTodoForm({ onSubmit, className }: AddTodoFormProps) {
  const [todo, setTodo] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todo.title.trim() && !todo.description.trim()) return;

    onSubmit(todo);
    setTodo(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsn("min-h-50 min-w-72", className)}
    >
      <h2 className="flex justify-center items-center gap-3 mb-4 font-secondary text-2xl font-extrabold text-accent text-center">
        Add Todo
        <SlNote size={28} />
      </h2>

      <div className="relative min-h-50 overflow-hidden mb-7 border-2 border-gray-300 rounded-[var(--border-radius-primary)] ">
        <div className="absolute inset-0 z-0 bg-gray-300 opacity-10 " />

        <div className="relative z-10 ">
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            placeholder="This is where brilliance begins! Or, you know, just 'buy milk."
            aria-label="Task title"
            autoFocus
            className="w-full border-b border-gray-400 py-2 px-5 font-secondary text-[1.2rem] outline-none placeholder:text-gray-400 focus:placeholder:text-gray-500"
          />

          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            rows={4}
            placeholder="Is it 'World Domination' or 'Respond to that email'? Either way, put it here."
            aria-label="Task description"
            className="block w-full px-5 py-2 text-[1rem] outline-none placeholder:text-gray-400 focus:placeholder:text-gray-500 resize-none"
          />
        </div>
      </div>

      <AddButton
        type="submit"
        iconName="addCircle"
        iconSize="lg"
        color="accent"
        className={clsn("block mx-auto", todo.title.trim() || (todo.description.trim() ? "opacity-100" : "opacity-0"))}
      />
    </form>
  );
}

export default AddTodoForm;
