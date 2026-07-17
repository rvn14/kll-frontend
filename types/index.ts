export type ItemStatus = "active" | "draft" | "deleted";
export type StockLevel = "in-stock" | "low-stock" | "out-of-stock";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type UserRole = "customer" | "admin";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: StockLevel;
  warranty: string;
  badge?: "New" | "Offer" | "Best seller";
  visual: "tv" | "fridge" | "washer" | "air" | "kitchen" | "audio" | "phone" | "fan";
  specifications: Array<{ label: string; value: string }>;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: Product["visual"];
}

export interface CartLine {
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface Address {
  id: string;
  label: string;
  recipient: string;
  summary: string;
  phone: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  itemCount: number;
  total: number;
  customer?: string;
  paymentMethod?: string;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export interface ApiErrorShape {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

export interface ListParams {
  [key: string]: string | number | boolean | undefined;
}

export interface CheckoutPreview {
  items: CartLine[];
  subtotal?: number;
  deliveryFee?: number;
  tax?: number;
  total?: number;
  currency: "LKR";
}
