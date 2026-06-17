'use client'

import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Check, Zap } from 'lucide-react'
import { ArtProduct } from '@/types/art'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type Props = {
  product: ArtProduct
}

export default function ArtDetailClient({ product }: Props) {
  const { add, isInCart } = useCart()
  const inCart = isInCart(product.id)
  const router = useRouter()

  const handleBuyNow = () => {
    if (!inCart) add(product)
    router.push('/cart')
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="container-site">
        {/* Back */}
        <Link
          href="/art"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-150"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={14} />
          Back to Gallery
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          {/* Image */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              minHeight: '400px',
            }}
          >
            <img
              src={product.thumbnail_url}
              alt={product.title}
              className="w-full h-full object-contain"
              style={{ maxHeight: '70vh' }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement
                el.style.display = 'none'
              }}
            />
          </div>

          {/* Details sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.style && (
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono"
                  style={{
                    background: 'rgba(232,89,60,0.1)',
                    border: '1px solid rgba(232,89,60,0.25)',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {product.style}
                </span>
              )}
              {product.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            {/* Title */}
            <div>
              <h1
                className="text-3xl sm:text-4xl font-display tracking-wide mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {product.title}
              </h1>
              {product.description && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {product.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div
              className="py-4"
              style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
            >
              <p
                className="text-xs font-mono mb-1"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                PRICE
              </p>
              <p
                className="text-3xl font-mono font-semibold"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
              >
                {formatPrice(product.price_inr)}
              </p>
            </div>

            {/* Info */}
            <div className="space-y-2 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <p>✓ High-resolution digital file</p>
              <p>✓ Download link valid 72 hours after purchase</p>
              <p>✓ Personal use license included</p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => !inCart && add(product)}
                disabled={inCart}
                className="flex items-center justify-center gap-2 w-full py-3 rounded text-sm font-medium transition-all duration-150"
                style={{
                  background: inCart ? 'rgba(34,197,94,0.1)' : 'var(--bg-card)',
                  border: `1px solid ${inCart ? 'rgba(34,197,94,0.3)' : 'var(--border)'}`,
                  color: inCart ? '#22C55E' : 'var(--text-secondary)',
                  cursor: inCart ? 'default' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!inCart) {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!inCart) {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {inCart ? (
                  <><Check size={15} /> Added to Cart</>
                ) : (
                  <><ShoppingCart size={15} /> Add to Cart</>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 w-full py-3 rounded text-sm font-medium text-white transition-all duration-150"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                <Zap size={15} />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
