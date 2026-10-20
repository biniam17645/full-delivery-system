export type UserRole = 'customer' | 'merchant' | 'driver' | 'admin';

export type MerchantCategory = 'cafe' | 'restaurant' | 'hotel' | 'supermarket' | 'pharmacy' | 'retail';

export type ProductType = 'food' | 'retail';

export type OrderStatus = 
  | 'pending'
  | 'confirmed_by_merchant'
  | 'preparing'
  | 'ready_for_pickup'
  | 'assigned_to_driver'
  | 'driver_arrived_at_merchant'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type DeliveryStatus = 
  | 'searching_driver'
  | 'driver_assigned'
  | 'heading_to_pickup'
  | 'package_picked_up'
  | 'in_transit'
  | 'delivered'
  | 'failed';

export type VehicleType = 'bicycle' | 'motorbike' | 'on_foot';

export type PaymentMethod = 'telebirr' | 'cbe_birr' | 'cash_on_delivery';

export type LanguageCode = 'en' | 'am' | 'om';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  addressText: string;
  kebele?: string;
}

export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  role: UserRole;
  languagePreference: LanguageCode;
  createdAt: string;
  avatarUrl?: string;
}

export interface Merchant {
  id: string;
  ownerId: string;
  name: {
    en: string;
    am: string;
    om: string;
  };
  slug: string;
  category: MerchantCategory;
  phone: string;
  commissionRate: number; // e.g. 0.18 (18%)
  rating: number;
  reviewCount: number;
  preparationTimeMinutes: number;
  coverImage: string;
  logo: string;
  location: GeoLocation;
  isOpen: boolean;
  featuredDishes?: string[];
}

export interface ProductOptionChoice {
  id: string;
  name: { en: string; am: string; om: string };
  priceAdjustmentBirr: number;
}

export interface ProductOptionGroup {
  id: string;
  title: { en: string; am: string; om: string };
  minSelections: number;
  maxSelections: number;
  choices: ProductOptionChoice[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  barcode?: string;
  name: { en: string; am: string; om: string };
  attributes: Record<string, string>; // e.g., { "size": "500ml", "color": "blue" }
  priceBirr: number;
  stockQuantity: number;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  merchantId: string;
  categoryId: string;
  productType: ProductType;
  name: {
    en: string;
    am: string;
    om: string;
  };
  description: {
    en: string;
    am: string;
    om: string;
  };
  basePriceBirr: number;
  imageUrl: string;
  isAvailable: boolean;
  preparationTimeMinutes?: number;
  prepTimeMinutes?: number;
  
  // For Food items
  optionGroups?: ProductOptionGroup[];
  
  // For Retail items
  variants?: ProductVariant[];
  sku?: string;
  inventoryCount?: number;
  stockQuantity?: number;

  // ML Recommendation Tags & Attributes
  tags: string[]; // e.g., ["breakfast", "coffee", "traditional", "popular"]
  timeSlots: ('morning' | 'lunch' | 'afternoon' | 'evening' | 'late_night')[];
  frequentlyBoughtTogetherIds?: string[];
}

export interface Category {
  id: string;
  merchantId?: string; // Optional if global category or merchant-specific
  name: {
    en: string;
    am: string;
    om: string;
  };
  icon: string;
  slug: string;
  sortOrder: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  selectedOptions?: {
    groupId: string;
    choiceId: string;
    choiceName: string;
    extraPrice: number;
  }[];
  specialInstructions?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPriceBirr: number;
  totalPriceBirr: number;
  selectedVariantId?: string;
  selectedOptionsSnapshot?: any;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  merchantId: string;
  merchantName: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotalBirr: number;
  deliveryFeeBirr: number;
  serviceFeeBirr: number;
  totalAmountBirr: number;
  merchantCommissionBirr: number;
  driverEarningsBirr: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'failed';
  deliveryAddress: GeoLocation;
  estimatedDeliveryMinutes: number;
  createdAt: string;
  courierId?: string;
}

export interface Delivery {
  id: string;
  orderId: string;
  driverId?: string;
  status: DeliveryStatus;
  pickupLocation: GeoLocation;
  dropoffLocation: GeoLocation;
  pickupAddressText?: string;
  dropoffAddressText?: string;
  distanceKm: number;
  driverEarningsBirr: number;
  estimatedDurationMinutes: number;
  startedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  completedAt?: string;
}

export interface DriverLocation {
  driverId: string;
  driverName: string;
  vehicleType: VehicleType;
  latitude: number;
  longitude: number;
  isOnline: boolean;
  isAvailable: boolean;
  batteryPercentage?: number;
  lastUpdated: string;
  currentBearing?: number;
}
