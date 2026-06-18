<div align="center">

# 🌐 saurabhgaur.world

**Full-stack portfolio + AI art storefront** — built with Next.js 14, Supabase, and Razorpay.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-072654?logo=razorpay&logoColor=white)](https://razorpay.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

[Live Site →](https://saurabhgaur.world)

</div>

---

## ✨ Features

- **Portfolio** — Hero, About, Skills, Projects (with GitHub repo live-pull), and Contact CTA
- **AI Art Storefront** — Browse, filter by style/tags, and purchase digital art prints
- **Cart & Checkout** — Persistent cart drawer with Razorpay payment (UPI, Cards, Net Banking)
- **Secure Downloads** — Time-limited, single-use download tokens delivered after payment
- **Transactional Email** — Order confirmation + download links via Resend
- **Admin Panel** — Protected dashboard at `/admin` to manage products and view orders
- **SEO-Ready** — `sitemap.ts`, `robots.ts`, semantic HTML, and proper meta tags
- **Cyber UI** — Custom animated cursor, HUD controller, and terminal-style components

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Database + Storage | Supabase (PostgreSQL + Storage buckets) |
| Payments | Razorpay (UPI, Cards, Net Banking) |
| Transactional Email | Resend + React Email |
| UI | Tailwind CSS, Radix UI, Lucide React |
| Deployment | Vercel |

---

## 📁 Project Structure

```
saurabhgaur.world/
├── app/
│   ├── (public)/           # Public pages (home, /art, /projects, /contact, /cart)
│   ├── (admin)/            # Protected admin panel (/admin, /admin/products, /admin/orders)
│   ├── (auth)/             # Login page
│   └── api/
│       ├── payment/        # Razorpay order creation + webhook verification
│       ├── download/       # Signed download token handler
│       ├── contact/        # Contact form email handler
│       └── admin/          # Admin API routes
├── components/
│   ├── portfolio/          # HeroSection, AboutSection, SkillsGrid, ProjectCard, CyberCursor…
│   ├── art/                # ArtCard, ArtGrid, ArtFilters, FeaturedArt
│   ├── cart/               # CartDrawer
│   ├── layout/             # Navbar, Footer
│   ├── shared/             # Shared primitives
│   └── ui/                 # Radix-based UI components
├── lib/
│   ├── supabase/           # Supabase client (browser + server + admin)
│   ├── razorpay.ts         # Razorpay SDK initialisation
│   ├── resend.ts           # Resend email client
│   └── audio.ts            # UI sound effects
├── supabase/
│   ├── schema.sql          # Full DB schema (run once)
│   └── seed.sql            # Optional test data
├── emails/                 # React Email templates
├── types/                  # Shared TypeScript types
└── middleware.ts           # Cookie-based admin route protection
```

---

## 🗄 Database Schema

| Table | Purpose |
|---|---|
| `art_products` | Art listings — title, price (paise), tags, style, thumbnail & file URLs |
| `orders` | Order records linked to Razorpay order/payment IDs |
| `order_items` | Line items per order with price-at-purchase snapshot |
| `download_tokens` | Time-limited (single-use) tokens for post-payment file access |

> Row-Level Security (RLS) is enabled on all tables. Only published products are publicly readable; order data is server-side only via the service role key.

---

## 🚀 Local Setup

### 1. Clone & install

```bash
git clone https://github.com/saurabhkgaur/saurabhgaur.world.git
cd saurabhgaur.world
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in all values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# Resend (transactional email)
RESEND_API_KEY=
FROM_EMAIL=orders@saurabhgaur.world

# Admin access
ADMIN_EMAIL=
ADMIN_SECRET=your_strong_password_here

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor → New Query** and run `supabase/schema.sql`
3. *(Optional)* Run `supabase/seed.sql` to insert test art products
4. The schema also creates the storage buckets automatically:
   - `art-thumbnails` — public, images only (max 5 MB)
   - `art-files` — private, any file type (max 50 MB)

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Admin Panel

The admin panel lives at `/admin` and is protected by a cookie set at `/login`.

1. Navigate to `/login`
2. Enter the `ADMIN_SECRET` value from your `.env.local`
3. You'll be redirected to `/admin`

From the admin panel you can:
- Add / edit / publish art products (`/admin/products`)
- View all orders and their status (`/admin/orders`)

---

## 💳 Payment Flow

```
User adds item to cart
        ↓
POST /api/payment/create-order  →  Razorpay order created
        ↓
Razorpay checkout (client-side)
        ↓
POST /api/payment/verify        →  Signature verified, order marked paid
        ↓
Download tokens generated + confirmation email sent via Resend
        ↓
User lands on /order-success with download links
```

---

## ☁️ Deployment

1. Push to GitHub
2. Connect the repo to [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example` in the Vercel dashboard
4. Deploy — Vercel picks up the Next.js App Router automatically

> Make sure `NEXT_PUBLIC_SITE_URL` is set to your production domain (e.g., `https://saurabhgaur.world`) before deploying.

---

## 📜 License

Personal use. All art and content © Saurabh Kumar Gaur. The source code is shared for reference; please do not redistribute or use commercially without permission.
