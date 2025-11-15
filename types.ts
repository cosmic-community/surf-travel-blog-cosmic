// TypeScript type definitions for Cosmic content model

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
}

// Author type
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    instagram_handle?: string;
    twitter_handle?: string;
  };
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

// Post type
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    categories?: Category[];
    publish_date?: string;
  };
}

// Product Category type
export interface ProductCategory extends CosmicObject {
  type: 'product-categories';
  metadata: {
    category_name?: string;
    description?: string;
    category_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Product type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    description?: string;
    price?: number;
    category?: ProductCategory;
    product_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    stock_quantity?: number;
    in_stock?: boolean;
    featured?: boolean;
  };
}

// Order type
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    order_number?: string;
    customer_name?: string;
    customer_email?: string;
    order_items?: OrderItem[];
    total_amount?: number;
    order_status?: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    stripe_payment_id?: string;
    shipping_address?: ShippingAddress;
  };
}

// Order item interface
export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

// Shipping address interface
export interface ShippingAddress {
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// Cart item interface
export interface CartItem {
  product: Product;
  quantity: number;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isProductCategory(obj: CosmicObject): obj is ProductCategory {
  return obj.type === 'product-categories';
}

export function isOrder(obj: CosmicObject): obj is Order {
  return obj.type === 'orders';
}