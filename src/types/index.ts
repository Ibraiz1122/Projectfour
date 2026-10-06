export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: SubCategory[];
}

export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  subcategoryId: string;
  description: string;
  details: string[];
  materials: string;
  fit: string;
  careInstructions: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  season: string;
  sku: string;
}

export interface CartItem {
  id: string; // unique cart item id: productId-color-size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Completed';
  trackingNumber: string;
  items: OrderItem[];
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export type ActivePage = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'wishlist'
  | 'account'
  | 'about'
  | 'lookbook'
  | 'journal'
  | 'contact'
  | 'faq'
  | 'shipping'
  | 'returns'
  | 'privacy'
  | 'terms'
  | 'size-guide';

export interface FilterState {
  categoryId: string | null;
  subcategoryId: string | null;
  minPrice: number;
  maxPrice: number;
  selectedSizes: string[];
  selectedColors: string[];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly: boolean;
  searchQuery: string;
}
