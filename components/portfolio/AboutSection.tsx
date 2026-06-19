'use client'

import { Download, Award, Shield, ExternalLink } from 'lucide-react'
import { playClick } from '@/lib/audio'
import { useTextScramble } from '@/hooks/useTextScramble'

const STATS = [
  { value: '3+', label: 'AI Products Shipped', percentage: 75, color: 'var(--accent)' },
  { value: '200+', label: 'Artworks Created', percentage: 95, color: 'var(--accent2)' },
  { value: 'Scale AI', label: 'LLM Evaluator 1yr+', percentage: 90, color: 'var(--purple)' },
  { value: 'B.Tech', label: 'CSE Graduate 2025', percentage: 100, color: 'var(--success)' },
]

const CERTS = [
  {
    name: 'Microsoft AI Product Manager',
    issuer: 'Microsoft × Coursera',
    date: 'Jun 2026',
    url: 'https://coursera.org/verify/professional-cert/2H5CMHLC30RF',
    badge: '🏅',
    color: '#00A4EF',
  },
  {
    name: 'Designing & Implementing DevOps Solutions (AZ-400)',
    issuer: 'Microsoft — PearsonVue',
    date: 'Jun 19, 2026',
    url: '#',
    badge: '✅',
    color: '#00A4EF',
  },
  {
    name: 'GPU Optimization for LLM Inference',
    issuer: 'AMD AI Academy',
    date: 'Jun 2026',
    url: '#',
    badge: '⚡',
    color: '#ED1C24',
  },
  {
    name: 'AI Skills Fest 2026',
    issuer: 'Microsoft',
    date: 'Jun 2026',
    url: '#',
    badge: '🌐',
    color: '#00A4EF',
  },
  {
    name: 'AI Fundamentals',
    issuer: 'Google × Coursera',
    date: 'May 19, 2026',
    url: 'https://coursera.org/verify/3X6NUV96OOW0',
    badge: '🎓',
    color: '#4285F4',
  },
  {
    name: 'AI for Content Creation & Writing',
    issuer: 'Google',
    date: 'May 2026',
    url: '#',
    badge: '✍️',
    color: '#4285F4',
  },
]

export default function AboutSection() {
  const { displayText: title1, triggerScramble: scrambleTitle1 } = useTextScramble('ENGINEER.', false)
  const { displayText: title2, triggerScramble: scrambleTitle2 } = useTextScramble('ARCHITECT.', false)

  return (
    <section className="py-24 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      {/* Visual cyber mesh background */}
      <div className="absolute inset-0 pointer-events-none cyber-grid-bg-dense opacity-40" />

      <div className="container-site relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
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
                AI Engineer & Architect working one level above standard implementation — designs evaluation 
                architecture that defines what &quot;intelligent&quot; means, then builds the systems that run on 
                those criteria.
              </p>
              <p>
                Currently shipping full AI products end-to-end as an Independent AI Product Developer: from 
                architecture through go-to-market. Previously at Scale AI (1yr+) evaluating frontier LLM outputs 
                across code generation and reasoning for RLHF training pipelines.
              </p>
              <p>
                Beyond engineering, I maintain a 200+ piece art portfolio spanning AI-generated work 
                (Stable Diffusion, Midjourney) and handmade artwork — the same systematic creativity I bring 
                to building agentic systems.
              </p>
              <p>
                Open to Remote AI Engineering · Agentic Systems · LLM Evaluation · AI Product Management · 
                Founding Engineer roles.
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

          {/* Right: Stats + Certs */}
          <div className="space-y-5">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label, percentage, color }) => (
                <div 
                  key={label} 
                  className="relative card p-5 bg-[#090f16]/60 border border-slate-800 clip-cyber-sm cyber-corners select-none group transition-all duration-300 hover:border-cyan-500/30"
                  onMouseEnter={playClick}
                >
                  <span className="absolute top-2 right-2 text-[9px] font-mono text-slate-700">NODE_0x{percentage}</span>

                  <div 
                    className="text-3xl font-display tracking-wide mb-1 transition-all duration-300 group-hover:scale-105"
                    style={{ fontFamily: 'var(--font-display)', color: color, textShadow: `0 0 10px ${color}30` }}
                  >
                    {value}
                  </div>
                  
                  <div className="text-xs font-mono uppercase tracking-wider mb-3 text-slate-400">
                    {label}
                  </div>

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
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={12} className="text-emerald-400" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">
                  CERTIFICATIONS ({CERTS.length})
                </span>
              </div>
              <div className="space-y-2">
                {CERTS.map((cert) => (
                  <a 
                    key={cert.name} 
                    href={cert.url}
                    target="_blank" 
                    rel="noreferrer"
                    className="relative card p-3 flex items-center gap-3 transition-all duration-300 hover:border-emerald-500/40 bg-[#090f16]/60 border border-slate-800 clip-cyber-sm group"
                    onMouseEnter={playClick}
                  >
                    <div 
                      className="shrink-0 w-7 h-7 rounded flex items-center justify-center text-base"
                      style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}
                    >
                      <span>{cert.badge}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-medium truncate text-slate-200 group-hover:text-white transition-colors">{cert.name}</p>
                        {cert.url !== '#' && <Shield size={9} className="text-cyan-400 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                    
                    {cert.url !== '#' && (
                      <ExternalLink size={11} className="text-emerald-400/60 shrink-0 group-hover:text-emerald-400 transition-colors" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}