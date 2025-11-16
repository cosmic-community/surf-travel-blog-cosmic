import SearchInterface from '@/components/SearchInterface'
import { getPosts, getCategories, getAuthors } from '@/lib/cosmic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search - Surf Travel Blog',
  description: 'Search through our surf travel articles and stories',
}

export default async function SearchPage() {
  // Fetch all data needed for search
  const [posts, categories, authors] = await Promise.all([
    getPosts(),
    getCategories(),
    getAuthors()
  ])

  return (
    <div className="py-16">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search Articles
          </h1>
          <p className="text-xl text-gray-600">
            Find surf travel stories, destinations, and tips
          </p>
        </div>
        
        <SearchInterface 
          posts={posts}
          categories={categories}
          authors={authors}
        />
      </div>
    </div>
  )
}