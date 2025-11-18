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
    
    if (!email || !targetPrice) {
      setStatus('error')
      setMessage('Please fill in all fields')
      return
    }

    const target = parseFloat(targetPrice)
    if (isNaN(target) || target >= currentPrice) {
      setStatus('error')
      setMessage('Target price must be lower than current price')
      return
    }

    setStatus('loading')
    
    // In production, this would save to your database/backend
    // For now, simulate success
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
        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Price Drop Alert</h3>
          <p className="text-sm text-gray-600">Get notified when this product goes on sale</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="alert-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="alert-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 text-sm"
          />
        </div>

        <div>
          <label htmlFor="target-price" className="block text-sm font-medium text-gray-700 mb-1">
            Alert me when price drops below
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              id="target-price"
              type="number"
              step="0.01"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder={`${(currentPrice * 0.9).toFixed(2)}`}
              disabled={status === 'loading' || status === 'success'}
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {status === 'loading' ? 'Setting Alert...' : status === 'success' ? 'Alert Set!' : 'Notify Me'}
        </button>

        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  )
}