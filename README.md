# 🏄 Surf Travel Blog

![App Preview](https://imgix.cosmicjs.com/a8238c00-c266-11f0-a34a-efbcf979242c-photo-1502933691298-84fc14542831-1763240659882.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern surf travel blog platform built with Next.js 16 and powered by Cosmic CMS. Features destination guides, surfing techniques, and gear reviews from expert contributors.

## ✨ Features

- 🌊 **Dynamic Content** - Real-time content updates from Cosmic CMS
- 👤 **Author Profiles** - Dedicated pages for surf experts and contributors
- 🏷️ **Category System** - Browse by Destinations, Tips & Techniques, and Gear Reviews
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🖼️ **Image Optimization** - Automatic image processing with imgix
- ⚡ **Fast Performance** - Built with Next.js 16 App Router for optimal speed
- 🎨 **Modern Design** - Clean, ocean-inspired interface with Tailwind CSS
- 🔍 **SEO Optimized** - Server-side rendering for better search visibility

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6918ea1349e38141959cf956&clone_repository=6918ebf149e38141959cf971)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a surf travel blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a surf travel blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Image Optimization**: imgix
- **Runtime**: Bun
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with the surf travel blog content model

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd surf-travel-blog
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Posts with Authors and Categories

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with related data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Access nested author data
const authorName = posts[0].metadata.author?.metadata?.name
const authorBio = posts[0].metadata.author?.metadata?.bio

// Access category data
const categories = posts[0].metadata.categories?.map(cat => cat.title)
```

### Fetching a Single Post

```typescript
// Fetch post by slug with depth for related content
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'your-post-slug'
  })
  .depth(1)
```

### Filtering Posts by Category

```typescript
// Get all posts in a specific category
const { objects: categoryPosts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.categories': categoryId // Use category ID
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

### Content Types

1. **Posts** - Blog articles with title, content, featured image, author, categories, and publish date
2. **Authors** - Contributor profiles with name, bio, profile photo, and social handles
3. **Categories** - Content organization with name and description

### Object Relationships

- Posts connect to Authors (single object relationship)
- Posts connect to Categories (multiple objects relationship)
- Related content is fetched using `depth(1)` parameter

### Image Optimization

All images use imgix URL parameters for optimization:
```typescript
const optimizedUrl = `${image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`
```

## 🌐 Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the deploy button above
2. Connect your GitHub repository
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:

- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

## 📁 Project Structure

```
surf-travel-blog/
├── app/
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Homepage with featured posts
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx     # Individual post pages
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx     # Author profile pages
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx     # Category listing pages
│   └── globals.css          # Global styles
├── components/
│   ├── Header.tsx           # Site navigation
│   ├── Footer.tsx           # Site footer
│   ├── PostCard.tsx         # Post preview card
│   ├── FeaturedPost.tsx     # Hero post component
│   └── CosmicBadge.tsx      # "Built with Cosmic" badge
├── lib/
│   └── cosmic.ts            # Cosmic SDK configuration
├── types.ts                 # TypeScript type definitions
└── public/
    ├── dashboard-console-capture.js  # Console logging for dashboard
    └── scripts/
        └── inject-console-capture.js # Build-time script injection
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For support with Cosmic CMS, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

---

Built with 💙 by the Cosmic community

<!-- README_END -->