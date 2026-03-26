import type { TodoCategory } from './categories'
import { useState } from 'react'
import { todoCategories } from './categories'

export function useSelectedTodoCategory() {
  const [selectedTodoCategory, setSelectedTodoCategory]
    = useState<TodoCategory>(todoCategories[0])

  return {
    selectedTodoCategory,
    handleSelectedTodoCategoryClick(category: TodoCategory) {
      setSelectedTodoCategory(category)
    },
  }
}
