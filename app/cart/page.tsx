'use client'

import { useCart } from '@/components/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useCart()

  if (cart.length === 0) {
    return (
      <div className="py-16">
        <div className="container max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
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

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cart.map((item) => {
            const product = item.product
            const image = product.metadata?.product_images?.[0]
            const price = product.metadata?.price || 0

            return (
              <div
                key={product.id}
                className="flex gap-4 bg-white rounded-lg p-4 shadow-sm"
              >
                {/* Product Image */}
                {image && (
                  <Link href={`/shop/${product.slug}`}>
                    <img
                      src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={product.metadata?.product_name || product.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </Link>
                )}

                {/* Product Info */}
                <div className="flex-1">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="font-semibold text-gray-900 hover:text-primary transition-colors"
                  >
                    {product.metadata?.product_name || product.title}
                  </Link>
                  <p className="text-primary font-bold mt-1">
                    ${price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(product.id, item.quantity - 1)}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-3 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, item.quantity + 1)}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-right">
                  <p className="font-bold text-gray-900 mb-4">
                    ${(price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cart Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-primary">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block w-full px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-center"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/shop"
            className="block w-full mt-3 px-8 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}