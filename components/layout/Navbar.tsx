'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Volume2, VolumeX, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import CartDrawer from '@/components/cart/CartDrawer'
import { isSoundEnabled, toggleSound, playClick } from '@/lib/audio'
import CyberTerminal from '@/components/portfolio/CyberTerminal'
import { useTextScramble } from '@/hooks/useTextScramble'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/art', label: 'Artwork' },
  { href: '/contact', label: 'Contact' },
]

function ScrambleNavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active: boolean
  onClick?: () => void
}) {
  const { displayText, triggerScramble } = useTextScramble(label, false)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-sm font-mono tracking-widest uppercase transition-all duration-200 relative group py-1.5'
      )}
      style={{
        fontFamily: 'var(--font-mono)',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        textShadow: active ? '0 0 12px rgba(0,245,255,0.6)' : 'none',
        letterSpacing: '0.1em',
      }}
      onMouseEnter={() => {
        triggerScramble()
        playClick()
      }}
    >
      {displayText}
      {/* Active indicator line with glow */}
      <span
        className="absolute bottom-0 left-0 h-px transition-all duration-300"
        style={{
          background: active
            ? 'linear-gradient(to right, transparent, var(--accent), transparent)'
            : 'var(--accent)',
          width: active ? '100%' : '0',
          boxShadow: active ? '0 0 8px rgba(0,245,255,0.8), 0 0 16px rgba(0,245,255,0.4)' : '0 0 6px rgba(0,245,255,0.8)',
        }}
      />
    </Link>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const { count: cartCount } = useCart()

  const { displayText: logoText, triggerScramble: scrambleLogo } = useTextScramble('SAURABH.WORLD', false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    
    // Sync initial sound state
    setSoundOn(isSoundEnabled())
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleToggleSound = () => {
    const active = toggleSound()
    setSoundOn(active)
    if (active) playClick()
  }

  const handleOpenTerminal = () => {
    playClick()
    setTerminalOpen(true)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'backdrop-blur-md border-b' : 'bg-transparent'
        )}
        style={
          scrolled
            ? {
                background: 'rgba(7, 11, 15, 0.92)',
                borderColor: 'rgba(0, 245, 255, 0.1)',
              }
            : {}
        }
      >
        <div className="container-site">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-lg tracking-widest transition-all duration-200 flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              title="Saurabh Kumar Gaur — AI Engineer & AI Product Developer"
              onMouseEnter={() => {
                scrambleLogo()
                playClick()
              }}
            >
              <span className="text-cyan-400 font-mono text-xs opacity-75">{'//'}</span>
              <span>{logoText}</span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <ScrambleNavLink href={href} label={label} active={pathname === href} />
                </li>
              ))}
            </ul>

            {/* Right Controls */}
            <div className="hidden md:flex items-center gap-4">
              {/* Sound toggle */}
              <button
                onClick={handleToggleSound}
                className="p-2 transition-all duration-200 border border-transparent rounded hover:border-cyan-500/20 text-cyan-400/80 hover:text-cyan-400"
                title={soundOn ? 'Mute Sounds' : 'Unmute Sounds'}
                aria-label="Toggle sound FX"
              >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              {/* Terminal toggle */}
              <button
                onClick={handleOpenTerminal}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono tracking-widest uppercase transition-all duration-200 clip-cyber-sm"
                title="Launch command console"
              >
                <Terminal size={12} className="animate-pulse" />
                <span>Console</span>
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono tracking-widest uppercase transition-all duration-200 px-3 py-1.5 rounded"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                onMouseEnter={(e) => {
                  playClick()
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                Resume
              </a>

              {/* Cart Drawer */}
              <button
                onClick={() => {
                  playClick()
                  setCartOpen(true)
                }}
                className="relative p-2 transition-all duration-200 text-slate-400 hover:text-cyan-400"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-black text-xs flex items-center justify-center font-mono font-bold"
                    style={{
                      background: 'var(--accent)',
                      fontSize: '9px',
                      boxShadow: '0 0 8px rgba(0,245,255,0.6)',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Nav Controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={handleToggleSound}
                className="p-2 text-cyan-400"
                aria-label="Toggle sound"
              >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button
                onClick={handleOpenTerminal}
                className="p-2 text-cyan-400"
                aria-label="Launch shell console"
              >
                <Terminal size={16} />
              </button>

              <button
                onClick={() => {
                  playClick()
                  setCartOpen(true)
                }}
                className="relative p-2 text-slate-400 hover:text-cyan-400"
                aria-label="Cart"
              >
                <ShoppingCart size={16} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-black flex items-center justify-center"
                    style={{ background: 'var(--accent)', fontSize: '9px' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => {
                  playClick()
                  setMenuOpen(!menuOpen)
                }}
                className="p-2 text-slate-400"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t backdrop-blur-md"
            style={{ background: 'rgba(7,11,15,0.98)', borderColor: 'rgba(0,245,255,0.1)' }}
          >
            <ul className="container-site py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => {
                      playClick()
                      setMenuOpen(false)
                    }}
                    className="block py-3 text-sm font-mono uppercase tracking-widest transition-colors duration-200"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: pathname === href ? 'var(--accent)' : 'var(--text-secondary)',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="block py-3 text-sm font-mono uppercase tracking-widest"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                  onClick={() => {
                    playClick()
                    setMenuOpen(false)
                  }}
                >
                  Resume ↗
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <CyberTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  )
}

