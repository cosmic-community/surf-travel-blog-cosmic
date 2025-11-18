'use client'

import { useState } from 'react'

interface DiscountBadgeProps {
  code: string
  discount: number
  expiresIn?: string
}

export default function DiscountBadge({ code, discount, expiresIn }: DiscountBadgeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium mb-1">🎉 Special Offer</p>
          <p className="text-2xl font-bold mb-2">Save {discount}% Today!</p>
          <p className="text-sm opacity-90">Use code at checkout</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {copied ? '✓ Copied!' : code}
          </button>
          {expiresIn && (
            <p className="text-xs opacity-90">Expires in {expiresIn}</p>
          )}
        </div>
      </div>
    </div>
  )
}