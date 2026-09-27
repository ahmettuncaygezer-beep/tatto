// app/layout.tsx
// Root layout — SmoothScrollProvider, global cursor + audio bus

import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/features/scroll/SmoothScrollProvider'
import { CustomCursor } from '@/features/cursor/CustomCursor'

export const metadata: Metadata = {
  title: 'Tuncay Gezer — Artist Office | Anatomik Heykel & Biyomekanik Dövme Atölyesi',
  description:
    'Tuncay Gezer Artist Office — Yüksek anatomik, heykelsi ve biyomekanik dövme atölyesi. Kintsugi, Baroque ve Rönesans formlarını tek bir yaşayan anıtta buluşturuyoruz.',
  keywords: [
    'tuncay gezer',
    'anatomik dövme',
    'biyomekanik tattoo',
    'kintsugi tattoo',
    'heykel dövme',
    'artist office',
  ],
  openGraph: {
    title: 'Tuncay Gezer — Artist Office',
    description: 'Yaşayan Anıt. Her beden kırılan ve yeniden inşa edilen bir heykeldir.',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="bg-black" style={{ backgroundColor: '#000000', colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black text-white selection:bg-gold selection:text-black" style={{ backgroundColor: '#000000' }} suppressHydrationWarning>
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
