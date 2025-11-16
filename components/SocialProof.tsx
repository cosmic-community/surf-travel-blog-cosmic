'use client'

import { useState, useEffect } from 'react'

interface RecentAction {
  id: string
  type: 'purchase' | 'signup' | 'review'
  message: string
  location?: string
  timestamp: Date
}

export default function SocialProof() {
  const [currentAction, setCurrentAction] = useState<RecentAction | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Simulated recent actions - in production, fetch from API
  const recentActions: RecentAction[] = [
    {
      id: '1',
      type: 'purchase',
      message: 'Someone from California just purchased a Pro Shortboard',
      location: 'California',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: '2',
      type: 'signup',
      message: 'Someone from Hawaii just subscribed to the newsletter',
      location: 'Hawaii',
      timestamp: new Date(Date.now() - 1000 * 60 * 12)
    },
    {
      id: '3',
      type: 'purchase',
      message: 'Someone from Florida just purchased a Premium Wetsuit',
      location: 'Florida',
      timestamp: new Date(Date.now() - 1000 * 60 * 18)
    }
  ]

  useEffect(() => {
    // Show a random action every 15 seconds
    const showAction = () => {
      const randomAction = recentActions[Math.floor(Math.random() * recentActions.length)]
      // Fixed: Add undefined check before setting state
      if (randomAction) {
        setCurrentAction(randomAction)
        setIsVisible(true)

        // Hide after 5 seconds
        setTimeout(() => {
          setIsVisible(false)
        }, 5000)
      }
    }

    // Show first action after 3 seconds
    const initialTimeout = setTimeout(showAction, 3000)
    
    // Then show new actions every 20 seconds
    const interval = setInterval(showAction, 20000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  if (!currentAction || !isVisible) return null

  const getIcon = () => {
    switch (currentAction.type) {
      case 'purchase':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      case 'signup':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'review':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm animate-slide-in">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-900 font-medium">{currentAction.message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {Math.floor((Date.now() - currentAction.timestamp.getTime()) / 1000 / 60)} minutes ago
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}