import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { CartProvider } from '@/components/CartContext'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Surf Travel Shop - Premium Surf Gear & Equipment',
  description: 'Shop the best surfboards, wetsuits, and accessories. Read expert surf travel guides and gear reviews. Free shipping on orders over $100.',
  keywords: 'surf shop, surfboards, wetsuits, surf gear, surf travel, surf blog, surf accessories',
  authors: [{ name: 'Surf Hub' }],
  openGraph: {
    title: 'Surf Travel Shop - Premium Surf Gear & Equipment',
    description: 'Shop the best surfboards, wetsuits, and accessories. Read expert surf travel guides and gear reviews.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Surf Hub'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surf Travel Shop - Premium Surf Gear & Equipment',
    description: 'Shop the best surfboards, wetsuits, and accessories. Read expert surf travel guides and gear reviews.'
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏄</text></svg>",
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;
  
  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
        <StructuredData 
          type="website" 
          data={{
            name: 'Surf Hub',
            description: 'Premium surf gear and expert travel guides',
            url: 'https://surfhub.com'
          }} 
        />
      </head>
      <body className={inter.className}>
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