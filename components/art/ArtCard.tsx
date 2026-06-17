'use client'

import Link from 'next/link'
import { ShoppingCart, Check } from 'lucide-react'
import { ArtProduct } from '@/types/art'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

type Props = {
  product: ArtProduct
}

export default function ArtCard({ product }: Props) {
  const { add, isInCart } = useCart()
  const inCart = isInCart(product.id)

  return (
    <div
      className="card group overflow-hidden flex flex-col"
      style={{ borderRadius: '12px', breakInside: 'avoid', marginBottom: '16px' }}
    >
      {/* Thumbnail */}
      <Link href={`/art/${product.id}`} className="block overflow-hidden relative">
        <div
          style={{
            background: 'var(--bg-secondary)',
            minHeight: '200px',
          }}
        >
          <img
            src={product.thumbnail_url}
            alt={product.title}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ display: 'block' }}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement
              el.style.display = 'none'
              const parent = el.parentElement!
              parent.style.height = '220px'
              parent.style.display = 'flex'
              parent.style.alignItems = 'center'
              parent.style.justifyContent = 'center'
              parent.innerHTML = `<span style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted)">${product.style ?? 'Art'}</span>`
            }}
          />
        </div>
        {/* Price badge overlay */}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-mono font-medium"
          style={{
            background: 'var(--accent)',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {formatPrice(product.price_inr)}
        </span>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {product.style && (
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: 'rgba(232,89,60,0.1)',
                border: '1px solid rgba(232,89,60,0.2)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {product.style}
            </span>
          )}
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        <Link
          href={`/art/${product.id}`}
          className="text-sm font-medium transition-colors duration-150 hover:text-[#E8593C]"
          style={{ color: 'var(--text-primary)' }}
        >
          {product.title}
        </Link>

        {/* Add to cart */}
        <button
          onClick={() => !inCart && add(product)}
          disabled={inCart}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2 rounded text-xs font-medium transition-all duration-150"
          style={{
            background: inCart ? 'rgba(34,197,94,0.1)' : 'var(--bg-secondary)',
            border: `1px solid ${inCart ? 'rgba(34,197,94,0.3)' : 'var(--border)'}`,
            color: inCart ? '#22C55E' : 'var(--text-secondary)',
            cursor: inCart ? 'default' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!inCart) {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
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
            <>
              <Check size={13} />
              In Cart
            </>
          ) : (
            <>
              <ShoppingCart size={13} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
