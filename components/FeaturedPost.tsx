import Link from 'next/link'
import type { Post } from '@/types'

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const featuredImage = post.metadata?.featured_image;
  const author = post.metadata?.author;
  const categories = post.metadata?.categories || [];
  
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      {featuredImage && (
        <div className="absolute inset-0">
          <img
            src={`${featuredImage.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
            alt={post.metadata?.title || post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative h-full container flex items-end pb-16">
        <div className="max-w-3xl">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full hover:bg-white/30 transition-colors"
                >
                  {category.metadata?.name || category.title}
                </Link>
              ))}
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {post.metadata?.title || post.title}
          </h1>
          
          {/* Author and Date */}
          {author && (
            <div className="flex items-center gap-3 mb-6">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <Link
                  href={`/authors/${author.slug}`}
                  className="text-white font-medium hover:underline"
                >
                  {author.metadata?.name || author.title}
                </Link>
                {post.metadata?.publish_date && (
                  <p className="text-white/80 text-sm">
                    {new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Read More Button */}
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Read Article →
          </Link>
        </div>
      </div>
    </section>
  )
}