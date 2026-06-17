'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, ArrowLeft, ShoppingCart, Lock } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

declare global {
  interface Window { Razorpay: any }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window.Razorpay !== 'undefined') return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function CartPage() {
  const { items, remove, clear, total, count } = useCart()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handlePayment = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setLoading(true)

    try {
      const ok = await loadRazorpay()
      if (!ok) throw new Error('Failed to load payment SDK. Please refresh and try again.')

      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ product_id: i.product.id, price: i.product.price_inr })),
          buyer_email: email,
        }),
      })

      if (!orderRes.ok) {
        const err = await orderRes.json()
        throw new Error(err.error ?? 'Failed to create order.')
      }

      const { razorpay_order_id, amount } = await orderRes.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: 'INR',
        order_id: razorpay_order_id,
        name: 'saurabhgaur.world',
        description: 'AI Art Purchase',
        image: '/images/og-image.jpg',
        prefill: { email },
        theme: { color: '#E8593C' },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            })
            if (!verifyRes.ok) throw new Error('Payment verification failed.')
            clear()
            router.push(`/order-success?order_id=${razorpay_order_id}`)
          } catch (e: any) {
            setError(e.message ?? 'Payment verification failed.')
            setLoading(false)
          }
        },
      }

      new window.Razorpay(options).open()
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (count === 0) {
    return (
      <main className="min-h-screen pt-32 pb-24">
        <div className="container-site max-w-lg text-center">
          <ShoppingCart size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
          <h1
            className="text-3xl font-display tracking-wide mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            YOUR CART IS EMPTY
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            Browse the gallery and add some art to your cart.
          </p>
          <Link
            href="/art"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-medium text-white"
            style={{ background: 'var(--accent)' }}
          >
            Browse Art Gallery
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="container-site max-w-4xl">
        {/* Back */}
        <Link
          href="/art"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-150"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={14} />
          Continue Shopping
        </Link>

        <h1
          className="text-4xl sm:text-5xl font-display tracking-wide mb-10"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          CHECKOUT
        </h1>

        <div className="grid md:grid-cols-[1fr_360px] gap-8">
          {/* Items */}
          <div className="space-y-3">
            <p
              className="text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {count} {count === 1 ? 'Item' : 'Items'}
            </p>
            {items.map(({ product }) => (
              <div
                key={product.id}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div
                  className="shrink-0 rounded overflow-hidden"
                  style={{ width: 80, height: 80, background: 'var(--bg-secondary)' }}
                >
                  <img
                    src={product.thumbnail_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/art/${product.id}`}
                    className="text-sm font-medium hover:text-[#E8593C] transition-colors duration-150 block truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {product.title}
                  </Link>
                  {product.style && (
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                      {product.style}
                    </p>
                  )}
                  <p
                    className="text-sm font-semibold mt-2"
                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                  >
                    {formatPrice(product.price_inr)}
                  </p>
                </div>
                <button
                  onClick={() => remove(product.id)}
                  className="shrink-0 p-1.5 self-start rounded transition-colors duration-150"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  aria-label={`Remove ${product.title}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          {/* Order summary + checkout */}
          <div className="space-y-4">
            <div
              className="rounded-xl p-5 space-y-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <p
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                Order Summary
              </p>

              <div className="space-y-2">
                {items.map(({ product }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="truncate mr-2" style={{ color: 'var(--text-secondary)' }}>
                      {product.title}
                    </span>
                    <span
                      className="shrink-0 font-mono"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                    >
                      {formatPrice(product.price_inr)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="flex justify-between pt-3"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Total
                </span>
                <span
                  className="text-lg font-semibold font-mono"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                >
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono mb-2 uppercase tracking-widest"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                Email for download links
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded text-sm outline-none transition-all duration-150"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            {error && (
              <p
                className="text-xs px-3 py-2 rounded"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#ef4444',
                }}
              >
                {error}
              </p>
            )}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded text-sm font-medium text-white transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = 'var(--accent-hover)'
              }}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              <Lock size={14} />
              {loading ? 'Processing…' : `Pay ${formatPrice(total)} with Razorpay`}
            </button>

            <p
              className="text-center text-xs"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              UPI · Cards · Net Banking · Wallets
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
