import { clsn } from "@/shared/utils/clsn";

interface TitleProps {
  text: string;
  className?: string;
}

function Title({ text, className }: TitleProps) {
  return <h2 className={clsn("text-5xl font-bold text-accent", className)}>{text}</h2>;
}

export default Title;
