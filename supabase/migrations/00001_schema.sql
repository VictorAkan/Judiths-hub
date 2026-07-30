-- Jwears Database Schema
-- Run: supabase db push

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE product_condition AS ENUM ('pre-loved', 'recycled', 'upcycled');
CREATE TYPE product_size AS ENUM ('xs', 's', 'm', 'l', 'xl', 'xxl');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');

-- ============================================
-- TABLES
-- ============================================

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT,
  first_name  TEXT,
  last_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Products
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT NOT NULL,
  price           INTEGER NOT NULL,
  compare_at_price INTEGER,
  condition       product_condition NOT NULL,
  sizes           product_size[] NOT NULL,
  images          TEXT[] NOT NULL,
  material        TEXT,
  category        TEXT,
  style           TEXT,
  in_stock        BOOLEAN DEFAULT true,
  featured        BOOLEAN DEFAULT false,
  eco_score       INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_products_condition ON products(condition);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;

-- Wishlists
CREATE TABLE wishlists (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Carts
CREATE TABLE carts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Cart Items
CREATE TABLE cart_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id     UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size        product_size NOT NULL,
  quantity    INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(cart_id, product_id, size)
);

-- Orders
CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status          order_status NOT NULL DEFAULT 'pending',
  total           INTEGER NOT NULL,
  shipping_address JSONB NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Order Items
CREATE TABLE order_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL,
  size        product_size NOT NULL,
  quantity    INTEGER NOT NULL DEFAULT 1,
  price       INTEGER NOT NULL
);

-- Addresses
CREATE TABLE addresses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label       TEXT DEFAULT 'Home',
  line1       TEXT NOT NULL,
  line2       TEXT,
  city        TEXT NOT NULL,
  state       TEXT NOT NULL,
  zip         TEXT NOT NULL,
  is_default  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Products (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT USING (true);

-- Wishlists
CREATE POLICY "Users can view own wishlist"
  ON wishlists FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to wishlist"
  ON wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from wishlist"
  ON wishlists FOR DELETE USING (auth.uid() = user_id);

-- Carts
CREATE POLICY "Users can view own cart"
  ON carts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own cart"
  ON carts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
  ON carts FOR UPDATE USING (auth.uid() = user_id);

-- Cart Items
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid())
  );

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid())
  );

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE USING (
    EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid())
  );

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE USING (
    EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid())
  );

-- Orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

CREATE POLICY "Users can create order items"
  ON order_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- Addresses
CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert addresses"
  ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update addresses"
  ON addresses FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete addresses"
  ON addresses FOR DELETE USING (auth.uid() = user_id);
