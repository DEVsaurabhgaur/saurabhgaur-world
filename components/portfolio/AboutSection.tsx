'use client'

import { Download, Award, Shield } from 'lucide-react'
import { playClick } from '@/lib/audio'
import { useTextScramble } from '@/hooks/useTextScramble'

const STATS = [
  { value: '5+', label: 'Years Engineering', percentage: 85, color: 'var(--accent)' },
  { value: '200+', label: 'Artworks Created', percentage: 95, color: 'var(--accent2)' },
  { value: 'Frontier', label: 'Model Evaluation', percentage: 90, color: 'var(--purple)' },
  { value: 'B.Tech', label: 'CSE Graduate 2025', percentage: 100, color: 'var(--success)' },
]

const CERTS = [
  {
    name: 'Google AI Professional Certificate',
    issuer: 'Google × Coursera',
    date: 'May 2026',
    url: 'https://coursera.org/verify/professional-cert/QR925O1RJ5PB',
    courses: 7,
  },
]

export default function AboutSection() {
  const { displayText: title1, triggerScramble: scrambleTitle1 } = useTextScramble('ENGINEER.', false)
  const { displayText: title2, triggerScramble: scrambleTitle2 } = useTextScramble('ARTIST.', false)

  return (
    <section className="py-24 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      {/* Visual cyber mesh background */}
      <div className="absolute inset-0 pointer-events-none cyber-grid-bg-dense opacity-40" />

      <div className="container-site relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Bio info */}
          <div>
            <span className="text-xs font-mono tracking-widest uppercase mb-4 block"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              {'// ACCOUNT_INFO'}
            </span>
            <h2 
              className="text-4xl sm:text-5xl font-display tracking-wide mb-6 select-none cursor-pointer leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
              onMouseEnter={() => { scrambleTitle1(); scrambleTitle2() }}
            >
              <span>{title1}</span>
              <br />
              <span style={{ color: 'var(--accent)' }}>{title2}</span>
            </h2>
            
            <div className="space-y-4 font-body text-slate-300" style={{ lineHeight: '1.8' }}>
              <p>
                AI/ML Engineer and LLM Evaluation specialist with 4+ years of experience
                building intelligent systems and evaluating frontier models. Currently at Outlier.ai,
                designing multi-agent evaluation frameworks that benchmark the world&apos;s most
                capable AI models.
              </p>
              <p>
                Beyond engineering, I have a 200+ piece art portfolio spanning AI-generated work
                (Stable Diffusion, Midjourney) and handmade artwork — sketches, portraits, and
                digital compositions built on the same systematic creativity I bring to AI systems.
              </p>
              <p>
                Open to AI/ML engineering roles, LLM evaluation contracts, and creative
                collaborations at the intersection of technology and art.
              </p>
            </div>
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded text-sm font-mono transition-all duration-200 clip-cyber-sm border hover:bg-cyan-500/5"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
              onMouseEnter={(e) => {
                playClick()
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <Download size={15} />
              Download Resume
            </a>
          </div>

          {/* Right: Grid metrics */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map(({ value, label, percentage, color }) => (
              <div 
                key={label} 
                className="relative card p-5 bg-[#090f16]/60 border border-slate-800 clip-cyber-sm cyber-corners select-none group transition-all duration-300 hover:border-cyan-500/30"
                onMouseEnter={playClick}
              >
                {/* Tech background index */}
                <span className="absolute top-2 right-2 text-[9px] font-mono text-slate-700">NODE_0x{percentage}</span>

                <div 
                  className="text-4xl font-display tracking-wide mb-1 transition-all duration-300 group-hover:scale-105"
                  style={{ fontFamily: 'var(--font-display)', color: color, textShadow: `0 0 10px ${color}30` }}
                >
                  {value}
                </div>
                
                <div className="text-xs font-mono uppercase tracking-wider mb-3 text-slate-400">
                  {label}
                </div>

                {/* Animated charge bar */}
                <div className="w-full bg-slate-900/60 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}`
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Certifications Row */}
            {CERTS.map((cert) => (
              <a 
                key={cert.name} 
                href={cert.url} 
                target="_blank" 
                rel="noreferrer"
                className="relative card p-4 col-span-2 flex items-center gap-4 transition-all duration-300 hover:border-emerald-500/40 bg-[#090f16]/60 border border-slate-800 clip-cyber-sm"
                onMouseEnter={playClick}
              >
                <div className="shrink-0 w-10 h-10 rounded flex items-center justify-center border border-emerald-500/20 bg-emerald-950/20 text-emerald-400">
                  <Award size={18} className="animate-pulse" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium truncate text-slate-200">{cert.name}</p>
                    <Shield size={10} className="text-cyan-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
                
                <span className="text-xs shrink-0 font-mono text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/10">
                  VERIFY ↗
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}