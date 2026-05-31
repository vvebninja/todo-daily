import { supabaseClientInstance } from './instance'

export interface Todo {
  id: string
  title: string
  description?: string
  isCompleted: boolean
}

export const todoService = {
  getAll: async () => {
    const { data, error } = await supabaseClientInstance
      .from('todos')
      .select('*')

    if (error) {
      throw error
    }

    return data
  },

  create: async (dto: Pick<Todo, 'title' | 'description'>): Promise<Todo> => {
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

  delete: async (id: Todo['id']) => {
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
  }: Pick<Todo, 'id' | 'isCompleted'>) => {
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
