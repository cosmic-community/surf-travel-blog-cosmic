'use client'

import { useState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: '' })

    const formData = new FormData()
    formData.append('email', email)

    try {
      const result = await subscribeToNewsletter(formData)

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Thanks for subscribing! Check your email for confirmation.'
        })
        setEmail('')
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-lg p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          🌊 Stay Updated with Surf Hub
        </h3>
        <p className="text-gray-600 mb-6">
          Get the latest surf travel guides, gear reviews, and exclusive deals delivered to your inbox weekly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status.type && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              status.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {status.message}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}