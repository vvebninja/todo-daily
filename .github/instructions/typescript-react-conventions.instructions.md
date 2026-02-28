---
description: "Use when: writing TypeScript components, hooks, API logic, or structuring files in todo-daily. Covers project architecture, component patterns, styling, typing, and naming conventions."
applyTo: "src/**/*.{ts,tsx}"
---

# TypeScript React Conventions for todo-daily

## Project Structure & Organization

### Folder Organization

- **`app/`** — Application entry point, providers, router configuration
- **`features/`** — Feature modules (auth, todos, profile, landing). Each feature is self-contained with its models, UI components, and hooks
- **`shared/`** — Shared utilities, UI kit, API layer, models, and constants

### Feature Module Structure

Each feature (e.g., `features/auth/`) should follow:

```
feature-name/
├── feature-name.page.tsx        # Page component (exported as `Component`)
├── use-*.ts                      # Custom hooks for this feature
├── model/                        # Business logic, types, utils
│   ├── use-login.ts
│   └── use-register.ts
└── ui/                           # Reusable UI components for this feature
    ├── auth-layout.tsx
    ├── login-form.tsx
    └── register-form.tsx
```

### File Naming Conventions

- **Page components**: `feature-name.page.tsx` (exported as `Component` for lazy loading)
- **Custom hooks**: `use-*.ts` (e.g., `use-create-todo.ts`, `use-login.ts`)
- **UI components**: `ComponentName.tsx` (PascalCase)
- **Utility hooks**: `useHookName.ts`
- **Types/interfaces**: Define inline or in separate `.ts` files if reused
- **Lowercase with hyphens**: Layout files, utility files (`auth-layout.tsx`)

## TypeScript Standards

### Compiler Settings

- **Target**: ES2022 (`target: "ES2022"`)
- **Strict mode**: Enabled (`strict: true`)
- **Unused checks**: Enabled (`noUnusedLocals`, `noUnusedParameters`)
- **JSX**: `react-jsx` (automatic JSX runtime)
- **Module resolution**: `bundler`
- **Path aliases**: `@/*` → `./src/*`

### Typing Rules

1. **Always use `type` imports** for TypeScript-only constructs:

   ```ts
   import type { ReactNode } from "react";
   import type { ApiPaths } from "@/shared/api/schema";
   ```

2. **Explicit return types on exported functions**:

   ```ts
   export function useCreateTodo(): UseMutationResult<TodoResponse, Error> {
     // ...
   }

   export const Component = (): React.ReactElement => {
     /* ... */
   };
   ```

3. **Use `interface`** for object shapes, **`type`** for unions/intersections:

   ```ts
   interface TodoProps {
     id: string;
     title: string;
     isCompleted: boolean;
   }

   type TodoStatus = "pending" | "completed" | "archived";
   ```

4. **Avoid `any`** — use `unknown` with type guards or generics

## React Component Patterns

### Functional Components

All components are functional components with hooks:

```tsx
import type { ReactNode } from "react";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

function Layout({ title, children }: LayoutProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default Layout;
```

### Page Components (Lazy Loaded)

Export as `Component` for React Router lazy loading:

```tsx
function TodosPage() {
  return <div>Todos Page</div>;
}

export const Component = TodosPage;
```

### Component Composition

- Keep components small and focused
- Use composition over prop drilling
- Extract complex render logic into separate components

### Props Convention

- Use **destructuring** for props
- Name component props interfaces clearly with component name suffix: `ButtonProps`, `DialogProps`
- Always include `children?: ReactNode` if component accepts children

## Custom Hooks

### Naming & Organization

- File: `use-feature-name.ts`
- Export one hook per file
- Keep hooks in the feature folder for feature-specific logic
- Keep shared hooks in `shared/` folder

### Design Patterns

```ts
// Data fetching hook
export function useFeature() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["feature"],
    queryFn: () => fetchFeature(),
  });

  return { data, isLoading, error };
}

// Mutation hook
export function useCreateTodo() {
  return useMutation({
    mutationFn: createTodo,
  });
}

// Logic hook
export function useFormState(initialValues: FormValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  return { values, setValues, errors, setErrors };
}
```

## API & Data Fetching

### Query Client Setup

- Use TanStack React Query (`@tanstack/react-query`) for state management
- Configure query keys: `queryKey: ["resource", id, filter]`
- Use `useQuery()` for fetches, `useMutation()` for mutations

### API Schema

- Define API schema in `src/shared/api/schema/` (OpenAPI YAML)
- Generate types: `pnpm api` (runs openapi-typescript)
- Use generated types in fetch client

### Fetch Client

```ts
export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createReactQueryClient(fetchClient);
```

### Error Handling

Always handle errors explicitly:

```tsx
if (todos.error) {
  return <div className="text-red-500">{todos.error.message}</div>;
}

if (todos.isLoading) {
  return <Spinner />;
}
```

## Styling

### Tailwind CSS

- Use utility classes for all styling
- Prettier plugin sorts classes automatically
- Follow Tailwind conventions: spacing, colors, responsive prefixes

### Class Utilities

