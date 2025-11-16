'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // Clear cart after successful order
    clearCart()

    const orderId = searchParams.get('order_id')
    if (orderId) {
      // Fetch order details
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => setOrderDetails(data))
        .catch((err) => console.error('Failed to fetch order:', err))
    }
  }, [searchParams, clearCart])

  return (
    <div className="py-16">
      <div className="container max-w-2xl text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>

        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-6 my-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Order Number:</span>{' '}
                {orderDetails.metadata?.order_number}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total Amount:</span>{' '}
                ${orderDetails.metadata?.total_amount?.toFixed(2)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Status:</span>{' '}
                {orderDetails.metadata?.order_status}
              </p>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-600 mb-8">
          A confirmation email has been sent to your email address.
        </p>

        <Link
          href="/shop"
          className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="py-16">
        <div className="container max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}