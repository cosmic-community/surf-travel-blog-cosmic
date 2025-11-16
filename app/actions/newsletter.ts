'use server'

import { Resend } from 'resend'
import { cosmic } from '@/lib/cosmic'

const resend = new Resend(process.env.RESEND_API_KEY)

interface NewsletterResult {
  success: boolean
  error?: string
}

export async function subscribeToNewsletter(formData: FormData): Promise<NewsletterResult> {
  try {
    const email = formData.get('email') as string

    // Validate email
    if (!email) {
      return {
        success: false,
        error: 'Please enter your email address.'
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address.'
      }
    }

    // Check if email already exists
    try {
      const existing = await cosmic.objects.find({
        type: 'newsletter-subscribers',
        'metadata.email': email
      })

      if (existing.objects && existing.objects.length > 0) {
        return {
          success: false,
          error: 'This email is already subscribed.'
        }
      }
    } catch (error) {
      // 404 means no existing subscriber, which is fine
    }

    // Create subscriber in Cosmic
    await cosmic.objects.insertOne({
      title: email,
      type: 'newsletter-subscribers',
      metadata: {
        email,
        subscribed_at: new Date().toISOString(),
        status: 'Active'
      }
    })

    // Send welcome email
    const { error } = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: email,
      subject: '🏄 Welcome to Surf Hub Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">🏄 Welcome to Surf Hub!</h1>
          </div>
          
          <div style="background: white; padding: 40px 20px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
              Thanks for subscribing! You're now part of the Surf Hub community.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Here's what you can expect:
            </p>
            
            <ul style="color: #666; line-height: 1.8; margin-bottom: 30px;">
              <li>🌊 Weekly surf travel guides and destination spotlights</li>
              <li>🏄 Expert tips and technique tutorials</li>
              <li>🛍️ Exclusive deals on premium surf gear</li>
              <li>📸 Stunning surf photography from around the globe</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://surfhub.com" style="display: inline-block; background: #0ea5e9; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Explore Surf Hub
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              You're receiving this because you subscribed to Surf Hub newsletter.<br>
              <a href="#" style="color: #0ea5e9;">Unsubscribe</a> | <a href="#" style="color: #0ea5e9;">Manage Preferences</a>
            </p>
          </div>
        </div>
      `,
      text: `
Welcome to Surf Hub!

Thanks for subscribing! You're now part of the Surf Hub community.

Here's what you can expect:
- Weekly surf travel guides and destination spotlights
- Expert tips and technique tutorials
- Exclusive deals on premium surf gear
- Stunning surf photography from around the globe

Visit us at: https://surfhub.com

You're receiving this because you subscribed to Surf Hub newsletter.
      `
    })

    if (error) {
      console.error('Resend error:', error)
      // Don't fail the subscription if email fails
    }

    return { success: true }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    }
  }
}