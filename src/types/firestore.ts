/**
 * Mirrors Valamiki_admin_pandel/src/lib/types.ts and the Flutter app's
 * lib/data/models/*.dart exactly — this is the shared Firestore contract
 * between the website, the admin panel, and the mobile app. Keep in sync;
 * do not diverge field names or types here without updating those too.
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  images: string[];
  unit: string;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  isFlashDeal: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  productCount: number;
  isActive: boolean;
  sortOrder?: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  type: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  discountPrice: number;
  unit: string;
  quantity: number;
  totalPrice: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  userId: string;
  products: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  totalPrice: number;
  deliveryAddress: Address;
  paymentMethod: string;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  linkType?: string;
  linkValue?: string;
  isActive: boolean;
  sortOrder?: number;
}

export interface Offer {
  id: string;
  title: string;
  description?: string;
  type: "percentage" | "flat" | "bogo" | "free_delivery";
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  code: string;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  usageLimit?: number;
  usageCount?: number;
  applicableCategories?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders?: number;
  totalSpent?: number;
  createdAt?: Date;
  addresses?: Address[];
}

export function effectivePrice(product: Product) {
  return product.discountPrice > 0 ? product.discountPrice : product.price;
}

export function hasDiscount(product: Product) {
  return product.discountPrice > 0 && product.discountPrice < product.price;
}

export function isRecentlyAdded(product: Product, days = 60) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return product.createdAt.getTime() >= cutoff;
}
