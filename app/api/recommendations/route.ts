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
    
    // Filter out the current product if specified
    if (excludeId) {
      products = products.filter(p => p.id !== excludeId)
    }
    
    // Limit to 3 recommendations
    products = products.slice(0, 3)
    
    return NextResponse.json({ products })
  } catch (error) {
    console.error('Failed to fetch recommendations:', error)
    return NextResponse.json({ products: [] }, { status: 500 })
  }
}