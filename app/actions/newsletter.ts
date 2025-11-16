'use server'

import { cosmic } from '@/lib/cosmic'

export async function subscribeToNewsletter(email: string) {
  try {
    // Create subscriber object in Cosmic
    await cosmic.objects.insertOne({
      title: email,
      type: 'newsletter-subscribers',
      metadata: {
        email,
        subscribed_at: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        status: 'Active'
      }
    })

    return { success: true, message: 'Successfully subscribed to newsletter!' }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { 
      success: false, 
      message: 'Failed to subscribe. Please try again later.' 
    }
  }
}