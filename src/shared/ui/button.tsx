import { clsn } from "../utils/clsn";

const ButtonVariants = {
  filled:
    "before:bg-white bg-accent text-white border-transparent hover:bg-white hover:border-accent hover:text-accent hover:shadow-accent",
  outlined: "before:bg-accent bg-white text-accent border-accent hover:bg-accent hover:text-white",
};

interface ButtonProps extends React.ComponentProps<"button"> {
  type: "button" | "submit";
  variant?: keyof typeof ButtonVariants;
  className?: string;
}

function Button({
  type,
  variant,
  children,
  className,
  ...restProps
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      {...restProps}
      className={clsn(
        "w-full h-11 cursor-pointer rounded-[0.5rem] font-secondary relative overflow-hidden border shadow-2xl transition-all duration-200 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:duration-300 before:ease-out hover:before:h-40 hover:before:w-40 hover:before:opacity-80 inline-block",
        variant && ButtonVariants[variant],
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export { Button };
