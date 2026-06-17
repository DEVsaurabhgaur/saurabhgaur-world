'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Mail, Download } from 'lucide-react'
import { Suspense } from 'react'

function OrderSuccessContent() {
  const params = useSearchParams()
  const orderId = params.get('order_id')

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-site max-w-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <CheckCircle size={40} style={{ color: '#22C55E' }} />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl font-display tracking-wide mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          PAYMENT
          <br />
          <span style={{ color: '#22C55E' }}>CONFIRMED</span>
        </h1>

        <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          Your purchase was successful. Download links have been sent to your email and are valid
          for <strong style={{ color: 'var(--text-primary)' }}>72 hours</strong>.
        </p>

        {orderId && (
          <div
            className="inline-block px-4 py-2 rounded text-xs font-mono mb-8"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Order ID: {orderId}
          </div>
        )}

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
          {[
            {
              icon: <Mail size={18} style={{ color: 'var(--accent)' }} />,
              title: 'Check your email',
              body: 'Download links have been sent. Check your spam folder if you don\'t see them.',
            },
            {
              icon: <Download size={18} style={{ color: 'var(--accent)' }} />,
              title: '72-hour window',
              body: 'Each link expires 72 hours after purchase. Download your files before then.',
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="mb-2">{icon}</div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                {title}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/art"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-medium text-white transition-all duration-150"
            style={{ background: 'var(--accent)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
          >
            Back to Gallery
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-medium transition-all duration-150"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <OrderSuccessContent />
    </Suspense>
  )
}
