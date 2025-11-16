// app/shop/[slug]/page.tsx
import { getProduct, getProductsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import RelatedProducts from '@/components/RelatedProducts'
import SocialShare from '@/components/SocialShare'
import StructuredData from '@/components/StructuredData'
import type { Metadata } from 'next'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.metadata?.product_name || product.title} - Surf Hub Shop`,
    description: product.metadata?.description || '',
    openGraph: {
      title: product.metadata?.product_name || product.title,
      description: product.metadata?.description || '',
      images: product.metadata?.product_images?.[0]?.imgix_url 
        ? [`${product.metadata.product_images[0].imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`]
        : [],
      type: 'website',
      url: `https://yourdomain.com/shop/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metadata?.product_name || product.title,
      description: product.metadata?.description || '',
      images: product.metadata?.product_images?.[0]?.imgix_url 
        ? [`${product.metadata.product_images[0].imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`]
        : []
    },
    alternates: {
      canonical: `https://yourdomain.com/shop/${product.slug}`
    }
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  // Changed: Added safe null check for category access
  const categoryId = product.metadata?.category?.id
  
  // Changed: Added safe null check before fetching related products
  const relatedProducts = categoryId 
    ? await getProductsByCategory(categoryId)
    : []

  // Filter out current product from related products
  const filteredRelated = relatedProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3)

  const mainImage = product.metadata?.product_images?.[0]
  const price = product.metadata?.price || 0
  const inStock = product.metadata?.in_stock ?? true
  const productName = product.metadata?.product_name || product.title
  const productDescription = product.metadata?.description || ''

  return (
    <div className="py-16">
      <StructuredData
        type="product"
        data={product}
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {mainImage && (
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                <img
                  src={`${mainImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Additional Images */}
            {product.metadata?.product_images && product.metadata.product_images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.metadata.product_images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={`${productName} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {productName}
            </h1>

            {product.metadata?.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {product.metadata.category.metadata?.category_name || product.metadata.category.title}
                </span>
              </div>
            )}

            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${price.toFixed(2)}
            </div>

            {product.metadata?.description && (
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-600">{product.metadata.description}</p>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {inStock ? (
                <span className="text-green-600 font-medium">✓ In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Out of Stock</span>
              )}
            </div>

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Social Share */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <SocialShare
                url={`https://yourdomain.com/shop/${product.slug}`}
                title={productName}
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelated.length > 0 && (
          <div className="mt-16">
            <RelatedProducts relatedProducts={filteredRelated} />
          </div>
        )}
      </div>
    </div>
  )
}