import { getProducts, getProductCategories, getProductsByCategory } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;
  
  const categories = await getProductCategories();
  
  let products;
  let selectedCategory = null;
  
  if (categorySlug) {
    selectedCategory = categories.find(c => c.slug === categorySlug);
    if (selectedCategory) {
      products = await getProductsByCategory(selectedCategory.id);
    } else {
      products = await getProducts();
    }
  } else {
    products = await getProducts();
  }
  
  return (
    <div className="py-16">
      <div className="container">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {selectedCategory 
              ? selectedCategory.metadata?.category_name || selectedCategory.title
              : 'All Products'}
          </h1>
          {selectedCategory && selectedCategory.metadata?.description && (
            <p className="text-xl text-gray-600">
              {selectedCategory.metadata.description}
            </p>
          )}
        </div>
        
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/shop"
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              !categorySlug
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                categorySlug === category.slug
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.metadata?.category_name || category.title}
            </Link>
          ))}
        </div>
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}