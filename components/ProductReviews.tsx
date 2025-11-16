'use client'

import { useState } from 'react'

interface Review {
  id: string
  author: string
  rating: number
  date: string
  title: string
  content: string
  verified?: boolean
}

interface ProductReviewsProps {
  productId: string
  productName: string
  reviews?: Review[]
}

export default function ProductReviews({ productId, productName, reviews = [] }: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false)
  
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0
  
  // Generate review schema for SEO
  const reviewSchema = reviews.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1'
      },
      name: review.title,
      reviewBody: review.content
    }))
  } : null

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (reviews.length === 0) {
    return (
      <div className="py-12 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
      </div>
    )
  }

  return (
    <div className="py-12 border-t border-gray-200">
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="text-lg font-semibold text-gray-900">
              {averageRating.toFixed(1)} out of 5
            </span>
          </div>
          <span className="text-gray-600">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">{review.author}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-600">{review.content}</p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  )
}