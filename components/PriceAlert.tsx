'use client'

import { useState } from 'react'

interface PriceAlertProps {
  productId: string
  productName: string
  currentPrice: number
}

export default function PriceAlert({ productId, productName, currentPrice }: PriceAlertProps) {
  const [email, setEmail] = useState('')
  const [targetPrice, setTargetPrice] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // In production, save to Cosmic or send to price tracking service
    setTimeout(() => {
      setStatus('success')
      setMessage('Price alert set! We\'ll notify you when the price drops.')
      setEmail('')
      setTargetPrice('')
    }, 1000)
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start gap-3 mb-4">
        <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Set Price Alert</h3>
          <p className="text-sm text-gray-600">
            Get notified when the price drops below your target
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            max={currentPrice}
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder={`Below $${currentPrice.toFixed(2)}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Setting Alert...' : status === 'success' ? '✓ Alert Set' : 'Notify Me'}
        </button>

        {message && (
          <p className={`text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}