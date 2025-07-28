import { clsn } from "../utils/clsn";

interface Input extends React.ComponentProps<"input"> {
  errorMessage?: string;
  className?: string;
}

export function Input({ errorMessage, className, ...restProps }: Input) {
  return (
    <div className={clsn("", className)}>
      <input
        {...restProps}
        className="w-full h-11 px-3 border border-gray-300 rounded-[0.25rem]"
      />
      <p className="h-6 pl-1 text-accent">{errorMessage && errorMessage}</p>
    </div>
  );
}
