'use client'

import { useState, useEffect } from 'react'

interface UrgencyIndicatorProps {
  type: 'stock' | 'time' | 'demand'
  value?: number | string
  threshold?: number
}

export default function UrgencyIndicator({ type, value, threshold = 5 }: UrgencyIndicatorProps) {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    if (type === 'time' && typeof value === 'string') {
      const endTime = new Date(value).getTime()
      
      const updateTimer = () => {
        const now = new Date().getTime()
        const distance = endTime - now
        
        if (distance < 0) {
          setTimeLeft('Offer expired')
          return
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
      }
      
      updateTimer()
      const interval = setInterval(updateTimer, 1000)
      
      return () => clearInterval(interval)
    }
  }, [type, value])

  if (type === 'stock' && typeof value === 'number') {
    if (value <= threshold) {
      return (
        <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-semibold">Only {value} left in stock!</span>
        </div>
      )
    }
  }

  if (type === 'time' && timeLeft) {
    return (
      <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-semibold">Deal ends in: {timeLeft}</span>
      </div>
    )
  }

  if (type === 'demand' && typeof value === 'number') {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span className="font-semibold">{value} people viewing this right now</span>
      </div>
    )
  }

  return null
}