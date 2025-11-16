import { getPosts, getCategories } from '@/lib/cosmic'
import FeaturedPost from '@/components/FeaturedPost'
import PostCard from '@/components/PostCard'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'

export default async function HomePage() {
  const posts = await getPosts();
  const categories = await getCategories();
  
  // Get featured post (most recent)
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);
  
  return (
    <div>
      {/* Hero Section with Featured Post */}
      {featuredPost && <FeaturedPost post={featuredPost} />}
      
      {/* Search Section - Added from base branch */}
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
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
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
    </div>
  )
}