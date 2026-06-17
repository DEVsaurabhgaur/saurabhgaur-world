# saurabhgaur.world

Full-stack portfolio + AI art storefront built with **Next.js 14**, **Supabase**, and **Razorpay**.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Database + Storage | Supabase (PostgreSQL + Storage) |
| Payments | Razorpay (UPI, Cards, Net Banking) |
| Email | Resend |
| Deployment | Vercel |

## Local Setup

### 1. Clone & install
```bash
git clone https://github.com/YOUR_USERNAME/saurabhgaur.world.git
cd saurabhgaur.world
npm install
```

### 2. Environment variables
```bash
cp .env.example .env.local
```
Fill in all values in `.env.local` (see `.env.example` for what's needed).

### 3. Supabase setup
1. Create project at https://supabase.com
2. Run `supabase/schema.sql` in SQL Editor
3. Run `supabase/seed.sql` for test data (optional)
4. Create storage buckets: `art-thumbnails` (public) and `art-files` (private)

### 4. Run dev server
```bash
npm run dev
```
Open http://localhost:3000

## Deployment

Push to GitHub → connect to Vercel → add env vars → deploy.

See full setup guide: ask Claude at https://claude.ai

## Admin

Visit `/login` and enter your `ADMIN_SECRET` to access the admin panel at `/admin`.

## License

Personal use. All art and content © Saurabh Kumar Gaur.
