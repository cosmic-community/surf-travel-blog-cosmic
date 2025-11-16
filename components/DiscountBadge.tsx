interface DiscountBadgeProps {
  code: string
  discount: number
  expiresIn?: string
}

export default function DiscountBadge({ code, discount, expiresIn }: DiscountBadgeProps) {
  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Limited Time Offer!</div>
          <div className="text-2xl font-bold">{discount}% OFF</div>
          <div className="text-sm">Use code: <span className="font-mono font-bold">{code}</span></div>
        </div>
        {expiresIn && (
          <div className="text-right">
            <div className="text-xs opacity-90">Expires in</div>
            <div className="text-lg font-bold">{expiresIn}</div>
          </div>
        )}
      </div>
    </div>
  )
}