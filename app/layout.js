import './globals.css'

export const metadata = {
  title: 'Lencana Malaysia - Gamified Explorer',
  description: 'Discover, Learn, and Earn the Honors of Malaysia. A progressive web app that transforms learning about Malaysian national badges into an engaging adventure.',
  manifest: '/manifest.json',
  themeColor: '#1a365d',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
