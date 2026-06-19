import Link from 'next/link'
import { Mail, Github, Linkedin, Instagram, ExternalLink } from 'lucide-react'

const SOCIAL = [
  { href: 'https://github.com/DEVsaurabhgaur', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/in/saurabh-gaur-122k', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://instagram.com/thesaurabhgaur', label: 'Instagram', icon: Instagram },
  { href: 'mailto:saurabhgaur122000@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://saurabhgaur.world', label: 'Website', icon: ExternalLink },
]

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
      <div className="container-site py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p
              className="text-2xl tracking-widest mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              SAURABH KUMAR GAUR
            </p>
            <p className="text-sm font-mono" style={{ color: 'var(--accent)', letterSpacing: '0.05em' }}>
              AI Engineer & Architect · Agentic Systems · AI Products
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Rudrapur, Uttarakhand, India · Open to Remote
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <nav className="flex flex-wrap gap-6">
              {[
                { href: '/projects', label: 'Projects' },
                { href: '/art', label: 'Art Store' },
                { href: '/contact', label: 'Contact' },
                { href: '/resume.pdf', label: 'Resume ↗' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-colors duration-150 hover:text-cyan-400 font-mono"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex gap-4">
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="transition-all duration-150 hover:text-cyan-400 hover:scale-110"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          <span>© {new Date().getFullYear()} Saurabh Kumar Gaur. All rights reserved.</span>
          <span>Built with Next.js · Supabase · Razorpay · Vercel</span>
        </div>
      </div>
    </footer>
  )
}
