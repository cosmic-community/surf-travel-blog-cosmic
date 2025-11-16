// app/shop/[slug]/page.tsx
import { getProduct, getProductsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import ProductRecommendations from '@/components/ProductRecommendations'
import SocialShare from '@/components/SocialShare'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductReviews from '@/components/ProductReviews'
import UrgencyIndicator from '@/components/UrgencyIndicator'
import DiscountBadge from '@/components/DiscountBadge'
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

  const description = product.metadata?.description || ''
  const price = product.metadata?.price || 0

  return {
    title: `${product.metadata?.product_name || product.title} - $${price.toFixed(2)} | Surf Hub Shop`,
    description: description,
    keywords: [
      'surf gear',
      'surfing equipment',
      product.metadata?.category?.metadata?.category_name || '',
      product.metadata?.product_name || product.title
    ].filter(Boolean),
    openGraph: {
      title: product.metadata?.product_name || product.title,
      description: description,
      images: product.metadata?.product_images?.[0]?.imgix_url 
        ? [`${product.metadata.product_images[0].imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`]
        : [],
      type: 'website',
      url: `https://yourdomain.com/shop/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metadata?.product_name || product.title,
      description: description,
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

  const categoryId = product.metadata?.category?.id
  
  const mainImage = product.metadata?.product_images?.[0]
  const price = product.metadata?.price || 0
  const inStock = product.metadata?.in_stock ?? true
  const productName = product.metadata?.product_name || product.title
  const productDescription = product.metadata?.description || ''
  const stockQuantity = product.metadata?.stock_quantity || 0

  // Sample reviews for demonstration - in production, fetch from Cosmic
  const sampleReviews = [
    {
      id: '1',
      author: 'Jake M.',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent quality!',
      content: 'This product exceeded my expectations. The quality is outstanding and it arrived quickly.',
      verified: true
    },
    {
      id: '2',
      author: 'Sarah K.',
      rating: 4,
      date: '2024-01-10',
      title: 'Great value',
      content: 'Really happy with this purchase. Works perfectly for my needs.',
      verified: true
    },
    {
      id: '3',
      author: 'Mike R.',
      rating: 5,
      date: '2024-01-05',
      title: 'Highly recommend',
      content: 'Best purchase I\'ve made this year. Will definitely buy from this shop again.',
      verified: false
    }
  ]

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.metadata?.category?.metadata?.category_name || 'Products', href: `/shop?category=${product.metadata?.category?.slug}` },
    { label: productName }
  ]

  return (
    <div className="py-16">
      <StructuredData
        type="product"
        data={product}
      />

      <div className="container">
        <Breadcrumbs items={breadcrumbs} />

        {/* Discount Badge - Show if product is featured */}
        {product.metadata?.featured && (
          <div className="mb-6">
            <DiscountBadge code="SURF10" discount={10} expiresIn="2d 5h" />
          </div>
        )}

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

            {/* Urgency Indicators */}
            <div className="space-y-3 mb-6">
              {stockQuantity > 0 && stockQuantity <= 10 && (
                <UrgencyIndicator type="stock" value={stockQuantity} threshold={10} />
              )}
              <UrgencyIndicator type="demand" value={Math.floor(Math.random() * 20) + 5} />
            </div>

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

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Shipping Over $50
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Checkout
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  30-Day Returns
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  24/7 Support
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <SocialShare
                url={`https://yourdomain.com/shop/${product.slug}`}
                title={productName}
              />
            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <div className="mt-16">
          <ProductReviews 
            productId={product.id}
            productName={productName}
            reviews={sampleReviews}
          />
        </div>

        {/* Product Recommendations */}
        {categoryId && (
          <div className="mt-16">
            <ProductRecommendations 
              currentProductId={product.id}
              categoryId={categoryId}
              title="You May Also Like"
            />
          </div>
        )}
      </div>
    </div>
  )
}