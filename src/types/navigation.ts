export type PageType = 
  | 'home' 
  | 'about' 
  | 'consumers' 
  | 'riders' 
  | 'merchants' 
  | 'contact'
  | 'customer-dashboard'
  | 'live-tracking'
  | 'merchant-kds'
  | 'rider-duty';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface ReviewItem {
  id: string;
  rating: number;
  text: string;
  author: string;
  role: string;
}

export interface CartItem {
  id: string;
  productId: string;
  merchantId: string;
  merchantName: string;
  name: string;
  priceBirr: number;
  quantity: number;
  imageUrl: string;
  customizationNotes?: string;
  selectedOptions?: string[];
}

export interface ActiveOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  kebele: string;
  items: {
    name: string;
    quantity: number;
    priceBirr: number;
    notes?: string;
  }[];
  subtotalBirr: number;
  deliveryFeeBirr: number;
  serviceFeeBirr: number;
  totalBirr: number;
  paymentMethod: 'cash_on_delivery' | 'telebirr' | 'cbe_birr';
  paymentStatus: 'paid' | 'pending_cash';
  status: 'order_placed' | 'merchant_preparing' | 'rider_picked_up' | 'on_the_way' | 'delivered';
  placedAt: string;
  estimatedMinutes: number;
  riderName: string;
  riderPhone: string;
  riderVehicle: string;
  riderRating: number;
  merchantName: string;
  merchantLocation: string;
}
