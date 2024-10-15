'use client'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'app/context/themeContext'

export const ThemeToggle = (): JSX.Element => {
	const { theme, toggleTheme } = useTheme()

	const handleToggleTheme = () => {
		if (theme === 'light') {
			toggleTheme('dark')
		} else {
			toggleTheme('light')
		}
	}

	return (
		<button
			onClick={handleToggleTheme}
			className={`
          w-16 h-8 rounded-md relative
          ${theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-400'}
          transition-colors duration-300 ease-in-out
        `}
			aria-label={
				theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
			}
		>
			<div
				className={`
            absolute top-1 w-6 h-6
            ${theme === 'dark' ? 'left-9 bg-gray-200' : 'left-1 bg-white'}
            transition-all duration-300 ease-in-out
            flex items-center justify-center rounded-sm
          `}
			>
				{theme === 'dark' ? (
					<MoonIcon className="w-4 h-4 text-gray-700" />
				) : (
					<SunIcon className="w-4 h-4 text-yellow-500" />
				)}
			</div>
		</button>
	)
}
