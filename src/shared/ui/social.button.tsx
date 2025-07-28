import { FcGoogle } from "react-icons/fc";
import { clsn } from "../utils/clsn";

const iconsMap = {
  google: FcGoogle,
};

interface SocialButtonProps extends React.ComponentProps<"button"> {
  label?: string;
  iconName: keyof typeof iconsMap;
}

function SocialButton({ label, iconName, className, ...restProps }: SocialButtonProps) {
  const IconComponent = iconsMap[iconName];

  return (
    <button
      {...restProps}
      className={clsn(
        "flex items-center w-full h-11 justify-center gap-3 px-4 cursor-pointer rounded-[0.375rem] border border-[#d8d8d8] text-[1.1rem] hover:bg-slate-100 focus:bg-slate-100 transition-colors",
        className,
      )}
    >
      <IconComponent className="w-6 h-6" /> {label && <span>{label}</span>}
    </button>
  );
}

export { SocialButton };
