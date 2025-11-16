'use server'

import { cosmic } from '@/lib/cosmic'

// Changed: Accept email string parameter instead of FormData
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Please provide a valid email address'
      }
    }

    // Check if email already exists
    try {
      const existingSubscriber = await cosmic.objects.find({
        type: 'newsletter-subscribers',
        'metadata.email': email
      })

      if (existingSubscriber.objects && existingSubscriber.objects.length > 0) {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter'
        }
      }
    } catch (error) {
      // If 404, email doesn't exist (this is good, continue)
      if ((error as any).status !== 404) {
        throw error
      }
    }

    // Create subscriber with proper date format
    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0] // YYYY-MM-DD format

    await cosmic.objects.insertOne({
      title: email,
      type: 'newsletter-subscribers',
      metadata: {
        email: email,
        subscribed_at: formattedDate, // Changed: Use YYYY-MM-DD format for date metafield
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