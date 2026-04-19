import { createContext, use, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = Readonly<{
  children: React.ReactNode
  defaultTheme?: Theme
}>

type ThemeProviderState = Readonly<{
  theme: Theme
  toggleTheme: () => void
}>

const initialState: ThemeProviderState = {
  theme: 'system',
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const COLORSCHEME_STORAGE_KEY = 'colorscheme-key'

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(COLORSCHEME_STORAGE_KEY) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    toggleTheme: () => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      localStorage.setItem(COLORSCHEME_STORAGE_KEY, newTheme)
      setTheme(newTheme)
    },
  }

  return <ThemeProviderContext value={value}>{children}</ThemeProviderContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = use(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
