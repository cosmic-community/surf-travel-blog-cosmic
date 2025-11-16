import { MetadataRoute } from 'next'
import { getPosts, getProducts, getCategories, getProductCategories, getAuthors } from '@/lib/cosmic'

// Helper function to safely create a valid Date object
function getSafeDate(dateString?: string): Date {
  if (!dateString) {
    return new Date()
  }
  
  // Try to parse the date string
  const date = new Date(dateString)
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return new Date()
  }
  
  return date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com'

  // Fetch all content
  const [posts, products, categories, productCategories, authors] = await Promise.all([
    getPosts(),
    getProducts(),
    getCategories(),
    getProductCategories(),
    getAuthors()
  ])

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Blog posts - Changed: Use getSafeDate to prevent Invalid time value errors
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: getSafeDate(post.modified_at || post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Products - Changed: Use getSafeDate to prevent Invalid time value errors
  const productPages = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: getSafeDate(product.modified_at || product.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Blog categories
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Product categories
  const productCategoryPages = productCategories.map((category) => ({
    url: `${baseUrl}/shop?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Authors
  const authorPages = authors.map((author) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...postPages,
    ...productPages,
    ...categoryPages,
    ...productCategoryPages,
    ...authorPages,
  ]
}