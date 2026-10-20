import React, { useState } from 'react';
import { 
  Database, 
  Copy, 
  Check, 
  Code, 
  Layers, 
  Network, 
  FileText, 
  Terminal, 
  Server, 
  ShieldCheck, 
  MapPin, 
  Zap, 
  Cpu 
} from 'lucide-react';
import { schemaTables, schemaDefinitionString } from '../db/schema';
import { LanguageCode } from '../types';
import { getTranslation } from '../i18n';
import enJson from '../i18n/en.json';
import amJson from '../i18n/am.json';
import omJson from '../i18n/om.json';

interface SchemaViewProps {
  language: LanguageCode;
}

export const SchemaView: React.FC<SchemaViewProps> = ({ language }) => {
  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState<'sql' | 'orm' | 'erd' | 'i18n' | 'architecture'>('sql');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const rawSqlDDL = `-- ============================================================================
-- KECH (ከች) DELIVERY PLATFORM — PRODUCTION POSTGRESQL SCHEMA
-- Target Location: Asela, Oromia, Ethiopia (EPSG:4326 WGS 84)
-- Multi-Tenant, Multi-Category (Food Options + Store SKUs), PostGIS Enabled
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('customer', 'merchant', 'driver', 'admin');
CREATE TYPE merchant_category AS ENUM ('cafe', 'restaurant', 'hotel', 'supermarket', 'pharmacy', 'retail');
CREATE TYPE product_type AS ENUM ('food', 'retail');
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed_by_merchant', 'preparing', 'ready_for_pickup',
  'assigned_to_driver', 'driver_arrived_at_merchant', 'out_for_delivery', 'delivered', 'cancelled'
);
CREATE TYPE delivery_status AS ENUM (
  'searching_driver', 'driver_assigned', 'heading_to_pickup',
  'package_picked_up', 'in_transit', 'delivered', 'failed'
);
CREATE TYPE vehicle_type AS ENUM ('bicycle', 'motorbike', 'on_foot');
CREATE TYPE payment_method AS ENUM ('telebirr', 'cbe_birr', 'cash_on_delivery');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- 2. USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  password_hash VARCHAR(255),
  role user_role NOT NULL DEFAULT 'customer',
  language_preference VARCHAR(10) NOT NULL DEFAULT 'am', -- 'en', 'am', 'om'
  avatar_url TEXT,
  telegram_chat_id BIGINT UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_role ON users(role);

-- 3. MERCHANTS
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  name_en VARCHAR(150) NOT NULL,
  name_am VARCHAR(150) NOT NULL,
  name_om VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  category merchant_category NOT NULL DEFAULT 'restaurant',
  phone_number VARCHAR(20) NOT NULL,
  commission_rate NUMERIC(5, 4) NOT NULL DEFAULT 0.2000, -- 20%
  rating NUMERIC(3, 2) NOT NULL DEFAULT 4.80,
  review_count INTEGER NOT NULL DEFAULT 0,
  prep_time_minutes INTEGER NOT NULL DEFAULT 20,
  cover_image_url TEXT,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_open BOOLEAN NOT NULL DEFAULT TRUE,
  address_text TEXT NOT NULL,
  kebele VARCHAR(50) DEFAULT 'Kebele 02',
  location GEOGRAPHY(Point, 4326) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_merchants_location ON merchants USING GIST(location);

-- 4. CATEGORIES
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  name_en VARCHAR(100) NOT NULL,
  name_am VARCHAR(100) NOT NULL,
  name_om VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  icon VARCHAR(60),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PRODUCTS (Dual Food & Store Abstraction)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  product_type product_type NOT NULL DEFAULT 'food',
  name_en VARCHAR(200) NOT NULL,
  name_am VARCHAR(200) NOT NULL,
  name_om VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_am TEXT,
  description_om TEXT,
  base_price_etb NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  sku VARCHAR(100),
  barcode VARCHAR(100),
  stock_quantity INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  time_slots TEXT[] DEFAULT ARRAY['lunch', 'evening']::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_products_tags ON products USING GIN(tags);

-- 6. PRODUCT OPTIONS (For Food Modifiers: Sugar, Milk, Extra Injera)
CREATE TABLE product_option_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title_en VARCHAR(100) NOT NULL,
  title_am VARCHAR(100) NOT NULL,
  title_om VARCHAR(100) NOT NULL,
  min_selections INTEGER NOT NULL DEFAULT 0,
  max_selections INTEGER NOT NULL DEFAULT 1,
  is_required BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE product_option_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES product_option_groups(id) ON DELETE CASCADE,
  name_en VARCHAR(100) NOT NULL,
  name_am VARCHAR(100) NOT NULL,
  name_om VARCHAR(100) NOT NULL,
  price_adjustment_etb NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

-- 7. PRODUCT VARIANTS (For Retail SKUs: Sizes, Colors, Volume)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) NOT NULL UNIQUE,
  name_en VARCHAR(100) NOT NULL,
  name_am VARCHAR(100) NOT NULL,
  name_om VARCHAR(100) NOT NULL,
  attributes JSONB NOT NULL DEFAULT '{}'::JSONB,
  price_override_etb NUMERIC(10, 2),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT TRUE
);

-- 8. ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(30) NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE RESTRICT,
  status order_status NOT NULL DEFAULT 'pending',
  subtotal_etb NUMERIC(10, 2) NOT NULL,
  delivery_fee_etb NUMERIC(10, 2) NOT NULL DEFAULT 40.00,
  service_fee_etb NUMERIC(10, 2) NOT NULL DEFAULT 10.00,
  total_amount_etb NUMERIC(10, 2) NOT NULL,
  merchant_commission_etb NUMERIC(10, 2) NOT NULL,
  driver_earnings_etb NUMERIC(10, 2) NOT NULL,
  payment_method payment_method NOT NULL DEFAULT 'telebirr',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  delivery_address_text TEXT NOT NULL,
  delivery_kebele VARCHAR(50),
  delivery_location GEOGRAPHY(Point, 4326) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_orders_delivery_loc ON orders USING GIST(delivery_location);

-- 9. ORDER ITEMS
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

-- 10. DRIVER PROFILES (Asela Bicycle & Motorbike Fleet)
CREATE TABLE driver_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  vehicle_type vehicle_type NOT NULL DEFAULT 'bicycle',
  vehicle_identifier VARCHAR(100),
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  current_location GEOGRAPHY(Point, 4326),
  current_bearing NUMERIC(5, 2),
  battery_percentage SMALLINT,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 4.90,
  total_deliveries INTEGER NOT NULL DEFAULT 0,
  last_ping_at TIMESTAMPTZ
);
CREATE INDEX idx_driver_profiles_location ON driver_profiles USING GIST(current_location);

-- 11. DELIVERIES
CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE RESTRICT,
  driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status delivery_status NOT NULL DEFAULT 'searching_driver',
  pickup_location GEOGRAPHY(Point, 4326) NOT NULL,
  dropoff_location GEOGRAPHY(Point, 4326) NOT NULL,
  pickup_address_text TEXT NOT NULL,
  dropoff_address_text TEXT NOT NULL,
  distance_km NUMERIC(5, 2) NOT NULL,
  estimated_duration_minutes INTEGER NOT NULL,
  driver_earnings_etb NUMERIC(10, 2) NOT NULL,
  assigned_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);
CREATE INDEX idx_deliveries_pickup_loc ON deliveries USING GIST(pickup_location);
CREATE INDEX idx_deliveries_dropoff_loc ON deliveries USING GIST(dropoff_location);

-- 12. SPATIAL DISPATCH FUNCTION (Nearest Asela Couriers via PostGIS)
CREATE OR REPLACE FUNCTION find_nearest_available_drivers(
  p_merchant_lon DOUBLE PRECISION,
  p_merchant_lat DOUBLE PRECISION,
  p_radius_meters DOUBLE PRECISION DEFAULT 4000.0
)
RETURNS TABLE (
  driver_id UUID,
  distance_meters DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    dp.user_id,
    ST_Distance(
      dp.current_location,
      ST_SetSRID(ST_MakePoint(p_merchant_lon, p_merchant_lat), 4326)::geography
    ) AS distance_meters
  FROM driver_profiles dp
  WHERE dp.is_online = TRUE 
    AND dp.is_available = TRUE
    AND ST_DWithin(
      dp.current_location,
      ST_SetSRID(ST_MakePoint(p_merchant_lon, p_merchant_lat), 4326)::geography,
      p_radius_meters
    )
  ORDER BY distance_meters ASC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      
      {/* Title & Architecture Badges */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
            <Database className="w-3.5 h-3.5" />
            <span>PostgreSQL 16 + PostGIS Spatial Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {t.schema.title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            {t.schema.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard(rawSqlDDL, 'sql-top')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition active:scale-95"
          >
            {copiedKey === 'sql-top' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey === 'sql-top' ? t.schema.copied : t.schema.copySql}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('sql')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'sql'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>{t.schema.viewSQL}</span>
        </button>

        <button
          onClick={() => setActiveTab('orm')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'orm'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>{t.schema.viewORM}</span>
        </button>

        <button
          onClick={() => setActiveTab('erd')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'erd'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>{t.schema.viewERD}</span>
        </button>

        <button
          onClick={() => setActiveTab('i18n')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'i18n'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t.schema.viewI18n} (EN / AM / OM)</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'architecture'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Asela Dispatch & GIS Architecture</span>
        </button>
      </div>

      {/* Tab: SQL DDL */}
      {activeTab === 'sql' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">
              PostgreSQL 16 Script • 12 Tables • Spatial GiST Indexes • PostGIS ST_DWithin Stored Proc
            </span>
            <button
              onClick={() => copyToClipboard(rawSqlDDL, 'sql-body')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
            >
              {copiedKey === 'sql-body' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'sql-body' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-3xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed shadow-2xl max-h-[600px] scrollbar-thin">
            {rawSqlDDL}
          </pre>
        </div>
      )}

      {/* Tab: ORM Schema */}
      {activeTab === 'orm' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">
              Drizzle / TypeScript ORM Schema • Strong Typing for Node.js / Express backend
            </span>
            <button
              onClick={() => copyToClipboard(schemaDefinitionString, 'orm-code')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
            >
              {copiedKey === 'orm-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'orm-code' ? 'Copied!' : 'Copy ORM Types'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-3xl bg-zinc-950 text-sky-400 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed shadow-2xl max-h-[600px] scrollbar-thin">
            {schemaDefinitionString}
          </pre>
        </div>
      )}

      {/* Tab: ERD Diagram */}
      {activeTab === 'erd' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            Entity Relationship Diagram representing the relational architecture of the Kech ecosystem.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemaTables.map((tbl, idx) => (
              <div
                key={tbl.name}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <h4 className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {tbl.name}
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Table</span>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {tbl.description}
                </p>

                <div className="space-y-1 pt-1 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                  {tbl.columns.map((col, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-1.5 py-0.5 border-b border-zinc-50 dark:border-zinc-800/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{col}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: i18n JSON translation templates */}
      {activeTab === 'i18n' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            Standard key-value i18n JSON files covering initial UI strings for English, Amharic (አማርኛ), and Afaan Oromoo.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* English */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">en.json (English)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(enJson, null, 2), 'i18n-en')}
                  className="text-xs text-emerald-600 hover:underline"
                >
                  {copiedKey === 'i18n-en' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-zinc-950 text-zinc-300 font-mono text-[11px] overflow-x-auto border border-zinc-800 max-h-96">
                {JSON.stringify(enJson, null, 2)}
              </pre>
            </div>

            {/* Amharic */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">am.json (አማርኛ)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(amJson, null, 2), 'i18n-am')}
                  className="text-xs text-emerald-600 hover:underline"
                >
                  {copiedKey === 'i18n-am' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-zinc-950 text-amber-300 font-mono text-[11px] overflow-x-auto border border-zinc-800 max-h-96">
                {JSON.stringify(amJson, null, 2)}
              </pre>
            </div>

            {/* Afaan Oromoo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">om.json (Afaan Oromoo)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(omJson, null, 2), 'i18n-om')}
                  className="text-xs text-emerald-600 hover:underline"
                >
                  {copiedKey === 'i18n-om' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-zinc-950 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-zinc-800 max-h-96">
                {JSON.stringify(omJson, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Architectural Highlights & Asela Dispatch */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                🗺️
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                1. Asela Geospatial Dispatch (PostGIS EPSG:4326)
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Asela sits along the slope of Mount Chilalo. Terrain-conscious dispatch assigns bicycle couriers for central downhill / flat routes (Kebele 01 & 02, Stadium area, Post Office) and motorbikes for steep uphill runs towards Chilalo ridge & Arsi University higher gates.
              </p>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                ST_DWithin(driver_loc, merchant_loc, 4000) WITH GiST index
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                💰
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                2. Commission & Earnings Math
              </h3>
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc pl-4">
                <li><strong className="text-zinc-900 dark:text-zinc-100">Customer pays:</strong> Subtotal + Zone Delivery Fee (35 - 50 ETB) + Service Fee (10 ETB).</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Merchant pays:</strong> 15% - 20% platform commission on gross subtotal.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Courier receives:</strong> 100% of Delivery Fee + per-km bonus + tips.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Instant Settlements:</strong> Telebirr & Commercial Bank of Ethiopia (CBE Birr).</li>
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                🤖
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                3. ML Recommendation Engine
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Combines content-based filtering (meal types, caffeine levels, halal/fasting food) with time-aware collaborative filtering. In the morning hours (06:00 - 11:00), Habesha macchiato, bunna, and pastries surface automatically; at lunch (11:30 - 15:00), beef tibs and beyaynetu take precedence.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                📦
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                4. Future-Proof Dual Product Model
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Phase 1 supports food add-ons and modifiers (sugar, milk type, extra injera). Phase 2 uses the exact same schema for retail supermarkets and pharmacies with multi-attribute variants (weight, packaging, sizes), barcodes, and stock counters.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
