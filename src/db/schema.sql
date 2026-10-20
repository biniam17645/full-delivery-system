-- ============================================================================
-- KECH (ከች) DELIVERY PLATFORM — PRODUCTION POSTGRESQL SCHEMA
-- Target Location: Asela, Oromia, Ethiopia (EPSG:4326 WGS 84)
-- Multi-Tenant, Multi-Category (Food Options + Store SKUs), PostGIS Enabled
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ----------------------------------------------------------------------------
-- 1. ENUMS
-- ----------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM (
  'customer',
  'merchant',
  'driver',
  'admin'
);

CREATE TYPE merchant_category AS ENUM (
  'cafe',
  'restaurant',
  'hotel',
  'supermarket',
  'pharmacy',
  'retail'
);

CREATE TYPE product_type AS ENUM (
  'food',       -- Menu item with configurable options (sugar, milk, toppings)
  'retail'      -- Inventory item with variants, SKUs, and stock tracking
);

CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed_by_merchant',
  'preparing',
  'ready_for_pickup',
  'assigned_to_driver',
  'driver_arrived_at_merchant',
  'out_for_delivery',
  'delivered',
  'cancelled'
);

CREATE TYPE delivery_status AS ENUM (
  'searching_driver',
  'driver_assigned',
  'heading_to_pickup',
  'package_picked_up',
  'in_transit',
  'delivered',
  'failed'
);

CREATE TYPE vehicle_type AS ENUM (
  'bicycle',     -- Primary fleet for central Asela terrain
  'motorbike',   -- For long distance / uphill Asela-Chilalo runs
  'on_foot'
);

CREATE TYPE payment_method AS ENUM (
  'telebirr',
  'cbe_birr',
  'cash_on_delivery'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'completed',
  'failed',
  'refunded'
);

-- ----------------------------------------------------------------------------
-- 2. USERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number VARCHAR(20) NOT NULL UNIQUE, -- e.g., +251912345678
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  password_hash VARCHAR(255),
  role user_role NOT NULL DEFAULT 'customer',
  language_preference VARCHAR(10) NOT NULL DEFAULT 'am', -- 'en', 'am', 'om'
  avatar_url TEXT,
  telegram_chat_id BIGINT UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_telegram ON users(telegram_chat_id);

-- ----------------------------------------------------------------------------
-- 3. MERCHANTS (Cafes, Restaurants, Hotels, Retail Stores in Asela)
-- ----------------------------------------------------------------------------
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  name_en VARCHAR(150) NOT NULL,
  name_am VARCHAR(150) NOT NULL,
  name_om VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  category merchant_category NOT NULL DEFAULT 'restaurant',
  phone_number VARCHAR(20) NOT NULL,
  commission_rate NUMERIC(5, 4) NOT NULL DEFAULT 0.2000, -- e.g. 0.20 = 20%
  rating NUMERIC(3, 2) NOT NULL DEFAULT 4.80,
  review_count INTEGER NOT NULL DEFAULT 0,
  prep_time_minutes INTEGER NOT NULL DEFAULT 20,
  cover_image_url TEXT,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_open BOOLEAN NOT NULL DEFAULT TRUE,
  
  -- Asela Physical Location
  address_text TEXT NOT NULL,
  kebele VARCHAR(50) DEFAULT 'Kebele 02', -- e.g. Kebele 01, Kebele 02, Arsi Uni
  location GEOGRAPHY(Point, 4326) NOT NULL, -- Longitude, Latitude
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_merchants_category ON merchants(category);
CREATE INDEX idx_merchants_is_open ON merchants(is_open) WHERE is_active = TRUE;
CREATE INDEX idx_merchants_location ON merchants USING GIST(location);

-- ----------------------------------------------------------------------------
-- 4. CATEGORIES (Hierarchical & Multi-tenant)
-- ----------------------------------------------------------------------------
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE, -- NULL = Global system category
  name_en VARCHAR(100) NOT NULL,
  name_am VARCHAR(100) NOT NULL,
  name_om VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  icon VARCHAR(60),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_merchant ON categories(merchant_id);

