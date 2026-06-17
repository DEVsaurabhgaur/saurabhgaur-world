import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p
          className="text-8xl sm:text-9xl font-display tracking-wider mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', opacity: 0.3 }}
        >
          404
        </p>
        <h1
          className="text-3xl sm:text-5xl font-display tracking-wide mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          PAGE NOT
          <br />
          <span style={{ color: 'var(--accent)' }}>FOUND</span>
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded text-sm font-medium text-white transition-all duration-150 hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 rounded text-sm font-medium transition-all duration-150 hover:border-[#333] hover:text-[#F0F0F0]"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
