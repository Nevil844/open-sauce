'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-800">
        <span className="w-5 h-5">🌙</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="w-5 h-5 block">
        {theme === 'light' ? '🌙' : '🌞'}
      </span>
    </button>
  )
} 