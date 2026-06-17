'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body style={{ background: '#0A0A0A', color: '#F0F0F0', fontFamily: 'sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
          }}
        >
          <p style={{ fontSize: '72px', fontWeight: 700, color: '#E8593C', opacity: 0.3, margin: 0 }}>
            500
          </p>
          <h1 style={{ fontSize: '32px', letterSpacing: '0.1em', marginBottom: '12px' }}>
            SOMETHING WENT WRONG
          </h1>
          <p style={{ color: '#888', marginBottom: '32px', fontSize: '14px' }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#E8593C',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
