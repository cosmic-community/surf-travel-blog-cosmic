import Link from 'next/link'
import type { Post } from '@/types'

interface RelatedPostsProps {
  posts: Post[]
  currentPostId: string
}

export default function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-16 pt-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group"
          >
            {post.metadata?.featured_image && (
              <div className="aspect-video rounded-lg overflow-hidden mb-3">
                <img
                  src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                  alt={post.metadata?.title || post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {post.metadata?.title || post.title}
            </h3>
            {post.metadata?.publish_date && (
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}