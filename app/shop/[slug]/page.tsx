// app/shop/[slug]/page.tsx
import { getProduct, getProducts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AddToCartButton from '@/components/AddToCartButton'
import StructuredData from '@/components/StructuredData'
import RelatedProducts from '@/components/RelatedProducts'

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  const images = product.metadata?.product_images || [];
  
  return {
    title: `${product.metadata?.product_name || product.title} - Surf Shop`,
    description: product.metadata?.description || '',
    openGraph: {
      title: product.metadata?.product_name || product.title,
      description: product.metadata?.description || '',
      images: images.length > 0 
        ? [`${images[0].imgix_url}?w=2000&h=2000&fit=crop&auto=format,compress`]
        : [],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metadata?.product_name || product.title,
      description: product.metadata?.description || '',
      images: images.length > 0 
        ? [`${images[0].imgix_url}?w=2000&h=2000&fit=crop&auto=format,compress`]
        : []
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    notFound();
  }
  
  const images = product.metadata?.product_images || [];
  const mainImage = images[0];
  const price = product.metadata?.price || 0;
  const inStock = product.metadata?.in_stock ?? true;
  const stockQuantity = product.metadata?.stock_quantity || 0;
  
  return (
    <>
      <StructuredData type="product" data={product} />
      
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {mainImage && (
                <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={`${mainImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={product.metadata?.product_name || product.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(1, 5).map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                        alt={`${product.metadata?.product_name || product.title} ${index + 2}`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              {/* Category */}
              {product.metadata?.category && (
                <p className="text-sm text-primary font-medium mb-2">
                  {product.metadata.category.metadata?.category_name || product.metadata.category.title}
                </p>
              )}
              
              {/* Product Name */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.metadata?.product_name || product.title}
              </h1>
              
              {/* Price */}
              <p className="text-3xl font-bold text-primary mb-6">
                ${price.toFixed(2)}
              </p>
              
              {/* Stock Status */}
              {inStock ? (
                <p className="text-green-600 font-medium mb-6">
                  In Stock ({stockQuantity} available)
                </p>
              ) : (
                <p className="text-red-600 font-medium mb-6">
                  Out of Stock
                </p>
              )}
              
              {/* Add to Cart Button */}
              {inStock && <AddToCartButton product={product} />}
              
              {/* Description */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.metadata?.description || ''}
                </p>
              </div>
              
              {/* Product Details */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• High-quality construction</li>
                  <li>• Designed for performance</li>
                  <li>• Free shipping on orders over $100</li>
                  <li>• 30-day return policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <RelatedProducts currentProduct={product} />
    </>
  )
}