import { logoLightIcon, logoAccentIcon } from "../icons/static";
import { clsn } from "../utils/clsn";

interface LogoProps {
  theme: "light" | "accent";
  className?: string;
}

function Logo({ theme, className }: LogoProps) {
  return (
    <div className={clsn("flex items-center gap-4 font-secondary text-accent", className)}>
      <img
        src={theme === "light" ? logoLightIcon : logoAccentIcon}
        alt="logo"
      />
      <span
        className={clsn(
          "text-3xl leading-9 sm:text-4xl",
          theme === "light" ? "text-white" : "text-accent",
        )}
      >
        Todo Daily
      </span>
    </div>
  );
}

export { Logo };
