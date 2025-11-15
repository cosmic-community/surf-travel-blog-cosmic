import { getFeaturedProducts, getProductCategories } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getProductCategories();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full container flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Surf Gear
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Ride the waves with confidence. Shop our collection of high-performance surfboards, wetsuits, and accessories.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {category.metadata?.category_image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`${category.metadata.category_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                      alt={category.metadata?.category_name || category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {category.metadata?.category_name || category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.metadata?.description || ''}
                  </p>
                  <span className="text-primary font-medium group-hover:underline">
                    Browse Products →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}