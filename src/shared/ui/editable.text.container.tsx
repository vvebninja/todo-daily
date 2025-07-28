import { clsn } from "../utils/clsn";

export function EditableTextContainer({
  ref,
  text,
  isEditable,
  onBlur,
  className,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  text: string;
  isEditable: boolean;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  className?: string;
}) {
  if (!text) return null;

  return (
    <div
      className={clsn(
        "border-b leading-8 outline-none sm:text-lg",
        isEditable ? "border-b-gray-400" : "border-b-transparent",
        className,
      )}
      ref={ref}
      contentEditable={isEditable}
      suppressContentEditableWarning
      onBlur={onBlur}
    >
      {text}
    </div>
  );
}
