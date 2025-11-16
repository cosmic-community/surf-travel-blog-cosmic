// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import NewsletterSignup from '@/components/NewsletterSignup'
import SocialShare from '@/components/SocialShare'

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
    keywords: [
      'surf',
      'surfing',
      ...(post.metadata?.categories?.map(c => c.metadata?.name || c.title) || [])
    ],
    authors: post.metadata?.author?.metadata?.name 
      ? [{ name: post.metadata.author.metadata.name }]
      : undefined,
    openGraph: {
      title: post.metadata?.title || post.title,
      description: post.metadata?.content?.substring(0, 160) || '',
      images: post.metadata?.featured_image?.imgix_url 
        ? [`${post.metadata.featured_image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`]
        : [],
      type: 'article',
      publishedTime: post.metadata?.publish_date,
      authors: post.metadata?.author?.metadata?.name || post.metadata?.author?.title,
      url: `https://yourdomain.com/posts/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata?.title || post.title,
      description: post.metadata?.content?.substring(0, 160) || '',
      images: post.metadata?.featured_image?.imgix_url 
        ? [`${post.metadata.featured_image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`]
        : []
    },
    alternates: {
      canonical: `https://yourdomain.com/posts/${post.slug}`
    }
  };
}

// Simple markdown to HTML converter for basic markdown syntax
function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;
  
  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Convert lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  
  // Wrap consecutive list items in ul
  html = html.replace(/(<li>.*<\/li>\n?)+/gim, '<ul>$&</ul>');
  
  // Convert paragraphs (lines not already in tags)
  html = html.split('\n\n').map(paragraph => {
    if (!paragraph.match(/^<[h|u|o]/)) {
      return `<p>${paragraph}</p>`;
    }
    return paragraph;
  }).join('\n');
  
  // Clean up extra whitespace
  html = html.replace(/\n+/g, '\n');
  
  return html;
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
  const content = post.metadata?.content ? convertMarkdownToHTML(post.metadata.content) : '';
  
  const shareUrl = `https://yourdomain.com/posts/${post.slug}`
  const shareTitle = post.metadata?.title || post.title
  
  return (
    <>
      <StructuredData type="article" data={post} />
      
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
                    className="w-12 h-12 rounded-full object-cover"
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
          
          {/* Social Share */}
          <SocialShare url={shareUrl} title={shareTitle} />
          
          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          {/* Newsletter Signup */}
          <div className="mt-12">
            <NewsletterSignup />
          </div>
          
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
                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
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
    </>
  )
}