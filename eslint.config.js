import antfu from '@antfu/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { eslintBoundariesConfig } from './eslint.boundaries.js'

export default antfu(
  {
    react: true,
    formatters: {
      css: true,
    },
  },
  ...pluginQuery.configs['flat/recommended'],
  eslintBoundariesConfig,
)
