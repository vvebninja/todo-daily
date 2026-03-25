import antfu from '@antfu/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'
import boundaries from 'eslint-plugin-boundaries'

export default antfu(
  {
    react: true,
    formatters: {
      css: true,
    },
  },
  ...pluginQuery.configs['flat/recommended'],
  {
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          rules: [
            { from: 'shared', disallow: ['features', 'app'] },
            { from: 'features', disallow: ['app'] },
          ],
        },
      ],
      'boundaries/entry-point': [
        'error',
        {
          default: 'disallow',
          rules: [
            { target: ['shared', 'app'], allow: '**' },
            { target: ['features'], allow: ['index.{ts,tsx}', '*.page.tsx'] },
          ],
        },
      ],
    },
  },
)
