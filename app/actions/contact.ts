'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormResult {
  success: boolean
  error?: string
}

export async function sendContactEmail(formData: FormData): Promise<ContactFormResult> {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: 'Please fill in all required fields.'
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address.'
      }
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Surf Travel Blog contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from the Surf Travel Blog contact form.
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        success: false,
        error: 'Failed to send email. Please try again later.'
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    }
  }
}