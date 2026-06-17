-- ============================================================
-- saurabhgaur.world — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. ART PRODUCTS
-- ============================================================
create table if not exists art_products (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  description     text,
  price_inr       integer not null check (price_inr > 0),  -- stored in paise
  tags            text[] default '{}',
  style           text,
  thumbnail_url   text not null,
  file_url        text not null,
  is_published    boolean not null default false,
  created_at      timestamptz not null default now()
);

-- RLS: anyone can read published products, only service role can write
alter table art_products enable row level security;

create policy "Public read published products"
  on art_products for select
  using (is_published = true);

-- Index for gallery queries
create index if not exists idx_art_products_published_created
  on art_products (is_published, created_at desc);

create index if not exists idx_art_products_style
  on art_products (style);

-- ============================================================
-- 2. ORDERS
-- ============================================================
create table if not exists orders (
  id                   uuid primary key default gen_random_uuid(),
  buyer_email          text not null,
  razorpay_order_id    text not null unique,
  razorpay_payment_id  text,
  amount_inr           integer not null,   -- in paise
  status               text not null default 'pending'
                         check (status in ('pending', 'paid', 'failed')),
  created_at           timestamptz not null default now()
);

alter table orders enable row level security;
-- No public access — only service role (server-side API) can read/write

create index if not exists idx_orders_email    on orders (buyer_email);
create index if not exists idx_orders_rzp_id   on orders (razorpay_order_id);
create index if not exists idx_orders_status   on orders (status);
create index if not exists idx_orders_created  on orders (created_at desc);

-- ============================================================
-- 3. ORDER ITEMS
-- ============================================================
create table if not exists order_items (
  id                 uuid primary key default gen_random_uuid(),
  order_id           uuid not null references orders(id) on delete cascade,
  product_id         uuid not null references art_products(id) on delete restrict,
  price_at_purchase  integer not null,   -- snapshot price in paise
  created_at         timestamptz not null default now()
);

alter table order_items enable row level security;

create index if not exists idx_order_items_order   on order_items (order_id);
create index if not exists idx_order_items_product on order_items (product_id);

-- ============================================================
-- 4. DOWNLOAD TOKENS
-- ============================================================
create table if not exists download_tokens (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  product_id  uuid not null references art_products(id) on delete cascade,
  token       text not null unique,
  expires_at  timestamptz not null,
  used_at     timestamptz,
  created_at  timestamptz not null default now()
);

alter table download_tokens enable row level security;

create index if not exists idx_download_tokens_token      on download_tokens (token);
create index if not exists idx_download_tokens_order      on download_tokens (order_id);
create index if not exists idx_download_tokens_expires    on download_tokens (expires_at);

-- ============================================================
-- 5. STORAGE BUCKETS
-- Run separately in: Storage → New Bucket
-- ============================================================
-- Bucket 1: art-thumbnails  (public,  max 5MB,  images only)
-- Bucket 2: art-files       (private, max 50MB, any file)
--
-- Or run via SQL:

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('art-thumbnails', 'art-thumbnails', true,  5242880,  array['image/jpeg','image/png','image/webp']),
  ('art-files',      'art-files',      false, 52428800, null)
on conflict (id) do nothing;

-- Storage RLS: thumbnails are public
create policy "Public read thumbnails"
  on storage.objects for select
  using (bucket_id = 'art-thumbnails');

-- art-files: only service role (no public policy — signed URLs used)

-- ============================================================
-- 6. USEFUL VIEWS
-- ============================================================

-- Revenue summary
create or replace view revenue_summary as
select
  date_trunc('day', created_at) as day,
  count(*) as order_count,
  sum(amount_inr) as total_paise,
  round(sum(amount_inr)::numeric / 100, 2) as total_inr
from orders
where status = 'paid'
group by 1
order by 1 desc;

-- Top selling products
create or replace view top_products as
select
  p.id,
  p.title,
  p.style,
  p.price_inr,
  count(oi.id) as times_sold,
  sum(oi.price_at_purchase) as revenue_paise
from art_products p
left join order_items oi on oi.product_id = p.id
left join orders o on o.id = oi.order_id and o.status = 'paid'
group by p.id
order by times_sold desc;

-- ============================================================
-- 7. CLEANUP FUNCTION (expired tokens)
-- ============================================================
create or replace function cleanup_expired_tokens()
returns void language sql as $$
  delete from download_tokens
  where expires_at < now() - interval '7 days';
$$;

-- Optional: schedule via pg_cron (enable pg_cron extension first)
-- select cron.schedule('cleanup-tokens', '0 3 * * *', 'select cleanup_expired_tokens()');