-- ----------------------------------------------------------------------------
-- 5. PRODUCTS (Unified Food & Retail Abstraction)
-- ----------------------------------------------------------------------------
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  product_type product_type NOT NULL DEFAULT 'food',
  
  -- Multilingual Product Metadata
  name_en VARCHAR(200) NOT NULL,
  name_am VARCHAR(200) NOT NULL,
  name_om VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_am TEXT,
  description_om TEXT,
  
  base_price_etb NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  prep_time_minutes INTEGER DEFAULT 15,
  
  -- Retail Inventory Fields (For Phase 2 supermarkets & pharmacies)
  sku VARCHAR(100),
  barcode VARCHAR(100),
  stock_quantity INTEGER DEFAULT 0,
  track_inventory BOOLEAN NOT NULL DEFAULT FALSE,

  -- Recommendation Engine Signals
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  time_slots TEXT[] DEFAULT ARRAY['lunch', 'evening']::TEXT[], -- 'morning', 'lunch', 'evening'
  frequently_bought_together UUID[] DEFAULT ARRAY[]::UUID[],
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_merchant ON products(merchant_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_products_available ON products(is_available);
CREATE INDEX idx_products_tags ON products USING GIN(tags);

-- ----------------------------------------------------------------------------
-- 6. PRODUCT OPTIONS & ADD-ONS (For Food: Sugar, Milk Type, Extra Injera)
-- ----------------------------------------------------------------------------
CREATE TABLE product_option_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title_en VARCHAR(100) NOT NULL,
  title_am VARCHAR(100) NOT NULL,
  title_om VARCHAR(100) NOT NULL,
  min_selections INTEGER NOT NULL DEFAULT 0,
  max_selections INTEGER NOT NULL DEFAULT 1,
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_option_groups_product ON product_option_groups(product_id);

CREATE TABLE product_option_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES product_option_groups(id) ON DELETE CASCADE,
  name_en VARCHAR(100) NOT NULL,
  name_am VARCHAR(100) NOT NULL,
  name_om VARCHAR(100) NOT NULL,
  price_adjustment_etb NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  is_available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_option_choices_group ON product_option_choices(group_id);

-- ----------------------------------------------------------------------------
-- 7. PRODUCT VARIANTS (For Retail: Sizes, Volumes, Colors)
-- ----------------------------------------------------------------------------
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) NOT NULL UNIQUE,
  name_en VARCHAR(100) NOT NULL,
  name_am VARCHAR(100) NOT NULL,
  name_om VARCHAR(100) NOT NULL,
  attributes JSONB NOT NULL DEFAULT '{}'::JSONB, -- e.g. {"size": "1L", "brand": "Anchor"}
  price_override_etb NUMERIC(10, 2), -- If null, use product base_price_etb
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_product_variants_sku ON product_variants(sku);

