'use client'

import { useState } from 'react'

export default function AffiliateDisclosure() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-amber-900 font-medium">
            Affiliate Disclosure
          </p>
          <div className={`text-sm text-amber-800 mt-1 ${isExpanded ? '' : 'line-clamp-2'}`}>
            This post may contain affiliate links. If you purchase through these links, we may earn a commission at no additional cost to you. This helps support our content and allows us to continue providing valuable surf travel information.
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-amber-700 hover:text-amber-900 font-medium mt-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>
      </div>
    </div>
  )
}