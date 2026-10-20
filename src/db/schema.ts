/**
 * KECH (ከች) - TypeScript ORM Schema Definition (Drizzle-compatible)
 * Target Environment: Node.js / PostgreSQL / PostGIS
 * Location: Asela, Oromia, Ethiopia
 */

export const schemaDefinitionString = `
import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  boolean, 
  timestamp, 
  numeric, 
  integer, 
  jsonb, 
  customType, 
  pgEnum, 
  bigint 
} from 'drizzle-orm/pg-core';

// Geography Point custom type for PostGIS
export const postgisPoint = customType<{ data: { lat: number; lng: number } }>({
  dataType() {
    return 'geography(Point, 4326)';
  },
});

// Enums
export const userRoleEnum = pgEnum('user_role', ['customer', 'merchant', 'driver', 'admin']);
export const merchantCategoryEnum = pgEnum('merchant_category', ['cafe', 'restaurant', 'hotel', 'supermarket', 'pharmacy', 'retail']);
export const productTypeEnum = pgEnum('product_type', ['food', 'retail']);
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'confirmed_by_merchant',
  'preparing',
  'ready_for_pickup',
  'assigned_to_driver',
  'driver_arrived_at_merchant',
  'out_for_delivery',
  'delivered',
  'cancelled'
]);
export const deliveryStatusEnum = pgEnum('delivery_status', [
  'searching_driver',
  'driver_assigned',
  'heading_to_pickup',
  'package_picked_up',
  'in_transit',
  'delivered',
  'failed'
]);
export const vehicleTypeEnum = pgEnum('vehicle_type', ['bicycle', 'motorbike', 'on_foot']);
export const paymentMethodEnum = pgEnum('payment_method', ['telebirr', 'cbe_birr', 'cash_on_delivery']);

// 1. Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull().unique(),
  email: varchar('email', { length: 255 }).unique(),
  fullName: varchar('full_name', { length: 150 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }),
  role: userRoleEnum('role').default('customer').notNull(),
  languagePreference: varchar('language_preference', { length: 10 }).default('am').notNull(),
  avatarUrl: text('avatar_url'),
  telegramChatId: bigint('telegram_chat_id', { mode: 'number' }).unique(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 2. Merchants Table
export const merchants = pgTable('merchants', {
  id: uuid('id').defaultRandom().primaryKey(),
  ownerId: uuid('owner_id').references(() => users.id).notNull(),
  nameEn: varchar('name_en', { length: 150 }).notNull(),
  nameAm: varchar('name_am', { length: 150 }).notNull(),
  nameOm: varchar('name_om', { length: 150 }).notNull(),
  slug: varchar('slug', { length: 180 }).notNull().unique(),
  category: merchantCategoryEnum('category').default('restaurant').notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  commissionRate: numeric('commission_rate', { precision: 5, scale: 4 }).default('0.2000').notNull(),
  rating: numeric('rating', { precision: 3, scale: 2 }).default('4.80').notNull(),
  reviewCount: integer('review_count').default(0).notNull(),
  prepTimeMinutes: integer('prep_time_minutes').default(20).notNull(),
  coverImageUrl: text('cover_image_url'),
  logoUrl: text('logo_url'),
  isOpen: boolean('is_open').default(true).notNull(),
  addressText: text('address_text').notNull(),
  kebele: varchar('kebele', { length: 50 }).default('Kebele 02'),
  location: postgisPoint('location').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 3. Categories Table
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  merchantId: uuid('merchant_id').references(() => merchants.id),
  nameEn: varchar('name_en', { length: 100 }).notNull(),
  nameAm: varchar('name_am', { length: 100 }).notNull(),
  nameOm: varchar('name_om', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 120 }).notNull(),
  icon: varchar('icon', { length: 60 }),
  sortOrder: integer('sort_order').default(0).notNull(),
});

// 4. Products Table (Dual Food & Retail Abstraction)
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  merchantId: uuid('merchant_id').references(() => merchants.id).notNull(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  productType: productTypeEnum('product_type').default('food').notNull(),
  nameEn: varchar('name_en', { length: 200 }).notNull(),
  nameAm: varchar('name_am', { length: 200 }).notNull(),
  nameOm: varchar('name_om', { length: 200 }).notNull(),
  descriptionEn: text('description_en'),
  descriptionAm: text('description_am'),
  descriptionOm: text('description_om'),
  basePriceEtb: numeric('base_price_etb', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  isAvailable: boolean('is_available').default(true).notNull(),
  sku: varchar('sku', { length: 100 }),
  stockQuantity: integer('stock_quantity').default(0),
  tags: text('tags').array(),
  timeSlots: text('time_slots').array(),
});

// 5. Orders Table
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderNumber: varchar('order_number', { length: 30 }).notNull().unique(),
  customerId: uuid('customer_id').references(() => users.id).notNull(),
  merchantId: uuid('merchant_id').references(() => merchants.id).notNull(),
  status: orderStatusEnum('status').default('pending').notNull(),
  subtotalEtb: numeric('subtotal_etb', { precision: 10, scale: 2 }).notNull(),
  deliveryFeeEtb: numeric('delivery_fee_etb', { precision: 10, scale: 2 }).default('40.00').notNull(),
  serviceFeeEtb: numeric('service_fee_etb', { precision: 10, scale: 2 }).default('10.00').notNull(),
  totalAmountEtb: numeric('total_amount_etb', { precision: 10, scale: 2 }).notNull(),
  merchantCommissionEtb: numeric('merchant_commission_etb', { precision: 10, scale: 2 }).notNull(),
  driverEarningsEtb: numeric('driver_earnings_etb', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: paymentMethodEnum('payment_method').default('telebirr').notNull(),
  deliveryAddressText: text('delivery_address_text').notNull(),
  deliveryLocation: postgisPoint('delivery_location').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 6. Deliveries Table
export const deliveries = pgTable('deliveries', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull().unique(),
  driverId: uuid('driver_id').references(() => users.id),
  status: deliveryStatusEnum('status').default('searching_driver').notNull(),
  pickupLocation: postgisPoint('pickup_location').notNull(),
  dropoffLocation: postgisPoint('dropoff_location').notNull(),
  distanceKm: numeric('distance_km', { precision: 5, scale: 2 }).notNull(),
  driverEarningsEtb: numeric('driver_earnings_etb', { precision: 10, scale: 2 }).notNull(),
  assignedAt: timestamp('assigned_at', { withTimezone: true }),
  pickedUpAt: timestamp('picked_up_at', { withTimezone: true }),
  deliveredAt: timestamp('delivered_at', { withTimezone: true }),
});
`;

