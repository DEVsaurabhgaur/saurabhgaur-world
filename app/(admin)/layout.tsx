import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin — saurabhgaur.world',
  robots: { index: false, follow: false },
}

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside
        className="w-56 shrink-0 flex flex-col"
        style={{ borderRight: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
      >
        <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <Link
            href="/"
            className="font-display text-lg tracking-widest hover:text-[#E8593C] transition-colors duration-150"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            SG<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 py-4 px-3">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center px-3 py-2.5 rounded text-sm mb-1 transition-colors duration-150 hover:bg-[#161616] hover:text-[#F0F0F0]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/"
            className="text-xs transition-colors duration-150 hover:text-[#888]"
            style={{ color: 'var(--text-muted)' }}
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
