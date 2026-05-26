-- 1. Add missing columns to the existing products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS features TEXT[],
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- 2. Create the products table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT,
    image_url TEXT,
    features TEXT[],
    tags TEXT[]
);

-- 3. Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any existing policies (to prevent infinite recursion from old setups)
DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN
        SELECT policyname FROM pg_policies WHERE tablename = 'products' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.products;', pol.policyname);
    END LOOP;
END
$$;

-- 5. Create fresh policies
CREATE POLICY "Allow public read access on products"
ON public.products FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert on products"
ON public.products FOR INSERT
TO public
WITH CHECK (true);

-- 6. Create the product-images storage bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage Policies for product-images bucket
-- Allow public read access to images
DROP POLICY IF EXISTS "Allow public read access on product-images" ON storage.objects;
CREATE POLICY "Allow public read access on product-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Allow public uploads to product-images temporarily
DROP POLICY IF EXISTS "Allow public upload to product-images" ON storage.objects;
CREATE POLICY "Allow public upload to product-images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-images');
