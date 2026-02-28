---
description: "Use when: optimizing components, discussing performance, accessibility, or design system decisions. Covers Tailwind best practices, component optimization, and accessibility rules."
---

# Performance & Accessibility Guidelines

## Tailwind CSS Best Practices

### Class Naming & Organization

- **Utility-first approach** — Use Tailwind utilities directly, avoid custom CSS
- **Responsive modifiers** — Mobile-first: `sm:`, `md:`, `lg:`, `xl:`
- **State modifiers** — `hover:`, `focus:`, `active:`, `group-hover:`
- **Dark mode** — Use `dark:` prefix for dark theme variants

### Example Component Styling

```tsx
// ✅ Good: Clear responsive and state modifiers
<div className="px-4 py-2 sm:px-6 md:py-3 bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
  Content
</div>

// ❌ Avoid: Unclear hierarchy and missing responsive
<div className="p-2 bg-white hover:bg-gray-50">
  Content
</div>
```

### Color System

Use project's color palette defined in Tailwind config:

- **Primary**: Primary brand color
- **Secondary**: Secondary accents
- **Destructive**: Error/delete actions
- **Foreground/Background**: Semantic white/dark
- **Ring**: Focus states

```tsx
// ✅ Use semantic color names
<button className="bg-primary text-primary-foreground hover:bg-primary/90" />

// ❌ Avoid: Arbitrary colors
<button className="bg-blue-500 text-white" />
```

### Spacing System

Use consistent spacing scale (multiples of 4px):

```tsx
// ✅ Good: Use spacing utilities
<div className="mb-4 px-4 py-2">
  <h1 className="text-lg font-semibold mb-2">Title</h1>
  <p className="text-sm text-gray-600">Description</p>
</div>

// ❌ Avoid: Hardcoded pixels
<div style={{ marginBottom: "18px", padding: "10px" }}>
  ...
</div>
```

### Class Merging with `cn()`

Use `cn()` from `@/shared/lib/css` to intelligently merge Tailwind classes:

```tsx
import { cn } from "@/shared/lib/css";

interface CardProps {
  variant?: "default" | "outline";
  className?: string;
}

function Card({ variant = "default", className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        variant === "outline" && "border-2 border-slate-200",
        variant === "default" && "shadow-md",
        className
      )}
    >
      {/* Content */}
    </div>
  );
}
```

### Prettier + Tailwind Plugin

The Prettier plugin (`prettier-plugin-tailwindcss`) automatically:

- Sorts utility classes in the correct order
- Removes duplicate classes
- Organizes by layer (sizing → layout → flex → typography → colors)

**No manual sorting needed** — Let Prettier handle it.

## Component Optimization

### Code Splitting & Lazy Loading

Page components are lazy-loaded via React Router:

```tsx
// ✅ In router config
{
  path: "/todos",
  lazy: () => import("@/features/todos/todos.page"),
}

// ✅ In page file
export const Component = TodosPage;
```

### Preventing Unnecessary Re-renders

```tsx
// ✅ Good: Memoize expensive components
import { memo } from "react";

const TodoCard = memo(function TodoCard({ todo }: TodoCardProps) {
  return <Card>{todo.title}</Card>;
});

// ✅ Good: Use useCallback for stable function references
const handleToggle = useCallback(
  (todoId: string) => {
    toggleTodo(todoId);
  },
  [toggleTodo]
);

// ❌ Avoid: Creating functions inline
const handleToggle = (todoId: string) => toggleTodo(todoId);
```

### Query Optimization

```tsx
// ✅ Good: Specific query keys for invalidation
queryClient.invalidateQueries({
  queryKey: ["todos"],
});

// ❌ Avoid: Invalidating too broadly
queryClient.invalidateQueries(); // Invalidates everything
```

### List Rendering

```tsx
// ✅ Good: Proper key prop using stable IDs
{
  todos.map(todo => <TodoCard key={todo.id} todo={todo} />);
}

// ❌ Avoid: Using index as key
{
  todos.map((todo, index) => <TodoCard key={index} todo={todo} />);
}
```

## Accessibility (a11y)

### Semantic HTML

Always use semantic elements:

```tsx
// ✅ Good: Semantic structure
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

// ❌ Avoid: Non-semantic divs
<div>
  <div>
    <div>
      <div onClick={...}>Home</div>
    </div>
  </div>
</div>
```

### ARIA Labels & Attributes

```tsx
// ✅ Good: Explicit labels
<button
  aria-label="Delete todo"
  onClick={handleDelete}
>
  <TrashIcon />
</button>

<dialog aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Action</h2>
</dialog>

// ✅ Use aria-invalid for form errors
<input
  aria-invalid={!!errors.title}
  aria-describedby="title-error"
/>
<span id="title-error">{errors.title}</span>
```

### Keyboard Navigation

All interactive elements must be keyboard accessible:

```tsx
// ✅ Good: Native button (keyboard accessible by default)
<button onClick={handleClick}>Click me</button>

// ✅ Custom interactive element with role
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={e => e.key === "Enter" && handleClick()}
>
  Click me
</div>

// ❌ Avoid: Non-interactive elements with onClick
<div onClick={handleClick}>Click me</div>
```

### Color Contrast

- **Text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **Use Tailwind's color system**: It provides accessible color combinations

```tsx
// ✅ Good: High contrast combinations
<div className="bg-white text-slate-900">Light background, dark text</div>

// ❌ Avoid: Low contrast
<div className="bg-gray-100 text-gray-400">Light background, light text</div>
```

### Focus States

All interactive elements need visible focus states:

```tsx
// Tailwind provides built-in focus styles
<button className="rounded focus:outline-none focus:ring-2 focus:ring-primary">
  Button
</button>

// Or use focus-visible for keyboard only
<button className="focus-visible:ring-2 focus-visible:ring-primary">
  Button
</button>
```

### Form Labels

Every form input must have an associated label:

```tsx
// ✅ Good: Explicit label association
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Good: Implicit association
<label>
  Email
  <input type="email" />
</label>

// ❌ Avoid: No label
<input type="email" placeholder="Email" />
```

## Performance Metrics

### Key Web Vitals to Monitor

- **Largest Contentful Paint (LCP)** < 2.5s
- **First Input Delay (FID)** < 100ms
- **Cumulative Layout Shift (CLS)** < 0.1

### Optimization Strategies

1. **Minimize JavaScript** — Lazy load heavy components
2. **Cache queries** — Use `staleTime` and `gcTime` wisely
3. **Debounce search** — Use React Query's `enabled` flag
4. **Image optimization** — Use native `<img>` with proper sizing

### React Query Best Practices

```tsx
// ✅ Good: Stale time prevents unnecessary requests
const todos = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

// ✅ Good: Conditional queries
const user = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // Don't fetch if no userId
});

// ✅ Good: Pagination to reduce data
const todos = useQuery({
  queryKey: ["todos", page, limit],
  queryFn: () => fetchTodos(page, limit),
});
```

## Testing Considerations

### Component Testing

- Test user interactions, not implementation details
- Use semantic queries: `getByRole()`, `getByLabelText()`
- Mock API calls with MSW

### Accessibility Testing

- Use `axe-core` or `jest-axe` in tests
- Verify keyboard navigation
- Check color contrast in CI/CD pipeline

Example test:

```tsx
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

test("Button is accessible", async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
```

## Summary

✨ **Key principles**:

- Utility-first styling with Tailwind
- Semantic HTML and ARIA attributes
- Keyboard navigation & focus states
- High color contrast
- Proper form labels
- Lazy loading & code splitting
- Proper React Query caching
