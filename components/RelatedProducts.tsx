import { getProductsByCategory } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types'

interface RelatedProductsProps {
  currentProduct: Product
  limit?: number
}

export default async function RelatedProducts({ currentProduct, limit = 3 }: RelatedProductsProps) {
  if (!currentProduct.metadata?.category) {
    return null
  }

  const categoryId = currentProduct.metadata.category.id
  const relatedProducts = await getProductsByCategory(categoryId)

  // Filter out current product and limit results
  const filteredProducts = relatedProducts
    .filter(product => product.id !== currentProduct.id)
    .slice(0, limit)

  if (filteredProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}