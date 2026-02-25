import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import { useState } from "react";

export function useCreateTodo() {
  const [fieldError, setFieldError] = useState<null | string>(null);

  const mutation = rqClient.useMutation("post", "/todos", {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions("get", "/todos"));
    },
  });

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";

    if (!title && !description) {
      setFieldError("Fill at least one field");
      return;
    }

    mutation.mutate(
      { body: { title, description } },
      {
        onSuccess: () => {
          setFieldError(null);
          form.reset();
        },
      }
    );
  }

  return {
    fieldError,
    isPending: mutation.isPending,
    handleSubmit,
    clearError: () => {
      if (fieldError) setFieldError(null);
    },
  };
}
