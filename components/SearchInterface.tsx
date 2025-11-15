'use client'

import { useState, useMemo } from 'react'
import PostCard from '@/components/PostCard'
import type { Post, Category, Author } from '@/types'

interface SearchInterfaceProps {
  posts: Post[]
  categories: Category[]
  authors: Author[]
}

export default function SearchInterface({ posts, categories, authors }: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest')

  // Filter and search posts in real-time
  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => {
        const title = (post.metadata?.title || post.title).toLowerCase()
        const content = (post.metadata?.content || '').toLowerCase()
        const authorName = post.metadata?.author?.metadata?.name?.toLowerCase() || ''
        
        return title.includes(query) || 
               content.includes(query) || 
               authorName.includes(query)
      })
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => {
        const postCategories = post.metadata?.categories || []
        return postCategories.some(cat => cat.id === selectedCategory)
      })
    }

    // Apply author filter
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(post => 
        post.metadata?.author?.id === selectedAuthor
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        const dateA = new Date(a.metadata?.publish_date || '').getTime()
        const dateB = new Date(b.metadata?.publish_date || '').getTime()
        return dateB - dateA
      } else if (sortBy === 'oldest') {
        const dateA = new Date(a.metadata?.publish_date || '').getTime()
        const dateB = new Date(b.metadata?.publish_date || '').getTime()
        return dateA - dateB
      } else {
        // Sort by title
        const titleA = (a.metadata?.title || a.title).toLowerCase()
        const titleB = (b.metadata?.title || b.title).toLowerCase()
        return titleA.localeCompare(titleB)
      }
    })

    return filtered
  }, [posts, searchQuery, selectedCategory, selectedAuthor, sortBy])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedAuthor('all')
    setSortBy('newest')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedAuthor !== 'all' || sortBy !== 'newest'

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        {/* Search Input */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, content, or author..."
              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.metadata?.name || category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Author Filter */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <select
              id="author"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="all">All Authors</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.metadata?.name || author.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredPosts.length === 0 ? (
            <span>No articles found</span>
          ) : (
            <span>
              Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'article' : 'articles'}
            </span>
          )}
        </p>
      </div>

      {/* Results Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg 
            className="mx-auto w-16 h-16 text-gray-300 mb-4"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}