'use server'

import { cosmic } from '@/lib/cosmic'

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      }
    }

    // Check if email already exists
    try {
      const existingSubscriber = await cosmic.objects.find({
        type: 'newsletter-subscribers',
        'metadata.email': email
      })

      if (existingSubscriber.objects.length > 0) {
        return {
          success: false,
          message: 'This email is already subscribed'
        }
      }
    } catch (error) {
      // 404 means no existing subscriber, which is what we want
      if (error && typeof error === 'object' && 'status' in error && error.status !== 404) {
        throw error
      }
    }

    // Format date as YYYY-MM-DD for Cosmic date metafield
    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0] // Format: YYYY-MM-DD

    // Create new subscriber
    await cosmic.objects.insertOne({
      title: email,
      type: 'newsletter-subscribers',
      metadata: {
        email: email,
        subscribed_at: formattedDate,
        status: 'Active'
      }
    })

    return {
      success: true,
      message: '🎉 Successfully subscribed! Check your inbox for a welcome email.'
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    }
  }
}