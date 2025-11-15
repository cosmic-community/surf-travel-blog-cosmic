// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.metadata?.title || post.title} - Surf Travel Blog`,
    description: post.metadata?.content?.substring(0, 160) || '',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }
  
  const author = post.metadata?.author;
  const categories = post.metadata?.categories || [];
  const featuredImage = post.metadata?.featured_image;
  
  return (
    <article className="py-16">
      <div className="container max-w-4xl">
        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={post.metadata?.title || post.title}
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        )}
        
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.metadata?.title || post.title}
        </h1>
        
        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
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
                <p className="font-medium text-gray-900">
                  {author.metadata?.name || author.title}
                </p>
                {post.metadata?.publish_date && (
                  <p className="text-sm text-gray-600">
                    {new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </Link>
          )}
        </div>
        
        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }}
        />
        
        {/* Author Bio */}
        {author && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About the Author</h3>
            <div className="flex gap-4">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              )}
              <div>
                <Link
                  href={`/authors/${author.slug}`}
                  className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors"
                >
                  {author.metadata?.name || author.title}
                </Link>
                <p className="text-gray-600 mt-2">{author.metadata?.bio || ''}</p>
                {(author.metadata?.instagram_handle || author.metadata?.twitter_handle) && (
                  <div className="flex gap-4 mt-3">
                    {author.metadata?.instagram_handle && (
                      <a
                        href={`https://instagram.com/${author.metadata.instagram_handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {author.metadata?.twitter_handle && (
                      <a
                        href={`https://twitter.com/${author.metadata.twitter_handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}