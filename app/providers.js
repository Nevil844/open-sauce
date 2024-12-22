'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'

export function Providers({ children }) {
  useEffect(() => {
    // Force dark mode on initial load
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
} 