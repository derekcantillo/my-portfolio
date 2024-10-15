'use client'

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode
} from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
	theme: Theme
	toggleTheme: (newTheme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>('system')

	const applyTheme = (theme: Theme) => {
		const root = document.documentElement

		if (theme === 'dark') {
			root.classList.add('dark')
			root.classList.remove('light')
		} else if (theme === 'light') {
			root.classList.add('light')
			root.classList.remove('dark')
		} else {
			const systemPreference = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
			if (systemPreference) {
				root.classList.add('dark')
				root.classList.remove('light')
				setTheme('dark')
			} else {
				root.classList.add('light')
				root.classList.remove('dark')
				setTheme('light')
			}
		}
	}

	useEffect(() => {
		applyTheme(theme)
	}, [theme])

	useEffect(() => {
		if (theme === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

			const handleChange = (event: MediaQueryListEvent) => {
				if (event.matches) {
					document.documentElement.classList.add('dark')
					document.documentElement.classList.remove('light')
				} else {
					document.documentElement.classList.add('light')
					document.documentElement.classList.remove('dark')
				}
			}

			mediaQuery.addEventListener('change', handleChange) // Escucha cambios en las preferencias del sistema

			return () => {
				mediaQuery.removeEventListener('change', handleChange)
			}
		}
	}, [theme])

	const toggleTheme = (newTheme: Theme) => {
		setTheme(newTheme)
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
