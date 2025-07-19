import { FcGoogle } from "react-icons/fc";

const iconsMap = {
  google: FcGoogle,
};

interface SocialButtonProps extends React.ComponentProps<"button"> {
  iconName: keyof typeof iconsMap;
}

function SocialButton({ iconName, ...restProps }: SocialButtonProps) {
  const IconComponent = iconsMap[iconName];

  return (
    <button
      {...restProps}
      className="flex h-12 w-12 cursor-pointer items-center justify-center gap-3 
   rounded-[0.375rem] border border-[#d8d8d8] text-[1.2rem] hover:bg-slate-100
   focus:bg-slate-100 transition-colors
   "
    >
      <IconComponent />
    </button>
  );
}

export { SocialButton };
