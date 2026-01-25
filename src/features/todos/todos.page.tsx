import { useQueryClient } from "@tanstack/react-query";
import { rqClient } from "shared/api/instance";

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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          createTodoMutation.mutate({
            body: { title: formData.get("title") as string },
          });
        }}
      >
        <input type="text" name="title" placeholder="Todo title" />
        <button type="submit" disabled={createTodoMutation.isPending}>
          Create todo
        </button>
      </form>

      <ul>
        {todosQuery.data?.map((todo) => (
          <li key={todo.id}>
            <label>
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

            <div> {todo.id}</div>
            <div> {todo.title}</div>
            {todo.description && <div> {todo.description}</div>}

            <button
              disabled={deleteTodoMutation.isPending}
              onClick={() =>
                deleteTodoMutation.mutate({
                  params: { path: { todoId: todo.id } },
                })
              }
            >
              Delete todo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Component = TodosPage;
