import type { TodoCategory } from '@/features/todos/model/categories'
import { supabaseClientInstance } from './instance'

type TodoDto = Readonly<{
  title: string
  description: string
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

  delete: async (id: string) => {
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
  }: {
    id: string
    isCompleted: boolean
  }) => {
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
