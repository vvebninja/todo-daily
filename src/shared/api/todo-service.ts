// eslint-disable-next-line boundaries/entry-point, boundaries/element-types
import type { TodoCategory } from '@/features/todos/model/categories'
import { supabaseClientInstance } from './instance'

type TodoDto = Readonly<{
  id: string
  title: string
  description: string
  isCompleted: boolean
}>

export const todoService = {
  getAll: async (category?: TodoCategory['value']) => {
    let query = supabaseClientInstance.from('todos').select('*')

    if (category) {
      const isCompleted = category === 'completed'
      query = query.eq('isCompleted', isCompleted)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }
    return data || []
  },

  create: async (
    dto: Pick<TodoDto, 'title' | 'description'>,
  ): Promise<TodoDto> => {
    const { data, error } = await supabaseClientInstance
      .from('todos')
      .insert([dto])
      .select()
      .single()

    if (error) {
      throw error
    }
    return data
  },

  delete: async (id: TodoDto['id']) => {
    const { error } = await supabaseClientInstance
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }
  },

  toggleComplete: async ({
    id,
    isCompleted,
  }: Pick<TodoDto, 'id' | 'isCompleted'>) => {
    const { data, error } = await supabaseClientInstance
      .from('todos')
      .update({ isCompleted })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }
    return data
  },
}
