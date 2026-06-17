'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send message.')
      setSent(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-site max-w-2xl">
        <span
          className="text-xs font-mono tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
        >
          Contact
        </span>
        <h1
          className="text-5xl sm:text-7xl font-display tracking-wide mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          GET IN
          <br />
          <span style={{ color: 'var(--accent)' }}>TOUCH</span>
        </h1>

        <p className="text-base mb-10" style={{ color: 'var(--text-secondary)' }}>
          Open to AI/ML engineering roles, LLM evaluation contracts, and creative freelance work.
          Also happy to chat about AI art, prompt engineering, or anything else.
        </p>

        {sent ? (
          <div
            className="flex flex-col items-center text-center py-16 rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <CheckCircle size={48} style={{ color: '#22C55E', marginBottom: '16px' }} />
            <h2
              className="text-2xl font-display tracking-wide mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              MESSAGE SENT
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Thanks for reaching out. I'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { key: 'name', label: 'Name *', placeholder: 'Your name' },
                { key: 'email', label: 'Email *', placeholder: 'you@example.com', type: 'email' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label
                    className="block text-xs font-mono uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                  >
                    {label}
                  </label>
                  <input
                    type={type ?? 'text'}
                    value={(form as any)[key]}
                    placeholder={placeholder}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
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
              ))}
            </div>

            <div>
              <label
                className="block text-xs font-mono uppercase tracking-widest mb-2"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                placeholder="What's this about?"
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
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

            <div>
              <label
                className="block text-xs font-mono uppercase tracking-widest mb-2"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                Message *
              </label>
              <textarea
                rows={6}
                value={form.message}
                placeholder="Tell me about your project, role, or just say hi."
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-2.5 rounded text-sm outline-none transition-all duration-150 resize-none"
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
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-medium text-white transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent-hover)' }}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              <Send size={14} />
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        )}

        {/* Direct contact */}
        <div
          className="mt-12 pt-8 grid sm:grid-cols-3 gap-4 text-sm"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {[
            { label: 'EMAIL', value: 'saurabhgaur122000@gmail.com', href: 'mailto:saurabhgaur122000@gmail.com' },
            { label: 'LOCATION', value: 'India (Remote)', href: null },
            { label: 'AVAILABILITY', value: 'Open to work', href: null },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <p className="text-xs font-mono uppercase tracking-widest mb-1"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {label}
              </p>
              {href ? (
                <a href={href} className="transition-colors duration-150"
                  style={{ color: 'var(--accent)' }}>
                  {value}
                </a>
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

