import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image;
  const author = post.metadata?.author;
  const categories = post.metadata?.categories || [];
  
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Featured Image */}
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.metadata?.title || post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      )}
      
      <div className="p-6">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full hover:bg-primary/20 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
          </div>
        )}
        
        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
            {post.metadata?.title || post.title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        {post.metadata?.content && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.content.substring(0, 150).replace(/[#*]/g, '')}...
          </p>
        )}
        
        {/* Author and Date */}
        {author && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <Link
                href={`/authors/${author.slug}`}
                className="text-sm font-medium text-gray-900 hover:text-primary transition-colors truncate block"
              >
                {author.metadata?.name || author.title}
              </Link>
              {post.metadata?.publish_date && (
                <p className="text-xs text-gray-500">
                  {new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}