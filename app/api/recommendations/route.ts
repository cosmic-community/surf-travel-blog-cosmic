import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getProductsByCategory } from '@/lib/cosmic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const excludeId = searchParams.get('exclude')
    const categoryId = searchParams.get('category')

    let products = categoryId 
      ? await getProductsByCategory(categoryId)
      : await getProducts()

    // Filter out current product if specified
    if (excludeId) {
      products = products.filter(p => p.id !== excludeId)
    }

    // Prioritize featured products
    products.sort((a, b) => {
      const aFeatured = a.metadata?.featured ? 1 : 0
      const bFeatured = b.metadata?.featured ? 1 : 0
      return bFeatured - aFeatured
    })

    // Return up to 3 recommendations
    return NextResponse.json({
      products: products.slice(0, 3)
    })
  } catch (error) {
    console.error('Recommendations error:', error)
    return NextResponse.json(
      { products: [] },
      { status: 200 } // Return empty array instead of error
    )
  }
}