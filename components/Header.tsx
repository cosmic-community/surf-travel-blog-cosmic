import Link from 'next/link'
import { getProductCategories } from '@/lib/cosmic'
import CartButton from '@/components/CartButton'

export default async function Header() {
  const categories = await getProductCategories();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            🏄 Surf Shop
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Shop All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {category.metadata?.category_name || category.title}
              </Link>
            ))}
          </nav>
          
          {/* Cart Button */}
          <CartButton />
        </div>
      </div>
    </header>
  )
}