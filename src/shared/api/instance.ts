import type { ApiPaths } from './schema'
import createFetchClient from 'openapi-fetch'
import createReactQueryClient from 'openapi-react-query'
import { CONFIG } from '../model/config'

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
})

export const rqClient = createReactQueryClient(fetchClient)
