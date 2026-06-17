'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

type Props = {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, remove, count, total } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Trap scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          width: 'min(420px, 100vw)',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border)',
        }}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} style={{ color: 'var(--accent)' }} />
            <span
              className="font-display tracking-widest text-lg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              CART
            </span>
            {count > 0 && (
              <span
                className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-mono"
                style={{ background: 'var(--accent)', fontSize: '10px' }}
              >
                {count}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded transition-colors duration-150"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={40} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Your cart is empty.
              </p>
              <button
                onClick={onClose}
                className="mt-4 text-xs underline underline-offset-2"
                style={{ color: 'var(--accent)' }}
              >
                Browse Art →
              </button>
            </div>
          ) : (
            items.map(({ product }) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 rounded-lg"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Thumbnail */}
                <div
                  className="shrink-0 rounded overflow-hidden"
                  style={{ width: 64, height: 64, background: 'var(--bg-primary)' }}
                >
                  <img
                    src={product.thumbnail_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {product.title}
                  </p>
                  {product.style && (
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                      {product.style}
                    </p>
                  )}
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                  >
                    {formatPrice(product.price_inr)}
                  </p>
                </div>
                {/* Remove */}
                <button
                  onClick={() => remove(product.id)}
                  className="shrink-0 p-1.5 self-start rounded transition-colors duration-150"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label={`Remove ${product.title}`}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 space-y-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Total ({count} {count === 1 ? 'item' : 'items'})
              </span>
              <span
                className="text-lg font-semibold font-mono"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full text-center py-3 rounded text-sm font-medium text-white transition-all duration-150"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Checkout →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
