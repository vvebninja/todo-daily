import { rqClient as rqc } from "@/shared/api/instance";
import { queryClient as qc } from "@/shared/api/query-client";
import { useState } from "react";

export function useCreateTodo() {
  const [fieldError, setFieldError] = useState<null | string>(null);

  const mutation = rqc.useMutation("post", "/todos", {
    onSettled: () => qc.invalidateQueries(rqc.queryOptions("get", "/todos")),
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
