import Link from 'next/link'
import type { Product } from '@/types'

interface RelatedProductsProps {
  relatedProducts: Product[] // Changed: Fixed interface to match actual usage
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {product.metadata?.product_images?.[0] && (
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={`${product.metadata.product_images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={product.metadata?.product_name || product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {product.metadata?.product_name || product.title}
              </h3>
              {product.metadata?.price && (
                <p className="text-lg font-bold text-gray-900">
                  ${product.metadata.price.toFixed(2)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}