-- ----------------------------------------------------------------------------
-- 8. ORDERS
-- ----------------------------------------------------------------------------
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(30) NOT NULL UNIQUE, -- e.g. "KCH-20261018-0042"
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE RESTRICT,
  status order_status NOT NULL DEFAULT 'pending',
  
  -- Financial Breakdown (in Ethiopian Birr)
  subtotal_etb NUMERIC(10, 2) NOT NULL,
  delivery_fee_etb NUMERIC(10, 2) NOT NULL DEFAULT 40.00,
  service_fee_etb NUMERIC(10, 2) NOT NULL DEFAULT 10.00,
  total_amount_etb NUMERIC(10, 2) NOT NULL,
  merchant_commission_etb NUMERIC(10, 2) NOT NULL,
  driver_earnings_etb NUMERIC(10, 2) NOT NULL,
  
  -- Payment
  payment_method payment_method NOT NULL DEFAULT 'telebirr',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_reference VARCHAR(150),
  
  -- Dropoff Address in Asela
  delivery_address_text TEXT NOT NULL,
  delivery_kebele VARCHAR(50),
  delivery_location GEOGRAPHY(Point, 4326) NOT NULL,
  special_instructions TEXT,
  estimated_delivery_minutes INTEGER DEFAULT 35,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_merchant ON orders(merchant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_delivery_loc ON orders USING GIST(delivery_location);

-- ----------------------------------------------------------------------------
-- 9. ORDER ITEMS
-- ----------------------------------------------------------------------------
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name_snapshot VARCHAR(200) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_etb NUMERIC(10, 2) NOT NULL,
  total_price_etb NUMERIC(10, 2) NOT NULL,
  selected_options_snapshot JSONB DEFAULT '[]'::JSONB
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ----------------------------------------------------------------------------
-- 10. DRIVER PROFILES (Couriers / Bicycle Drivers in Asela)
-- ----------------------------------------------------------------------------
CREATE TABLE driver_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  vehicle_type vehicle_type NOT NULL DEFAULT 'bicycle',
  vehicle_identifier VARCHAR(100), -- Bicycle ID or Motorbike Plate
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  current_location GEOGRAPHY(Point, 4326),
  current_bearing NUMERIC(5, 2), -- 0 - 360 degrees
  battery_percentage SMALLINT,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 4.90,
  total_deliveries INTEGER NOT NULL DEFAULT 0,
  last_ping_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_profiles_available ON driver_profiles(is_online, is_available);
CREATE INDEX idx_driver_profiles_location ON driver_profiles USING GIST(current_location);

-- ----------------------------------------------------------------------------
-- 11. DELIVERIES (Dispatch & Execution)
-- ----------------------------------------------------------------------------
CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE RESTRICT,
  driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status delivery_status NOT NULL DEFAULT 'searching_driver',
  
  -- Spatial Points for Asela
  pickup_location GEOGRAPHY(Point, 4326) NOT NULL,
  dropoff_location GEOGRAPHY(Point, 4326) NOT NULL,
  pickup_address_text TEXT NOT NULL,
  dropoff_address_text TEXT NOT NULL,
  
  distance_km NUMERIC(5, 2) NOT NULL,
  estimated_duration_minutes INTEGER NOT NULL,
  driver_earnings_etb NUMERIC(10, 2) NOT NULL,
  
  assigned_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_deliveries_order ON deliveries(order_id);
CREATE INDEX idx_deliveries_driver ON deliveries(driver_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_deliveries_pickup_loc ON deliveries USING GIST(pickup_location);
CREATE INDEX idx_deliveries_dropoff_loc ON deliveries USING GIST(dropoff_location);

-- ----------------------------------------------------------------------------
-- 12. DRIVER LOCATION HISTORY (Real-time breadcrumbs)
-- ----------------------------------------------------------------------------
CREATE TABLE driver_location_history (
  id BIGSERIAL PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location GEOGRAPHY(Point, 4326) NOT NULL,
  speed_kmh NUMERIC(5, 2),
  bearing NUMERIC(5, 2),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_history_driver_time ON driver_location_history(driver_id, recorded_at DESC);
CREATE INDEX idx_driver_history_location ON driver_location_history USING GIST(location);

-- ----------------------------------------------------------------------------
-- 13. SPATIAL DISPATCH FUNCTION: Find Closest Couriers in Asela
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION find_nearest_available_drivers(
  p_merchant_lon DOUBLE PRECISION,
  p_merchant_lat DOUBLE PRECISION,
  p_radius_meters DOUBLE PRECISION DEFAULT 4000.0,
  p_vehicle_type vehicle_type DEFAULT NULL
)
RETURNS TABLE (
  driver_id UUID,
  full_name VARCHAR,
  phone_number VARCHAR,
  vehicle vehicle_type,
  distance_meters DOUBLE PRECISION,
  rating NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id AS driver_id,
    u.full_name,
    u.phone_number,
    dp.vehicle_type AS vehicle,
    ST_Distance(
      dp.current_location,
      ST_SetSRID(ST_MakePoint(p_merchant_lon, p_merchant_lat), 4326)::geography
    ) AS distance_meters,
    dp.rating
  FROM driver_profiles dp
  JOIN users u ON u.id = dp.user_id
  WHERE dp.is_online = TRUE 
    AND dp.is_available = TRUE
    AND (p_vehicle_type IS NULL OR dp.vehicle_type = p_vehicle_type)
    AND ST_DWithin(
      dp.current_location,
      ST_SetSRID(ST_MakePoint(p_merchant_lon, p_merchant_lat), 4326)::geography,
      p_radius_meters
    )
  ORDER BY distance_meters ASC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;
