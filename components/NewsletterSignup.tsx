'use client'

import { useState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      // Changed: Pass email string directly instead of FormData
      const result = await subscribeToNewsletter(email)
      
      if (result.success) {
        setStatus('success')
        setMessage(result.message)
        setEmail('')
      } else {
        // Changed: Handle error case properly - result has success and message properties
        setStatus('error')
        setMessage(result.message)
      }
    } catch (error) {
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="bg-primary/5 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Stay Updated with Surf News
      </h2>
      <p className="text-gray-600 mb-6">
        Get the latest surf travel guides, gear reviews, and tips delivered to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
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