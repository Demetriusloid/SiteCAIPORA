import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MobilePreviewClient } from '@/components/mobile-preview-client'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f1915' },
    { media: '(prefers-color-scheme: light)', color: '#0f1915' },
  ],
}

export const metadata: Metadata = {
  title: 'CAIPORA - Monitoramento Ambiental Inteligente',
  description: 'Sistema de vigilância ambiental da Amazônia utilizando IoT, Inteligência Artificial e análise bioacústica para combater o desmatamento e a caça ilegal.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background overflow-x-hidden">
      <body className="font-sans antialiased bg-background min-w-0 touch-manipulation">
        <MobilePreviewClient />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
