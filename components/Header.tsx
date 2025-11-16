import Link from 'next/link'
import { getCategories, getProductCategories } from '@/lib/cosmic'
import CartButton from '@/components/CartButton'

export default async function Header() {
  const [categories, productCategories] = await Promise.all([
    getCategories(),
    getProductCategories()
  ])
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            🏄 Surf Travel & Shop
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            
            {/* Blog Categories Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center gap-1">
                Blog
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {category.metadata?.name || category.title}
                  </Link>
                ))}
              </div>
            </div>

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

            {/* Shop Dropdown */}
            <div className="relative group">
              <Link 
                href="/shop"
                className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center gap-1"
              >
                Shop
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/shop"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors first:rounded-t-lg"
                >
                  All Products
                </Link>
                {productCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/shop?category=${category.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors last:rounded-b-lg"
                  >
                    {category.metadata?.category_name || category.title}
                  </Link>
                ))}
              </div>
            </div>
            
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