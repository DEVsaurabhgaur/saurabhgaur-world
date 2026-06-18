import Link from 'next/link'
import { Mail, Linkedin, Github } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container-site text-center">
        <span
          className="text-xs font-mono tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
        >
          Get in touch
        </span>
        <h2
          className="text-4xl sm:text-6xl font-display tracking-wide mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          LET&apos;S BUILD
          <br />
          <span style={{ color: 'var(--accent)' }}>SOMETHING.</span>
        </h2>
        <p className="text-base max-w-md mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
          Open to AI/ML engineering roles, LLM evaluation contracts, and freelance collaborations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:saurabhgaur122000@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-medium text-white transition-all duration-150 hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <Mail size={15} />
            saurabhgaur122000@gmail.com
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-medium transition-all duration-150 hover:border-[#333] hover:text-[#F0F0F0]"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            Contact Form
          </Link>
          <a
            href="https://linkedin.com/in/saurabhkgaur"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded text-sm font-medium transition-all duration-150 hover:border-blue-500/50 hover:text-blue-400"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
          <a
            href="https://github.com/DEVsaurabhgaur"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded text-sm font-medium transition-all duration-150 hover:border-slate-400/50 hover:text-slate-200"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
