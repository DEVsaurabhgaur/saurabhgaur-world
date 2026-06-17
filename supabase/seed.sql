-- ============================================================
-- saurabhgaur.world — Seed Data (for local/staging testing)
-- ============================================================

insert into art_products (title, description, price_inr, tags, style, thumbnail_url, file_url, is_published)
values
  (
    'Neon Samurai',
    'A cyberpunk warrior illuminated by neon city lights. High-resolution digital art generated with Stable Diffusion.',
    29900,  -- ₹299
    array['cyberpunk', 'warrior', 'neon', 'dark'],
    'Cyberpunk',
    'https://your-project.supabase.co/storage/v1/object/public/art-thumbnails/neon-samurai-thumb.jpg',
    'https://your-project.supabase.co/storage/v1/object/public/art-files/neon-samurai-hd.png',
    true
  ),
  (
    'Digital Empress',
    'A regal portrait with futuristic elements — flowing silk meets circuit-board patterns.',
    39900,  -- ₹399
    array['portrait', 'empress', 'futuristic', 'regal'],
    'Portrait',
    'https://your-project.supabase.co/storage/v1/object/public/art-thumbnails/digital-empress-thumb.jpg',
    'https://your-project.supabase.co/storage/v1/object/public/art-files/digital-empress-hd.png',
    true
  ),
  (
    'Tokyo Rain',
    'Rainy Tokyo street at midnight — anime-style with reflections and neon signs.',
    24900,  -- ₹249
    array['anime', 'tokyo', 'rain', 'night'],
    'Anime',
    'https://your-project.supabase.co/storage/v1/object/public/art-thumbnails/tokyo-rain-thumb.jpg',
    'https://your-project.supabase.co/storage/v1/object/public/art-files/tokyo-rain-hd.png',
    true
  ),
  (
    'Void Bloom',
    'Abstract cosmic bloom — swirling dark matter giving birth to light. Midjourney v6.',
    19900,  -- ₹199
    array['abstract', 'cosmic', 'dark', 'bloom'],
    'Abstract',
    'https://your-project.supabase.co/storage/v1/object/public/art-thumbnails/void-bloom-thumb.jpg',
    'https://your-project.supabase.co/storage/v1/object/public/art-files/void-bloom-hd.png',
    true
  ),
  (
    'Mountain Oracle',
    'A lone figure stands before an ancient mountain shrine. Dreamlike landscape with fog and golden hour light.',
    34900,  -- ₹349
    array['landscape', 'mountain', 'mystic', 'fog'],
    'Landscape',
    'https://your-project.supabase.co/storage/v1/object/public/art-thumbnails/mountain-oracle-thumb.jpg',
    'https://your-project.supabase.co/storage/v1/object/public/art-files/mountain-oracle-hd.png',
    false  -- draft
  );
