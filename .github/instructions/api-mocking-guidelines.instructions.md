---
description: "Use when: setting up API endpoints, defining OpenAPI schemas, creating mock handlers, or working with MSW. Covers schema structure, API integration, and testing strategies."
applyTo: "src/shared/api/**"
---

# API & Mocking Guidelines

## OpenAPI Schema Structure

### Files Organization

```
src/shared/api/schema/
├── main.yaml                    # Main schema entry point
├── generated.ts                 # Auto-generated (pnpm api)
├── endpoints/
│   ├── auth.yaml
│   ├── todos.yaml
│   └── profile.yaml
├── models/
│   ├── auth.yaml
│   ├── todo.yaml
│   ├── profile.yaml
│   └── error.yaml
└── shared/
    └── responses.yaml           # Reusable response schemas
```

### Main Schema Template (`main.yaml`)

```yaml
openapi: 3.0.0
info:
  title: Todo Daily API
  version: 1.0.0
  description: API for managing daily todos

servers:
  - url: http://localhost:3000

paths: {}
```

Include endpoint files:

```yaml
paths:
  $ref: './endpoints/auth.yaml'
  $ref: './endpoints/todos.yaml'
  $ref: './endpoints/profile.yaml'

components:
  schemas:
    # Import models
    ...auth.yaml
    ...todos.yaml
    ...profile.yaml
    ...error.yaml
  responses:
    $ref: './shared/responses.yaml'
```

### Endpoint Definition (`endpoints/todos.yaml`)

```yaml
/todos:
  get:
    operationId: getTodos
    summary: Fetch all todos
    tags: [Todos]
    responses:
      "200":
        description: List of todos
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: "../models/todo.yaml#/components/schemas/Todo"
  post:
    operationId: createTodo
    summary: Create a new todo
    tags: [Todos]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: "../models/todo.yaml#/components/schemas/CreateTodoRequest"
    responses:
      "201":
        description: Todo created
        content:
          application/json:
            schema:
              $ref: "../models/todo.yaml#/components/schemas/Todo"

/todos/{todoId}:
  delete:
    operationId: deleteTodo
    parameters:
      - name: todoId
        in: path
        required: true
        schema:
          type: string
    responses:
      "204":
        description: Todo deleted
```

### Model Definition (`models/todo.yaml`)

```yaml
components:
  schemas:
    Todo:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
          minLength: 1
          maxLength: 255
        description:
          type: string
          nullable: true
        isCompleted:
          type: boolean
          default: false
        createdAt:
          type: string
          format: date-time
      required: [id, title, isCompleted, createdAt]

    CreateTodoRequest:
      type: object
      properties:
        title:
          type: string
          minLength: 1
          maxLength: 255
        description:
          type: string
          nullable: true
      required: [title]
```

### Generating Types

```bash
# Generate TypeScript types from OpenAPI schema
pnpm api

# Output: src/shared/api/schema/generated.ts
```

Generated types are automatically typed with `ApiPaths` interface for use with `openapi-fetch`.

## API Client Setup

### Instance Configuration

```ts
// src/shared/api/instance.ts
import createFetchClient from "openapi-fetch";
import createReactQueryClient from "openapi-react-query";
import { CONFIG } from "@/shared/model/config";
import type { ApiPaths } from "./schema";

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createReactQueryClient(fetchClient);
```

### Query Client Configuration

```ts
// src/shared/api/query-client.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});
```

## Using the API

### Fetching Data with Queries

```tsx
import { rqClient } from "@/shared/api/instance";

export function useTodos() {
  return rqClient.useQuery("get", "/todos", {
    queryKey: ["todos"],
  });
}

// In component
function TodosList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return todos?.map(todo => <TodoCard key={todo.id} todo={todo} />);
}
```

### Mutations (Create, Update, Delete)

```tsx
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("post", "/todos", {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

// In component
const { mutate: createTodo, isPending } = useCreateTodo();

const handleCreate = (data: CreateTodoRequest) => {
  createTodo({ body: data });
};
```

### Type-Safe Paths

```ts
// All paths are type-checked at compile time
fetchClient.GET("/todos"); // ✅ OK
fetchClient.POST("/todos", { body: {} }); // ✅ OK
fetchClient.GET("/invalid-path"); // ❌ TypeScript error
```

## Mock Service Worker (MSW) Setup

### MSW Configuration

```ts
// src/shared/api/mocks/browser.ts
import { setupWorker } from "msw/browser";
import * as handlers from "./handlers";

export const worker = setupWorker(...Object.values(handlers).flat());

// Enable in main.tsx or test setup
if (process.env.NODE_ENV === "development") {
  worker.listen();
}
```

### Handlers Definition (`handlers/todos.ts`)

```ts
import { http, HttpResponse } from "msw";
import { CONFIG } from "@/shared/model/config";

const BASE_URL = CONFIG.API_BASE_URL;

export const todoHandlers = [
  http.get(`${BASE_URL}/todos`, () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Learn TypeScript",
        isCompleted: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  }),

  http.post(`${BASE_URL}/todos`, async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(
      {
        id: crypto.randomUUID(),
        ...body,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  http.delete(`${BASE_URL}/todos/:todoId`, ({ params }) => {
    return new HttpResponse(null, { status: 204 });
  }),
];
```

### Aggregating Handlers

```ts
// src/shared/api/mocks/handlers/index.ts
export { authHandlers } from "./auth";
export { todoHandlers } from "./todos";
export { profileHandlers } from "./profile";

// src/shared/api/mocks/http.ts
export { http, HttpResponse } from "msw";
```

## Error Handling

### API Error Schema

```yaml
# models/error.yaml
components:
  schemas:
    ApiError:
      type: object
      properties:
        statusCode:
          type: integer
        message:
          type: string
        errors:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
              message:
                type: string
      required: [statusCode, message]
```

### Error Handling in Hooks

```tsx
import type { ApiError } from "@/shared/api/schema";

export function useCreateTodo() {
  return useMutation({
    mutationFn: async (data: CreateTodoRequest) => {
      const { data: result, error } = await rqClient.POST("/todos", {
        body: data,
      });

      if (error) {
        const apiError = error as ApiError;
        throw new Error(apiError.message);
      }

      return result;
    },
    onError: error => {
      console.error("Failed to create todo:", error.message);
      // Show toast notification
    },
  });
}
```

## Best Practices

### Schema Best Practices

1. **Route versioning** — Use paths like `/v1/todos` for API versions
2. **Consistent naming** — Use plural nouns for collections (`/todos`, not `/todo`)
3. **Proper status codes** — 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 404 (Not Found), 500 (Server Error)
4. **Request/Response consistency** — Wrap arrays in objects: `{ data: [...] }` for consistency

### MSW Best Practices

1. **Mirror real API** — Match production endpoints exactly
2. **Realistic delays** — Use `delay()` to simulate network latency for testing
3. **Deterministic mocks** — Use seeds for consistent test data
4. **Separate handlers** — One file per resource/endpoint group

### Query Management

1. **Normalize query keys** — Use consistent patterns: `[resource, filter, sort]`
2. **Invalidate strategically** — Only invalidate affected queries after mutations
3. **Stale time**: Keep data fresh but cache for performance
4. **Error boundaries** — Always handle and display error states

## Workflow Summary

1. **Define schema** in OpenAPI YAML
2. **Generate types**: `pnpm api`
3. **Create handlers** in MSW for mocking
4. **Build hooks** using `rqClient` for queries/mutations
5. **Use in components** with proper loading/error states
6. **Test** with realistic mock data
