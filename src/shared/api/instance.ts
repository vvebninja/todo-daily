import type { ApiPaths } from './schema'
import { createClient } from '@supabase/supabase-js'
import createFetchClient from 'openapi-fetch'
import createReactQueryClient from 'openapi-react-query'
import { CONFIG } from '../model/config'

export const fetchClientInstance = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
})
export const rqClientInstance = createReactQueryClient(fetchClientInstance)
export const supabaseClientInstance = createClient(
  CONFIG.SUPABASE_BASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
)
