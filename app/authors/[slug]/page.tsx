// app/authors/[slug]/page.tsx
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);
  
  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }
  
  return {
    title: `${author.metadata?.name || author.title} - Surf Travel Blog`,
    description: author.metadata?.bio || '',
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  
  if (!author) {
    notFound();
  }
  
  const posts = await getPostsByAuthor(author.id);
  
  return (
    <div className="py-16">
      <div className="container">
        {/* Author Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {author.metadata?.profile_photo && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=384&h=384&fit=crop&auto=format,compress`}
              alt={author.metadata?.name || author.title}
              width={192}
              height={192}
              className="rounded-full"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {author.metadata?.name || author.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {author.metadata?.bio || ''}
            </p>
            {(author.metadata?.instagram_handle || author.metadata?.twitter_handle) && (
              <div className="flex gap-4">
                {author.metadata?.instagram_handle && (
                  <a
                    href={`https://instagram.com/${author.metadata.instagram_handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {author.metadata.instagram_handle}
                  </a>
                )}
                {author.metadata?.twitter_handle && (
                  <a
                    href={`https://twitter.com/${author.metadata.twitter_handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {author.metadata.twitter_handle}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Author's Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Articles by {author.metadata?.name || author.title}
          </h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-12">No articles yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}