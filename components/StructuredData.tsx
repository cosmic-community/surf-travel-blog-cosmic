import type { Post, Product } from '@/types'

interface StructuredDataProps {
  type: 'article' | 'product' | 'website'
  data: Post | Product | { name: string; description: string; url: string }
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {}

  if (type === 'article' && 'metadata' in data) {
    const post = data as Post
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.metadata?.title || post.title,
      image: post.metadata?.featured_image?.imgix_url 
        ? `${post.metadata.featured_image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`
        : undefined,
      datePublished: post.metadata?.publish_date,
      dateModified: post.modified_at,
      author: post.metadata?.author ? {
        '@type': 'Person',
        name: post.metadata.author.metadata?.name || post.metadata.author.title,
        url: `https://surfhub.com/authors/${post.metadata.author.slug}`
      } : undefined,
      publisher: {
        '@type': 'Organization',
        name: 'Surf Hub',
        logo: {
          '@type': 'ImageObject',
          url: 'https://surfhub.com/logo.png'
        }
      },
      description: post.metadata?.content?.substring(0, 160) || '',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://surfhub.com/posts/${post.slug}`
      }
    }
  } else if (type === 'product' && 'metadata' in data) {
    const product = data as Product
    const price = product.metadata?.price || 0
    const inStock = product.metadata?.in_stock ?? true
    const images = product.metadata?.product_images || []

    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.metadata?.product_name || product.title,
      image: images.map(img => `${img.imgix_url}?w=2000&h=2000&fit=crop&auto=format,compress`),
      description: product.metadata?.description || '',
      sku: product.id,
      offers: {
        '@type': 'Offer',
        url: `https://surfhub.com/shop/${product.slug}`,
        priceCurrency: 'USD',
        price: price.toFixed(2),
        availability: inStock 
          ? 'https://schema.org/InStock' 
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Surf Hub'
        }
      },
      brand: {
        '@type': 'Brand',
        name: 'Surf Hub'
      }
    }
  } else if (type === 'website') {
    const site = data as { name: string; description: string; url: string }
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      description: site.description,
      url: site.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${site.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}