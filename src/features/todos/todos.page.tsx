import { rqClient } from "@/shared/api/instance";
import { Button } from "@/shared/ui/kit/button";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Input } from "@/shared/ui/kit/input";
import { useQueryClient } from "@tanstack/react-query";

const TodosPage = () => {
  const queryClient = useQueryClient();
  const todosQuery = rqClient.useQuery("get", "/todos");

  const createTodoMutation = rqClient.useMutation("post", "/todos", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/todos"),
      );
    },
  });

  const deleteTodoMutation = rqClient.useMutation("delete", "/todos/{todoId}", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/todos"),
      );
    },
  });

  const toggleIsCompletedMutation = rqClient.useMutation(
    "patch",
    "/todos/{todoId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/todos"),
        );
      },
    },
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <form
          className="flex gap-4 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            createTodoMutation.mutate({
              body: { title: formData.get("title") as string },
            });
          }}
        >
          <Input
            className="bg-white"
            type="text"
            placeholder="Buy juice for dinner ..."
          />
          <Button
            className="border hover:cursor-pointer"
            type="submit"
            disabled={createTodoMutation.isPending}
          >
            Create todo
          </Button>
        </form>

        <h2>Todo list</h2>

        <ul className="grid gap-8">
          {todosQuery.data?.map((todo) => (
            <li className="bg-white p-2" key={todo.id}>
              <label>
                {/* <Checkbox className="rounded-full" /> */}
                <input
                  type="checkbox"
                  name="isCompleted"
                  checked={todo.isCompleted}
                  onChange={(e) => {
                    toggleIsCompletedMutation.mutate({
                      params: { path: { todoId: todo.id } },
                      body: { isCompleted: e.target.checked },
                    });
                  }}
                />
              </label>

              <div>{todo.title}</div>
              {todo.description && <div> {todo.description}</div>}

              <Button
                className="mt-4 px-4 border  hover:cursor-pointer transition-colors"
                disabled={deleteTodoMutation.isPending}
                onClick={() =>
                  deleteTodoMutation.mutate({
                    params: { path: { todoId: todo.id } },
                  })
                }
              >
                Delete todo
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Component = TodosPage;
