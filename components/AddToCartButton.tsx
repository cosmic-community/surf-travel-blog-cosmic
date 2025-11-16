'use client'

import { useState } from 'react'
import { useCart } from './CartContext'
import type { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const maxQuantity = product.metadata?.stock_quantity || 10

  return (
    <div className="flex items-center gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center border border-gray-300 rounded-lg">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          −
        </button>
        <span className="px-4 py-2 font-medium min-w-[60px] text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="flex-1 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
      >
        {showSuccess ? '✓ Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  )
}