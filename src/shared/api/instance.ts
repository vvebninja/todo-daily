import { createClient } from '@supabase/supabase-js'
import { CONFIG } from '../model/config'

export const supabaseClientInstance = createClient(
  CONFIG.SUPABASE_BASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
)
