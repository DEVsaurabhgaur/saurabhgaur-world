import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { ArtProduct } from '@/types/art'
import { formatPrice } from '@/lib/utils'

export const revalidate = 60

export default async function FeaturedArt() {
  let products: ArtProduct[] = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('art_products')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(4)
    products = data ?? []
  } catch {}

  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container-site">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase mb-4 block"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Art Store
            </span>
            <h2 className="text-4xl sm:text-5xl font-display tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}>
              ORIGINAL
              <br />
              <span style={{ color: 'var(--accent)' }}>ARTWORK</span>
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              AI-generated · Handmade · Digital
            </p>
          </div>
          <Link href="/art"
            className="hidden sm:inline-flex items-center gap-2 text-sm transition-colors duration-150"
            style={{ color: 'var(--text-secondary)' }}>
            Full Gallery
            <ArrowRight size={15} />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-lg border flex flex-col items-center justify-center py-24 text-center"
            style={{ borderColor: 'rgba(0,245,255,0.15)', background: 'var(--bg-card)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              {/* GALLERY LOADING */}
            </p>
            <p className="text-xs mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              AI-generated + handmade artwork collections
            </p>
            <Link href="/art"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-mono"
              style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'rgba(0,245,255,0.05)' }}>
              Browse Artwork <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link key={product.id} href={`/art/${product.id}`}
                className="card group overflow-hidden block" style={{ borderRadius: '8px' }}>
                <div className="overflow-hidden" style={{ height: '200px', background: 'var(--bg-secondary)' }}>
                  <img
                    src={product.thumbnail_url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {product.title}
                  </p>
                  <p className="text-xs font-mono mt-1" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(product.price_inr)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 sm:hidden">
          <Link href="/art" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Full Gallery <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
