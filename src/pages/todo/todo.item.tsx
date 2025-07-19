import { type Todo } from "@/shared/api/firestore";
import { CheckIcon, TrashbinIcon } from "@/shared/icons/components";
import { EditableTextContainer } from "@/shared/ui";
import { clsn } from "@/shared/utils";
import { useRef, useState } from "react";

interface TodoProps {
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

function TodoItem(props: TodoProps) {
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
      <div className="relative z-10 float-right flex gap-4 pl-1">
        <label
          className={clsn(
            "flex h-6 w-6 cursor-pointer rounded-full border p-1 hover:border-accent hover:text-accent focus-within:border-accent focus-within:text-accent",
          )}
        >
          <input
            className="sr-only peer"
            type="checkbox"
            name="is-completed"
            checked={isTodoCompleted}
            onChange={handleCompleteChange}
          />
          <CheckIcon className="h-full w-full peer-not-checked:hidden peer-checked:block" />
        </label>

        <button
          className={clsn(
            "w-6 cursor-pointer outline-transparent hover:text-accent focus:text-accent",
          )}
          type="button"
          onClick={handleDeleteTodoClick}
          aria-label="Delete task"
        >
          <TrashbinIcon />
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
