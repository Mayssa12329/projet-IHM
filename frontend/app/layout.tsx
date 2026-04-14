import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Communauté - Inscription',
  description: 'Rejoignez notre communauté en quelques étapes simples',
  icons: {
    icon: [
      {
        url: '/icon-new.png?v=4',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-new.png?v=4',
        media: '(prefers-color-scheme: dark)',
      }
    ],
    apple: '/apple-icon.png?v=4',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
