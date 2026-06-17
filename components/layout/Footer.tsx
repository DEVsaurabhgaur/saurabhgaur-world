import Link from 'next/link'
import { Mail, ExternalLink, Code2, Briefcase } from 'lucide-react'

const SOCIAL = [
  { href: 'https://github.com/saurabhgaur', label: 'GitHub', icon: Code2 },
  { href: 'https://linkedin.com/in/saurabhgaur-122k', label: 'LinkedIn', icon: Briefcase },
  { href: 'mailto:saurabhgaur122000@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://saurabhgaur.world', label: 'Website', icon: ExternalLink },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#222] bg-[#0A0A0A]">
      <div className="container-site py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p
              className="text-2xl tracking-widest mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              SAURABH KUMAR GAUR
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              AI/ML Engineer · LLM Systems · Agentic AI
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <nav className="flex flex-wrap gap-6">
              {[
                { href: '/projects', label: 'Projects' },
                { href: '/art', label: 'Art Store' },
                { href: '/contact', label: 'Contact' },
                { href: '/resume.pdf', label: 'Resume' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-colors duration-150 hover:text-[#F0F0F0]"
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
                  className="transition-colors duration-150 hover:text-[#E8593C]"
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
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          <span>© {new Date().getFullYear()} Saurabh Kumar Gaur. All rights reserved.</span>
          <span>Built with Next.js · Supabase · Razorpay</span>
        </div>
      </div>
    </footer>
  )
}
