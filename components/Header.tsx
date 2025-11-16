import Link from 'next/link'
import { getCategories, getProductCategories } from '@/lib/cosmic'
import CartButton from '@/components/CartButton'

export default async function Header() {
  const [blogCategories, productCategories] = await Promise.all([
    getCategories(),
    getProductCategories()
  ]);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            🏄 Surf Hub
          </Link>
          
          {/* Navigation - merged both blog and shop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            
            {/* Blog Categories */}
            {blogCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
            
            {/* Shop Link */}
            <Link
              href="/shop"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Shop
            </Link>
            
            {/* Search Link */}
            <Link
              href="/search"
              className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition-colors"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </Link>
            
            {/* Contact Link */}
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>
          
          {/* Cart Button */}
          <CartButton />
        </div>
      </div>
    </header>
  )
}