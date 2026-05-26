-- Enable Row Level Security (RLS) helper functions and triggers
-- Run this in your Supabase SQL Editor

-- --------------------------------------------------
-- 1. Create Profiles Table (extends auth.users)
-- --------------------------------------------------
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  fullname text not null,
  phone text,
  role text not null default 'user' check (role in ('user', 'admin')),
  joined_date timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- --------------------------------------------------
-- 2. Create Products Table
-- --------------------------------------------------
create table public.products (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  category text not null,
  image text,
  features text[] default '{}'::text[],
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.products enable row level security;

-- --------------------------------------------------
-- 3. Create Offers Table (linked to Products)
-- --------------------------------------------------
create table public.offers (
  id bigint generated always as identity primary key,
  product_id bigint references public.products(id) on delete cascade unique,
  discount text not null,
  promo_code text not null unique,
  valid_until timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.offers enable row level security;

-- --------------------------------------------------
-- 4. Create Orders Table
-- --------------------------------------------------
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  order_number text not null unique,
  transaction_id text unique,
  profile_id uuid references public.profiles(id) on delete set null,
  product_id bigint references public.products(id) on delete restrict,
  qty integer not null check (qty > 0),
  amount numeric(10, 2) not null check (amount >= 0),
  gateway text not null check (gateway in ('Khalti', 'eSewa')),
  status text not null default 'Pending' check (status in ('Pending', 'Completed', 'Failed', 'Canceled')),
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.orders enable row level security;

-- --------------------------------------------------
-- 5. Indexes (for Joins and Performance)
-- --------------------------------------------------
create index orders_profile_id_idx on public.orders (profile_id);
create index orders_product_id_idx on public.orders (product_id);
create index offers_product_id_idx on public.offers (product_id);

-- --------------------------------------------------
-- 6. Row-Level Security (RLS) Policies
-- --------------------------------------------------

-- Profiles Policies
create policy "Public profiles are viewable by everyone" 
  on public.profiles for select 
  using (true);

create policy "Users can update their own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Users can insert their own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

-- Products Policies
create policy "Products are viewable by everyone" 
  on public.products for select 
  using (true);

create policy "Products can only be managed by admins" 
  on public.products for all 
  using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Offers Policies
create policy "Offers are viewable by everyone" 
  on public.offers for select 
  using (true);

-- Orders Policies
create policy "Users can view their own orders" 
  on public.orders for select 
  using (auth.uid() = profile_id);

create policy "Users can insert their own orders" 
  on public.orders for insert 
  with check (auth.uid() = profile_id);

create policy "Admins can view all orders" 
  on public.orders for select 
  using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- --------------------------------------------------
-- 7. Automatic Profile Creation Trigger
-- --------------------------------------------------
-- Automatically creates a profile when a new user registers in Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, fullname, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'fullname', new.raw_user_meta_data->>'name', 'New User'),
    new.raw_user_meta_data->>'phone',
    'user'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
