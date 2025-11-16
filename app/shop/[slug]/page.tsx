// app/shop/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProduct, getProductsByCategory } from '@/lib/cosmic'
import AddToCartButton from '@/components/AddToCartButton'
import RelatedProducts from '@/components/RelatedProducts'
import StructuredData from '@/components/StructuredData'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = product.metadata.category?.id
    ? await getProductsByCategory(product.metadata.category.id)
    : []

  // Filter out the current product from related products
  const filteredRelated = relatedProducts.filter(p => p.id !== product.id).slice(0, 4)

  return (
    <>
      <StructuredData type="product" data={product} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {product.metadata.product_images && product.metadata.product_images.length > 0 ? (
              <>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={`${product.metadata.product_images[0]?.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={product.metadata.product_name || product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.metadata.product_images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.metadata.product_images.slice(1).map((image, index) => (
                      image?.imgix_url && (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                            alt={`${product.metadata.product_name || product.title} view ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              {product.metadata.category && (
                <span className="text-sm text-primary font-semibold">
                  {product.metadata.category.metadata?.category_name || product.metadata.category.title}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.metadata.product_name || product.title}
            </h1>
            
            <div className="text-3xl font-bold text-primary mb-6">
              ${product.metadata.price?.toFixed(2)}
            </div>

            <div className="prose prose-lg mb-8">
              <p className="text-gray-600 leading-relaxed">
                {product.metadata.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.metadata.in_stock ? (
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">In Stock</span>
                  {product.metadata.stock_quantity && (
                    <span className="ml-2 text-gray-600">
                      ({product.metadata.stock_quantity} available)
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Product Features */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Fast shipping available</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>30-day return policy</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Expert customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelated.length > 0 && (
          <RelatedProducts products={filteredRelated} />
        )}
      </div>
    </>
  )
}