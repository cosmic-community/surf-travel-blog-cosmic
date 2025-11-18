'use client'

import { useState, useEffect } from 'react'

interface RecentActivity {
  type: 'purchase' | 'signup' | 'review'
  message: string
  location: string
  time: string
}

export default function SocialProof() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentActivity, setCurrentActivity] = useState<RecentActivity | null>(null)

  // Sample activities - in production, fetch from API
  const activities: RecentActivity[] = [
    {
      type: 'purchase',
      message: 'Someone in California just purchased a Pro Shortboard',
      location: 'Los Angeles, CA',
      time: '2 minutes ago'
    },
    {
      type: 'purchase',
      message: 'Someone in Hawaii just purchased a Premium Wetsuit',
      location: 'Honolulu, HI',
      time: '5 minutes ago'
    },
    {
      type: 'signup',
      message: 'Someone from Florida just subscribed',
      location: 'Miami, FL',
      time: '8 minutes ago'
    },
    {
      type: 'review',
      message: 'Someone left a 5-star review',
      location: 'San Diego, CA',
      time: '12 minutes ago'
    }
  ]

  useEffect(() => {
    let currentIndex = 0
    
    const showActivity = () => {
      const activity = activities[currentIndex]; // Changed: Store in variable first
      if (activity) { // Changed: Add null check
        setCurrentActivity(activity)
        setIsVisible(true)
        
        // Hide after 5 seconds
        setTimeout(() => {
          setIsVisible(false)
        }, 5000)
        
        currentIndex = (currentIndex + 1) % activities.length
      }
    }

    // Show first activity after 3 seconds
    const initialTimer = setTimeout(showActivity, 3000)
    
    // Show new activity every 15 seconds
    const intervalTimer = setInterval(() => {
      showActivity()
    }, 15000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(intervalTimer)
    }
  }, [])

  if (!isVisible || !currentActivity) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm animate-slide-up">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          {currentActivity.type === 'purchase' && (
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
          {currentActivity.type === 'signup' && (
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          )}
          {currentActivity.type === 'review' && (
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 mb-1">
            {currentActivity.message}
          </p>
          <p className="text-xs text-gray-500">
            {currentActivity.location} • {currentActivity.time}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}