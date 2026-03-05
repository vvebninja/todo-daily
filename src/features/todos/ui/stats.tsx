import { Typography } from "@/shared/ui/typography";

type TodoStatsProps = Readonly<{
  completed?: number;
  count?: number;
}>;

export function TodoStats({ completed = 0, count = 0 }: TodoStatsProps) {
  const label = count > 0 ? `Completed ${completed}/${count}` : "No todos yet";

  return (
    <Typography variant="p" size="lg" color="muted" className="mb-4 min-h-7 lg:mb-7">
      {label}
    </Typography>
  );
}
