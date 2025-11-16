'use client'

interface SocialShareProps {
  url: string
  title: string
  description?: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const fullUrl = url.startsWith('http') ? url : `https://yourdomain.com${url}`
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = description ? encodeURIComponent(description) : encodedTitle

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      <div className="flex gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white transition-colors"
          aria-label="Share on Twitter"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors"
          aria-label="Share on Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a
          href={shareLinks.pinterest}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition-colors"
          aria-label="Share on Pinterest"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
          </svg>
        </a>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 transition-colors"
          aria-label="Copy link"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}