import type { Post, Product } from '@/types'

interface StructuredDataProps {
  type: 'article' | 'product'
  data: Post | Product
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  if (type === 'article') {
    const post = data as Post
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.metadata?.title || post.title,
      image: post.metadata?.featured_image?.imgix_url
        ? `${post.metadata.featured_image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`
        : undefined,
      author: {
        '@type': 'Person',
        name: post.metadata?.author?.metadata?.name || post.metadata?.author?.title || 'Surf Hub',
        url: post.metadata?.author?.slug 
          ? `https://yourdomain.com/authors/${post.metadata.author.slug}`
          : undefined
      },
      publisher: {
        '@type': 'Organization',
        name: 'Surf Hub',
        logo: {
          '@type': 'ImageObject',
          url: 'https://yourdomain.com/logo.png'
        }
      },
      datePublished: post.metadata?.publish_date || post.created_at,
      dateModified: post.modified_at,
      description: post.metadata?.content?.substring(0, 160) || '',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://yourdomain.com/posts/${post.slug}`
      }
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    )
  }

  if (type === 'product') {
    const product = data as Product
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.metadata?.product_name || product.title,
      image: product.metadata?.product_images?.[0]?.imgix_url
        ? `${product.metadata.product_images[0].imgix_url}?w=2000&h=2000&fit=crop&auto=format,compress`
        : undefined,
      description: product.metadata?.description || '',
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'Surf Hub'
      },
      offers: {
        '@type': 'Offer',
        url: `https://yourdomain.com/shop/${product.slug}`,
        priceCurrency: 'USD',
        price: product.metadata?.price || 0,
        availability: product.metadata?.in_stock 
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '24'
      }
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    )
  }

  return null
}