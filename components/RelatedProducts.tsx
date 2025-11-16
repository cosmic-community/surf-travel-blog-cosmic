import ProductCard from './ProductCard'
import type { Product } from '@/types'

interface RelatedProductsProps {
  relatedProducts: Product[]
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}