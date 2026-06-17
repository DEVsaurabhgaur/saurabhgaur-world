'use client'

import { useState, useEffect } from 'react'
import { Plus, Eye, EyeOff, Trash2, Edit2, Check, X } from 'lucide-react'
import { ArtProduct } from '@/types/art'
import { formatPrice } from '@/lib/utils'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ArtProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    description: '',
    price_inr: '',
    style: '',
    tags: '',
    thumbnail_url: '',
    file_url: '',
    is_published: false,
  })

  const fetchProducts = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/products')
    if (res.ok) setProducts(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const handleSubmit = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price_inr: Math.round(parseFloat(form.price_inr) * 100), // convert ₹ to paise
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
      }
      await fetchProducts()
      setShowForm(false)
      setForm({ title: '', description: '', price_inr: '', style: '', tags: '', thumbnail_url: '', file_url: '', is_published: false })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const togglePublished = async (product: ArtProduct) => {
    await fetch(`/api/admin/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !product.is_published }),
    })
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_published: !p.is_published } : p))
    )
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
          PRODUCTS
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium text-white transition-all duration-150"
          style={{ background: 'var(--accent)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          <Plus size={15} />
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div
          className="p-6 rounded-xl mb-8 space-y-4"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-sm font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            New Product
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { key: 'title', label: 'Title *', placeholder: 'Neon Samurai' },
              { key: 'price_inr', label: 'Price (₹) *', placeholder: '299', type: 'number' },
              { key: 'style', label: 'Style', placeholder: 'Cyberpunk' },
              { key: 'tags', label: 'Tags (comma-separated)', placeholder: 'dark, neon, portrait' },
              { key: 'thumbnail_url', label: 'Thumbnail URL *', placeholder: 'https://...' },
              { key: 'file_url', label: 'File URL *', placeholder: 'https://...' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="block text-xs font-mono mb-1.5 uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {label}
                </label>
                <input
                  type={type ?? 'text'}
                  value={(form as any)[key]}
                  placeholder={placeholder}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded text-sm outline-none"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-mono mb-1.5 uppercase tracking-widest"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Description
            </label>
            <textarea
              value={form.description}
              rows={2}
              placeholder="Optional description..."
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full px-3 py-2 rounded text-sm outline-none resize-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Publish immediately</span>
            </label>
          </div>
          {error && (
            <p className="text-xs px-3 py-2 rounded"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
              {error}
            </p>
          )}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium text-white disabled:opacity-60"
              style={{ background: 'var(--accent)' }}
            >
              <Check size={14} />
              {saving ? 'Saving…' : 'Save Product'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products table */}
      {loading ? (
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No products yet. Add one above.</p>
      ) : (
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 px-4 py-3 rounded-lg"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              {/* Thumb */}
              <div
                className="shrink-0 rounded overflow-hidden"
                style={{ width: 48, height: 48, background: 'var(--bg-secondary)' }}
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
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                  {product.title}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {product.style ?? '—'} · {formatPrice(product.price_inr)}
                </p>
              </div>
              {/* Status */}
              <span
                className="shrink-0 text-xs px-2 py-0.5 rounded font-mono"
                style={{
                  background: product.is_published ? 'rgba(34,197,94,0.1)' : 'rgba(107,114,128,0.1)',
                  color: product.is_published ? '#22C55E' : '#6B7280',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {product.is_published ? 'Published' : 'Draft'}
              </span>
              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => togglePublished(product)}
                  className="p-1.5 rounded transition-colors duration-150"
                  style={{ color: 'var(--text-muted)' }}
                  title={product.is_published ? 'Unpublish' : 'Publish'}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {product.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-1.5 rounded transition-colors duration-150"
                  style={{ color: 'var(--text-muted)' }}
                  title="Delete"
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