export const schemaTables = [
  {
    name: 'users',
    description: 'Role-based access: Customer, Merchant, Driver, Super Admin. Supports Telegram mini-app chat ID linkage.',
    columns: ['id (UUID)', 'phone_number (UNIQUE)', 'full_name', 'role (ENUM)', 'language_preference', 'telegram_chat_id', 'created_at']
  },
  {
    name: 'merchants',
    description: 'Multi-tenant vendor accounts in Asela (Cafes, Restaurants, Hotels, Retail). Carries PostGIS location point and commission tier (15-30%).',
    columns: ['id (UUID)', 'owner_id (FK)', 'name_en/am/om', 'category (ENUM)', 'commission_rate', 'prep_time_minutes', 'location (PostGIS Point 4326)', 'is_open']
  },
  {
    name: 'categories',
    description: 'Category taxonomy with i18n names and icon references.',
    columns: ['id (UUID)', 'merchant_id (FK Nullable for Global)', 'name_en/am/om', 'slug', 'icon', 'sort_order']
  },
  {
    name: 'products',
    description: 'Unified Food & Retail model. Supports food customization options (sugar, milk) and retail SKUs/barcodes/inventory.',
    columns: ['id (UUID)', 'merchant_id (FK)', 'category_id (FK)', 'product_type (food/retail)', 'name_en/am/om', 'base_price_etb', 'sku', 'stock_quantity', 'tags[]', 'time_slots[]']
  },
  {
    name: 'product_option_groups & choices',
    description: 'Dynamic food add-ons and modifiers (e.g. coffee sugar level, extra injera, meat preparation).',
    columns: ['id', 'product_id (FK)', 'title_en/am/om', 'min/max_selections', 'choices: [name, price_adjustment]']
  },
  {
    name: 'product_variants',
    description: 'Retail inventory variants for future-proof Phase 2 expansion (sizes, packaging, colors, barcodes).',
    columns: ['id', 'product_id (FK)', 'sku (UNIQUE)', 'attributes (JSONB)', 'price_override_etb', 'stock_quantity']
  },
  {
    name: 'orders',
    description: 'Core order transactions with Asela financial splits (subtotal, delivery fee, 20% Kech commission, courier payout).',
    columns: ['id (UUID)', 'order_number (UNIQUE)', 'customer_id (FK)', 'merchant_id (FK)', 'status (ENUM)', 'total_amount_etb', 'merchant_commission_etb', 'driver_earnings_etb', 'delivery_location (PostGIS)']
  },
  {
    name: 'order_items',
    description: 'Snapshots of purchased products, quantity, unit price, and chosen add-on options.',
    columns: ['id', 'order_id (FK)', 'product_id (FK)', 'product_name_snapshot', 'quantity', 'unit_price_etb', 'selected_options_snapshot (JSONB)']
  },
  {
    name: 'driver_profiles',
    description: 'Asela courier fleet specifications: bicycle vs motorbike, real-time availability, GPS coordinates, and rating.',
    columns: ['id', 'user_id (FK)', 'vehicle_type (bicycle/motorbike)', 'is_online', 'is_available', 'current_location (PostGIS)', 'rating', 'total_deliveries']
  },
  {
    name: 'deliveries',
    description: 'Live dispatch lifecycle: searching courier -> assigned -> picked up -> delivered, with Asela route distance calculations.',
    columns: ['id (UUID)', 'order_id (FK)', 'driver_id (FK)', 'status (ENUM)', 'pickup_location (PostGIS)', 'dropoff_location (PostGIS)', 'distance_km', 'driver_earnings_etb']
  },
  {
    name: 'driver_location_history',
    description: 'Geospatial breadcrumbs stream for live map animation and dispatch route replay.',
    columns: ['id (BIGSERIAL)', 'driver_id (FK)', 'location (PostGIS)', 'speed_kmh', 'bearing', 'recorded_at']
  }
];
