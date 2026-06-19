import Link from 'next/link'
import { Mail, Linkedin, Github, Instagram, ExternalLink } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    href: 'https://linkedin.com/in/saurabh-gaur-122k',
    label: 'LinkedIn',
    icon: Linkedin,
    color: '#0A66C2',
    hoverClass: 'hover:border-blue-500/50 hover:text-blue-400',
  },
  {
    href: 'https://github.com/DEVsaurabhgaur',
    label: 'GitHub',
    icon: Github,
    color: '#6e40c9',
    hoverClass: 'hover:border-purple-500/50 hover:text-purple-300',
  },
  {
    href: 'https://instagram.com/thesaurabhgaur',
    label: '@thesaurabhgaur',
    icon: Instagram,
    color: '#E1306C',
    hoverClass: 'hover:border-pink-500/50 hover:text-pink-400',
  },
]

export default function ContactCTA() {
  return (
    <section className="py-28 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center bottom, rgba(0, 245, 255, 0.04) 0%, transparent 70%)'
      }} />
      <div className="absolute inset-0 pointer-events-none cyber-grid-bg opacity-20" />

      <div className="container-site text-center relative z-10">
        <span
          className="text-xs font-mono tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
        >
          {'// INITIATE_CONTACT'}
        </span>
        <h2
          className="text-4xl sm:text-6xl font-display tracking-wide mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          LET&apos;S BUILD
          <br />
          <span style={{ color: 'var(--accent)', textShadow: '0 0 40px rgba(0,245,255,0.3)' }}>SOMETHING.</span>
        </h2>
        <p className="text-base max-w-lg mx-auto mb-4 font-body" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Open to Remote AI Engineering · Agentic Systems Architecture · LLM Evaluation contracts · 
          AI Product Management · Founding Engineer roles.
        </p>
        <p className="text-sm max-w-md mx-auto mb-12 font-mono" style={{ color: 'var(--text-muted)' }}>
          Rudrapur, Uttarakhand, India — Remote / India Hybrid
        </p>

        {/* Primary CTA */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="mailto:saurabhgaur122000@gmail.com"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded clip-cyber-sm font-mono text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:-translate-y-0.5"
            style={{ background: 'var(--accent)', letterSpacing: '0.05em' }}
          >
            <Mail size={15} />
            saurabhgaur122000@gmail.com
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded clip-cyber-sm font-mono text-sm font-medium transition-all duration-200 hover:border-cyan-500/40 hover:text-cyan-300 hover:-translate-y-0.5"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <ExternalLink size={14} />
            Contact Form
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-3">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, hoverClass }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded clip-cyber-sm text-sm font-mono transition-all duration-200 ${hoverClass} hover:-translate-y-0.5`}
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
