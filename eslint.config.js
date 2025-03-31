import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'

// Criar uma instância de compatibilidade para carregar configs tradicionais
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
})

export default tseslint.config(
  { ignores: ['dist'] },
  ...compat.config({
    extends: ['@rocketseat/eslint-config/react', 'prettier'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid'
        }
      ],
      'no-unused-vars': 'off'
    }
  }),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  }
)
