import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartContext'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Surf Hub - Surf Travel Blog & Gear Shop',
  description: 'Discover the best surf destinations, learn surfing techniques, read gear reviews, and shop premium surf equipment. Your ultimate surf travel resource.',
  keywords: ['surf', 'surfing', 'travel', 'surf spots', 'surfboards', 'wetsuits', 'surf gear', 'surf blog'],
  authors: [{ name: 'Surf Hub Team' }],
  openGraph: {
    title: 'Surf Hub - Surf Travel Blog & Gear Shop',
    description: 'Discover the best surf destinations, learn surfing techniques, and shop premium surf equipment.',
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Surf Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surf Hub - Surf Travel Blog & Gear Shop',
    description: 'Discover the best surf destinations, learn surfing techniques, and shop premium surf equipment.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://yourdomain.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </CartProvider>
      </body>
    </html>
  )
}