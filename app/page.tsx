import { getPosts, getCategories, getFeaturedProducts, getProductCategories } from '@/lib/cosmic'
import FeaturedPost from '@/components/FeaturedPost'
import PostCard from '@/components/PostCard'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, blogCategories, featuredProducts, productCategories] = await Promise.all([
    getPosts(),
    getCategories(),
    getFeaturedProducts(),
    getProductCategories()
  ]);
  
  // Get featured post (most recent)
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 4); // Show 3 recent posts
  
  return (
    <div>
      {/* Hero Section with Featured Post */}
      {featuredPost && <FeaturedPost post={featuredPost} />}
      
      {/* Search Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Find Your Next Adventure
            </h2>
            <p className="text-gray-600">
              Search through our collection of surf travel stories
            </p>
          </div>
          <SearchBar />
        </div>
      </section>
      
      {/* Blog Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse Articles by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {category.metadata?.name || category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.metadata?.description || ''}
                </p>
                <span className="text-primary font-medium group-hover:underline">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Posts Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <Link href="/search" className="text-primary hover:text-primary/80 font-medium">
              View All →
            </Link>
          </div>
          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-12">No articles available yet.</p>
          )}
        </div>
      </section>
      
      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Gear</h2>
                <p className="text-gray-600">Premium surf equipment for your next adventure</p>
              </div>
              <Link href="/shop" className="text-primary hover:text-primary/80 font-medium">
                Shop All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Shop Categories Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map((category) => (
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
    </div>
  )
}