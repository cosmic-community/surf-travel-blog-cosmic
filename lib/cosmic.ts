import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for type-safe error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all posts with related data
export async function getPosts(): Promise<import('@/types').Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const posts = response.objects as import('@/types').Post[];
    
    // Sort posts by publish date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || '').getTime();
      const dateB = new Date(b.metadata?.publish_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

// Fetch single post by slug
export async function getPost(slug: string): Promise<import('@/types').Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug
      })
      .depth(1);
    
    return response.object as import('@/types').Post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
  }
}

// Fetch all authors
export async function getAuthors(): Promise<import('@/types').Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.objects as import('@/types').Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

// Fetch single author by slug
export async function getAuthor(slug: string): Promise<import('@/types').Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug
      })
      .depth(0);
    
    return response.object as import('@/types').Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
  }
}

// Fetch posts by author ID
export async function getPostsByAuthor(authorId: string): Promise<import('@/types').Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const posts = response.objects as import('@/types').Post[];
    
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || '').getTime();
      const dateB = new Date(b.metadata?.publish_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by author');
  }
}

// Fetch all categories
export async function getCategories(): Promise<import('@/types').Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.objects as import('@/types').Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch single category by slug
export async function getCategory(slug: string): Promise<import('@/types').Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      })
      .depth(0);
    
    return response.object as import('@/types').Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// Fetch posts by category ID
export async function getPostsByCategory(categoryId: string): Promise<import('@/types').Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.categories': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const posts = response.objects as import('@/types').Post[];
    
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || '').getTime();
      const dateB = new Date(b.metadata?.publish_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by category');
  }
}

// ===== ECOMMERCE FUNCTIONS =====

// Fetch all products
export async function getProducts(): Promise<import('@/types').Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as import('@/types').Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

// Fetch single product by slug
export async function getProduct(slug: string): Promise<import('@/types').Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug
      })
      .depth(1);
    
    return response.object as import('@/types').Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }
}

// Fetch product by ID
export async function getProductById(id: string): Promise<import('@/types').Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        id
      })
      .depth(1);
    
    return response.object as import('@/types').Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product by ID');
  }
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<import('@/types').Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as import('@/types').Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured products');
  }
}

// Fetch all product categories
export async function getProductCategories(): Promise<import('@/types').ProductCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'product-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.objects as import('@/types').ProductCategory[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch product categories');
  }
}

// Fetch single product category by slug
export async function getProductCategory(slug: string): Promise<import('@/types').ProductCategory | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'product-categories',
        slug
      })
      .depth(0);
    
    return response.object as import('@/types').ProductCategory;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product category');
  }
}

// Fetch products by category ID
export async function getProductsByCategory(categoryId: string): Promise<import('@/types').Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as import('@/types').Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by category');
  }
}

// Create a new order
export async function createOrder(orderData: {
  order_number: string;
  customer_name: string;
  customer_email: string;
  order_items: import('@/types').OrderItem[];
  total_amount: number;
  order_status: string;
  stripe_payment_id?: string;
  shipping_address: import('@/types').ShippingAddress;
}): Promise<import('@/types').Order> {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Order ${orderData.order_number}`,
      type: 'orders',
      metadata: orderData
    });
    
    return response.object as import('@/types').Order;
  } catch (error) {
    throw new Error('Failed to create order');
  }
}

// Fetch order by ID
export async function getOrder(orderId: string): Promise<import('@/types').Order | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'orders',
        id: orderId
      })
      .depth(0);
    
    return response.object as import('@/types').Order;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch order');
  }
}