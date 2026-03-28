import type { TodoCategory } from './categories'
import { useState } from 'react'
import { todoCategories } from './categories'

type Category = Omit<TodoCategory, 'icon'>

export function useSelectedTodoCategory() {
  const [selectedTodoCategory, setSelectedTodoCategory] = useState<Category>(
    todoCategories[0],
  )

  return {
    selectedTodoCategory,
    handleSelectedTodoCategoryClick(category: Category) {
      setSelectedTodoCategory(category)
    },
  }
}
