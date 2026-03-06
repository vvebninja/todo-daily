import type { ApiPaths } from '../schema'

import { createOpenApiHttp } from 'openapi-msw'

import { CONFIG } from '@/shared/model/config'

export const http = createOpenApiHttp<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
})
