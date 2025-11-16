import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = product.metadata?.product_images || [];
  const mainImage = images[0];
  const price = product.metadata?.price || 0;
  const inStock = product.metadata?.in_stock ?? true;
  
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      {mainImage && (
        <Link href={`/shop/${product.slug}`}>
          <div className="relative h-64 overflow-hidden bg-gray-100">
            <img
              src={`${mainImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={product.metadata?.product_name || product.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
            {!inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>
      )}
      
      <div className="p-6">
        {/* Category */}
        {product.metadata?.category && (
          <p className="text-xs text-primary font-medium mb-2">
            {product.metadata.category.metadata?.category_name || product.metadata.category.title}
          </p>
        )}
        
        {/* Product Name */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
            {product.metadata?.product_name || product.title}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.metadata?.description || ''}
        </p>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">
            ${price.toFixed(2)}
          </p>
          {inStock ? (
            <span className="text-xs text-green-600 font-medium">
              In Stock
            </span>
          ) : (
            <span className="text-xs text-red-600 font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </article>
  )
}