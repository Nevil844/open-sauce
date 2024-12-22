import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'OpenSauce - GitHub Project Explorer',
  description: 'Discover and explore open source projects on GitHub',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