```ts
// src/shared/lib/css.ts
export const cn = (...classes: (string | undefined | false)[]): string => {
  // Merges Tailwind classes intelligently
};

// Usage
<div className={cn("px-4 py-2", isActive && "bg-blue-500")} />
```

### Component Styling

```tsx
import { cn } from "@/shared/lib/css";

function Button({ variant = "default", className, ...props }) {
  return (
    <button
      className={cn(
        "rounded px-4 py-2 font-medium",
        variant === "primary" && "bg-blue-500 text-white",
        className
      )}
      {...props}
    />
  );
}
```

## UI Kit Components

All reusable UI components are in `src/shared/ui/kit/`:

- `button.tsx` — Variants: default, destructive, outline, secondary, ghost, link
- `card.tsx` — Container with header, title, description, action
- `checkbox.tsx` — Native with Radix UI wrapper
- `dialog.tsx` — Modal with trigger, content, header
- `dropdown-menu.tsx` — Menu with items and groups
- `input.tsx` — Styled text input
- `label.tsx` — Form label
- `textarea.tsx` — Multi-line form input
- `field.tsx` — Wrapper with error handling

### Usage Example

```tsx
import { Button } from "@/shared/ui/kit/button";
import { Card, CardHeader, CardTitle } from "@/shared/ui/kit/card";

export function TodoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Todo</CardTitle>
      </CardHeader>
      <Button variant="default">Complete</Button>
    </Card>
  );
}
```

## ESLint & Code Quality Rules

### Enforced Rules

1. **Blank lines between logical blocks** — Improves readability
   - Always blank line before `return`
   - Always blank line before/after `if` statements
   - Always blank line before/after `function` definitions
   - Consecutive variable declarations can be grouped

2. **No magic numbers** — Use constants (exceptions: 0, 1, array indices)

   ```ts
   // Bad
   if (todos.length > 5) {
     /* ... */
   }

   // Good
   const MAX_TODOS = 5;
   if (todos.length > MAX_TODOS) {
     /* ... */
   }
   ```

3. **Import sorting** — Alphabetical order within groups

   ```ts
   // Group order: builtin → external → internal → parent → sibling → index
   import React from "react";
   import { useQuery } from "@tanstack/react-query";
   import { cn } from "@/shared/lib/css";
   import { Button } from "./button";
   ```

4. **Function complexity limit** — Max 10 (warning) — refactor if exceeding

### Run Linting

```bash
pnpm lint
```

## Import Paths

Always use path aliases:

```ts
// ✅ Good
import { Button } from "@/shared/ui/kit/button";
import { useTodos } from "@/features/todos/use-todos";

// ❌ Avoid
import { Button } from "../../../shared/ui/kit/button";
```

## Naming Conventions

### Functions & Variables

- **camelCase** for functions, variables, hooks
- **PascalCase** for components, types, interfaces, constants (exported)
- **kebab-case** for files (except components: PascalCase.tsx)
- **SCREAMING_SNAKE_CASE** for constants if uppercase is needed

Examples:

```ts
// Functions
const createTodo = () => { /* ... */ };
const useFetchTodos = () => { /* ... */ };

// Components
function Button() { /* ... */ }
const Card = () => { /* ... */ };

// Types
interface TodoProps { /* ... */ }
type TodoStatus = "pending" | "completed";

// Constants
const MAX_TITLE_LENGTH = 255;
export const ROUTES = { HOME: "/" };

// Files
src/features/todos/
├── todos.page.tsx
├── use-todos.ts
├── use-create-todo.ts
└── ui/
    └── todo-card.tsx
```

## Common Patterns

### Conditional Rendering

```tsx
// Clear, readable
const isLoading = todos.isLoading;
const hasError = !!todos.error;

if (isLoading) return <Spinner />;
if (hasError) return <ErrorMessage error={todos.error} />;

return <TodoList todos={todos.data} />;
```

### Event Handlers

```tsx
const handleCreateTodo = async () => {
  await createTodo.mutateAsync(values);
  onSuccess?.();
};

return <Button onClick={handleCreateTodo}>Create</Button>;
```

### Fragment Usage

```tsx
import { Fragment } from "react/jsx-runtime";

// When you need a wrapper without adding DOM node
return (
  <Fragment>
    <Header />
    <Content />
    <Footer />
  </Fragment>
);
```

## Router Integration

- Routes defined in `src/shared/model/routes.ts`
- Type-safe route parameters via `PathParams` interface
- Page components use `export const Component = PageComponent`

```tsx
// In routes.ts
export const ROUTES = {
  TODOS: "/todos",
  TODO: "/todos/:todoId",
  PROFILE: "/profile",
} as const;

// In component
import { useParams } from "react-router";

function TodoDetail() {
  const { todoId } = useParams<{ todoId: string }>();
  // ...
}
```

## Testing & Documentation

- Use MSW (Mock Service Worker) for API mocking
- Define handlers in `src/shared/api/mocks/handlers/`
- Keep components focused to ease testing
- Add JSDoc comments for complex logic

## Summary

✨ **Key principles**: Strict typing, feature-based organization, component composition, consistent naming, clear error handling, readable code with proper spacing and imports.
