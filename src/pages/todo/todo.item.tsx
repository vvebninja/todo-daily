import { type Todo } from "@/shared/global.types";
import { EditableTextContainer } from "@/shared/ui";
import { clsn } from "@/shared/utils";
import { useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";

interface TodoItemProps {
  todo: Todo;
  onDeleteTodoClick: (id: Todo["id"]) => void;
  onCompleteChange: (id: Todo["id"], isCompleted: Todo["isCompleted"]) => void;
  onUpdateFieldBlur: (
    id: Todo["id"],
    field: keyof Pick<Todo, "title" | "description">,
    text: string,
  ) => void;
  className?: string;
}

function TodoItem(props: TodoItemProps) {
  const {
    todo: { id, title, description, isCompleted },
    onDeleteTodoClick,
    onCompleteChange,
    onUpdateFieldBlur,
    className,
  } = props;
  const [isTodoCompleted, setIsTodoCompleted] = useState(isCompleted);
  const [isEditable, setIsEditable] = useState(false);
  const todoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleDeleteTodoClick = () => {
    onDeleteTodoClick(id);
  };

  const handleCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTodoCompleted(event.target.checked);
    onCompleteChange(id, event.target.checked);
  };

  const handleUpdateTitleBlur = (event: React.ChangeEvent<HTMLDivElement>) => {
    const currentTitle = event.currentTarget.textContent;
    if (currentTitle && currentTitle.trim() !== title) {
      onUpdateFieldBlur(id, "title", currentTitle.trim());
    }
  };

  const handleUpdateDescrBlur = (event: React.ChangeEvent<HTMLDivElement>) => {
    const currDescription = event.currentTarget.textContent;
    if (currDescription && currDescription.trim() !== description) {
      onUpdateFieldBlur(id, "description", currDescription.trim());
    }
  };

  const handleTodoBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (isEditable && !todoRef.current?.contains(event.relatedTarget as Node)) {
      setIsEditable(false);
    }
  };

  return (
    <div
      ref={todoRef}
      tabIndex={0}
      onBlur={handleTodoBlur}
      className={clsn(
        className,
        "h-full rounded-[var(--border-radius-primary)] border-primary border-smoke px-2 py-2 sm:p-4",
        isCompleted ? "bg-gray-200 opacity-40" : "bg-white",
      )}
    >
      {/* Todo Controls */}
      <div className="relative z-10 float-right flex gap-3 pl-1">
        <label className="flex w-5 cursor-pointer rounded-full border p-1 hover:border-accent hover:text-accent focus-within:border-accent focus-within:text-accent transition-colors duration-300">
          <input
            type="checkbox"
            name="is-completed"
            checked={isTodoCompleted}
            onChange={handleCompleteChange}
            className="sr-only peer"
          />
          <FaCheck className="h-full w-full peer-not-checked:hidden peer-checked:block " />
        </label>

        <button
          type="button"
          onClick={handleDeleteTodoClick}
          aria-label="Delete task"
          className={clsn(
            "w-5 cursor-pointer outline-transparent hover:text-accent focus:text-accent transition-colors duration-300",
          )}
        >
          <BsTrash className="w-full h-full" />
        </button>
      </div>

      <EditableTextContainer
        ref={titleRef}
        text={title}
        isEditable={isEditable}
        onBlur={handleUpdateTitleBlur}
        className="mb-2 font-secondary"
      />
      <EditableTextContainer
        ref={descriptionRef}
        text={description}
        isEditable={isEditable}
        onBlur={handleUpdateDescrBlur}
      />
    </div>
  );
}

export { TodoItem };
