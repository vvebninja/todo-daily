import { supabaseClientInstance } from './instance'

export interface Todo {
  id: string
  title: string
  description?: string
  isCompleted: boolean
}

export type TodoStatus = 'active' | 'completed'

const TODO_TABLE_NAME = 'todos'

export const todoService = {
  getAll: async () => {
    const { data, error } = await supabaseClientInstance
      .from(TODO_TABLE_NAME)
      .select('*')

    if (error) {
      throw error
    }

    return data
  },

  create: async ({ title }: { title: Todo['title'] }): Promise<Todo> => {
    const { data, error } = await supabaseClientInstance
      .from(TODO_TABLE_NAME)
      .insert([{ title }])
      .select()
      .single()

    if (error) {
      throw error
    }
    return data
  },

  deleteById: async (id: Todo['id']) => {
    const { error } = await supabaseClientInstance
      .from(TODO_TABLE_NAME)
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }
  },

  deleteByStatus: async (status: TodoStatus) => {
    const { error } = await supabaseClientInstance
      .from(TODO_TABLE_NAME)
      .delete()
      .eq('isCompleted', status === 'completed')

    if (error) {
      throw error
    }
  },

  deleteAll: async () => {
    const NIL_UUID = '00000000-0000-0000-0000-000000000000'

    const { error } = await supabaseClientInstance
      .from(TODO_TABLE_NAME)
      .delete()
      .neq('id', NIL_UUID)

    if (error) {
      throw error
    }
  },

  toggleComplete: async ({
    id,
    isCompleted,
  }: Pick<Todo, 'id' | 'isCompleted'>) => {
    const { data, error } = await supabaseClientInstance
      .from(TODO_TABLE_NAME)
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
