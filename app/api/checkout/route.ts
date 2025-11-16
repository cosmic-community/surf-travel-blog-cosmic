import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/cosmic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { cart, customer } = await request.json()

    // Create line items for Stripe
    const lineItems = cart.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.metadata?.product_name || item.product.title,
          images: item.product.metadata?.product_images?.[0]
            ? [`${item.product.metadata.product_images[0].imgix_url}?w=400&h=400&fit=crop&auto=format,compress`]
            : [],
        },
        unit_amount: Math.round((item.product.metadata?.price || 0) * 100),
      },
      quantity: item.quantity,
    }))

    // Calculate total amount
    const totalAmount = cart.reduce(
      (sum: number, item: any) => sum + (item.product.metadata?.price || 0) * item.quantity,
      0
    )

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order in Cosmic
    const order = await createOrder({
      order_number: orderNumber,
      customer_name: customer.name,
      customer_email: customer.email,
      order_items: cart.map((item: any) => ({
        product_id: item.product.id,
        product_name: item.product.metadata?.product_name || item.product.title,
        quantity: item.quantity,
        price: item.product.metadata?.price || 0,
      })),
      total_amount: totalAmount,
      order_status: 'Pending',
      shipping_address: {
        name: customer.name,
        address_line1: customer.address_line1,
        address_line2: customer.address_line2 || '',
        city: customer.city,
        state: customer.state,
        postal_code: customer.postal_code,
        country: customer.country,
      },
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/order-confirmation?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${request.headers.get('origin')}/checkout`,
      customer_email: customer.email,
      metadata: {
        order_id: order.id,
        order_number: orderNumber,
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      orderId: order.id,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}