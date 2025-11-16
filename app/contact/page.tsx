import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - Surf Hub',
  description: 'Get in touch with us for surf travel tips, gear questions, collaboration opportunities, or general inquiries.',
}

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Have questions about surf destinations, gear, or techniques? Want to collaborate or need help with an order? 
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
        
        <ContactForm />
      </div>
    </div>
  )
}