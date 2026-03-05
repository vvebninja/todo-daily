import { Typography } from "@/shared/ui/typography";
import { useTodos } from "./model/use-todos.ts";
import { AddTodoDialog } from "./ui/add-dialog.tsx";
import { TodoList } from "./ui/list.tsx";
import { TodoStats } from "./ui/stats.tsx";

function TodosPage() {
  const todos = useTodos();

  const completedCount = todos.data?.filter(todo => todo.isCompleted).length;

  if (todos.isLoading) {
    return <div className="text-primary text-2xl font-normal italic">Loading todos...</div>;
  }

  if (todos.error) {
    return <div>{JSON.stringify(todos.error.message)}</div>;
  }

  return (
    <div className="px-4 pt-5 lg:pt-9 lg:pl-10">
      <header>
        <Typography variant="h1" color="primary" size="xl" className="mb-2 md:mb-4">
          Today
        </Typography>
        <TodoStats completed={completedCount} count={todos.data?.length} />
      </header>

      <AddTodoDialog />

      <TodoList items={todos.data} />
    </div>
  );
}

export const Component = TodosPage;
