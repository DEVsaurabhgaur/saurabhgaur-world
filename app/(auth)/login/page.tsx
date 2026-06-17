'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!password) return
    setLoading(true)
    setError(null)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <div
      className="w-full max-w-sm p-8 rounded-2xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="flex justify-center mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(232,89,60,0.1)', border: '1px solid rgba(232,89,60,0.2)' }}
        >
          <Lock size={20} style={{ color: 'var(--accent)' }} />
        </div>
      </div>

      <h1
        className="text-2xl font-display tracking-wide text-center mb-6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        ADMIN LOGIN
      </h1>

      <div className="space-y-4">
        <input
          type="password"
          value={password}
          placeholder="Admin password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="w-full px-4 py-2.5 rounded text-sm outline-none"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          autoFocus
        />

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
          onClick={handleLogin}
          disabled={loading || !password}
          className="w-full py-2.5 rounded text-sm font-medium text-white transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'var(--accent)' }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent-hover)' }}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </div>
    </div>
  )
}
