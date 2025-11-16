import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartContext'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Surf Hub - Surf Travel Blog & Gear Shop',
    template: '%s | Surf Hub'
  },
  description: 'Discover the best surf destinations, learn surfing techniques, read gear reviews, and shop premium surf equipment. Your ultimate surf travel resource.',
  keywords: ['surf', 'surfing', 'travel', 'surf spots', 'surfboards', 'wetsuits', 'surf gear', 'surf blog', 'surf shop', 'surf equipment'],
  authors: [{ name: 'Surf Hub Team', url: 'https://yourdomain.com' }],
  creator: 'Surf Hub',
  publisher: 'Surf Hub',
  openGraph: {
    title: 'Surf Hub - Surf Travel Blog & Gear Shop',
    description: 'Discover the best surf destinations, learn surfing techniques, and shop premium surf equipment.',
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Surf Hub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Surf Hub - Surf Travel & Gear'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surf Hub - Surf Travel Blog & Gear Shop',
    description: 'Discover the best surf destinations, learn surfing techniques, and shop premium surf equipment.',
    creator: '@surfhub',
    images: ['/og-image.jpg']
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
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code'
  },
  alternates: {
    canonical: 'https://yourdomain.com'
  },
  category: 'sports',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0ea5e9" />
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