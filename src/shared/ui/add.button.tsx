import { SlNote } from "react-icons/sl";
import { IoMdAddCircle } from "react-icons/io";
import { clsn } from "../utils";

const iconSizes = { md: 40, lg: 50 };

const iconMap = {
  addCircle: IoMdAddCircle,
  note: SlNote,
};

const colors = {
  accent: "text-accent hover:text-red-600",
  smoke: "text-gray hover:text-accent",
};

interface AddButtonProps extends React.ComponentProps<"button"> {
  type: "button" | "submit";
  label?: string;
  iconName: keyof typeof iconMap;
  iconSize: keyof typeof iconSizes;
  color: keyof typeof colors;
  className?: string;
}

function AddButton({
  label,
  type,
  iconName,
  iconSize,
  color,
  className,
  ...restProps
}: AddButtonProps) {
  const Icon = iconMap[iconName];

  return (
    <button
      type={type}
      {...restProps}
      className={clsn(
        "flex items-end gap-4 border-0 overflow-hidden cursor-pointer transition-colors duration-300",
        className,
        colors[color],
      )}
    >
      {label && <span>{label}</span>}
      <Icon size={iconSizes[iconSize]} />
    </button>
  );
}

export { AddButton };
