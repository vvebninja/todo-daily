import { Link as RouterLink, LinkProps } from "react-router";
import { clsn } from "../utils/clsn.ts";

const LinkVariants = {
  filled:
    "before:bg-white bg-accent text-white border-transparent hover:bg-white hover:border-accent hover:text-accent hover:shadow-accent",
  outlined: "before:bg-accent bg-white text-accent border-accent hover:bg-accent hover:text-white",
};

const LinkSizes = {
  sm: "text-[18px] py-2 px-8 w-[7rem]",
  md: "text-2xl py-3 px-8 sm:text-4xl sm:py-4 sm:px-12",
};

interface UiLinkProps extends LinkProps {
  variant?: keyof typeof LinkVariants;
  size?: keyof typeof LinkSizes;
  className?: string;
}

function Link({
  variant,
  size,
  children,
  className,
  to,
  ...otherProps
}: React.PropsWithChildren<UiLinkProps>) {
  return (
    <RouterLink
      className={clsn(
        "cursor-pointer rounded-[0.5rem] font-secondary relative overflow-hidden border shadow-2xl transition-all duration-200 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:duration-300 before:ease-out hover:before:h-40 hover:before:w-40 hover:before:opacity-80 inline-block",
        size && LinkSizes[size],
        variant && LinkVariants[variant],
        className,
      )}
      to={to}
      {...otherProps}
    >
      <span className="relative z-10">{children}</span>
    </RouterLink>
  );
}

export { Link };
