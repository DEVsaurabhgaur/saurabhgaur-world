import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import ArtGrid from '@/components/art/ArtGrid'
import { ArtProduct } from '@/types/art'

export const metadata: Metadata = {
  title: 'Art Gallery — Saurabh Kumar Gaur',
  description:
    'AI-generated digital art — portraits, cyberpunk scenes, anime stills, and abstract works. Purchase high-resolution files.',
}

export const revalidate = 60

export default async function ArtPage() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('art_products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const products: ArtProduct[] = error ? [] : (data ?? [])

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-site">
        {/* Header */}
        <div className="mb-12">
          <span
            className="text-xs font-mono tracking-widest uppercase mb-4 block"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
          >
            Art Store
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <h1
              className="text-5xl sm:text-7xl font-display tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI ART
              <br />
              <span style={{ color: 'var(--accent)' }}>GALLERY</span>
            </h1>
            <p
              className="text-sm max-w-xs sm:text-right pb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              High-resolution digital files. Purchase once, download forever (72-hour link).
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              No art listed yet — check back soon.
            </p>
          </div>
        ) : (
          <ArtGrid products={products} />
        )}
      </div>
    </main>
  )
}

