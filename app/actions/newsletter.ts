'use server'

import { cosmic } from '@/lib/cosmic'

// Changed: Accept email string directly instead of FormData
export async function subscribeToNewsletter(email: string) {
  try {
    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Please provide a valid email address'
      }
    }

    // Check if email already exists
    try {
      const existingSubscriber = await cosmic.objects.findOne({
        type: 'newsletter-subscribers',
        'metadata.email': email
      })

      if (existingSubscriber) {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter'
        }
      }
    } catch (error) {
      // 404 means email doesn't exist, which is what we want
    }

    // Changed: Format date as YYYY-MM-DD for Cosmic date metafield
    const currentDate = new Date().toISOString().split('T')[0]

    // Create new subscriber
    await cosmic.objects.insertOne({
      title: email,
      type: 'newsletter-subscribers',
      metadata: {
        email: email,
        subscribed_at: currentDate,
        status: 'Active'
      }
    })

    return {
      success: true,
      message: 'Successfully subscribed! Check your inbox for confirmation.'
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    }
  }
}