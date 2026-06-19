'use client'

import { Shield, ExternalLink } from 'lucide-react'
import { playClick } from '@/lib/audio'

type Certification = {
  name: string
  issuer: string
  date: string
  credentialId?: string
  verifyUrl?: string
  category: string
  skills: string[]
  color: string
  badge: string
  passed?: boolean
}

const CERTS: Certification[] = [
  // Microsoft
  {
    name: 'Microsoft AI Product Manager',
    issuer: 'Microsoft × Coursera',
    date: 'Jun 10, 2026',
    credentialId: '2H5CMHLC30RF',
    verifyUrl: 'https://coursera.org/verify/professional-cert/2H5CMHLC30RF',
    category: 'Microsoft',
    skills: ['Product Management', 'Market Research', 'Product Strategy', 'UX/UI', 'GTM'],
    color: '#00A4EF',
    badge: '🏅',
  },
  {
    name: 'Designing & Implementing Microsoft DevOps Solutions (AZ-400)',
    issuer: 'Microsoft — PearsonVue',
    date: 'Jun 19, 2026',
    category: 'Microsoft',
    skills: ['Azure DevOps', 'CI/CD', 'Infrastructure as Code', 'Monitoring'],
    color: '#00A4EF',
    badge: '✅',
    passed: true,
  },
  {
    name: 'AI Skills Fest 2026',
    issuer: 'Microsoft',
    date: 'Jun 2026',
    credentialId: 'cf6e3be6-9d5f-42cc-ad27-6681b443782f',
    category: 'Microsoft',
    skills: ['AI Applications', 'AI Ethics', 'Productivity AI', 'AI Tools'],
    color: '#00A4EF',
    badge: '🌐',
  },
  // Google
  {
    name: 'AI Fundamentals',
    issuer: 'Google × Coursera',
    date: 'May 19, 2026',
    credentialId: '3X6NUV96OOW0',
    verifyUrl: 'https://coursera.org/verify/3X6NUV96OOW0',
    category: 'Google',
    skills: ['AI Fundamentals', 'Machine Learning', 'Neural Networks'],
    color: '#4285F4',
    badge: '🎓',
  },
  {
    name: 'AI for Content Creation',
    issuer: 'Google',
    date: 'May 2026',
    credentialId: 'YUKJX093TZ0H',
    category: 'Google',
    skills: ['Generative AI', 'Content Creation', 'AI Writing'],
    color: '#4285F4',
    badge: '✍️',
  },
  {
    name: 'AI for Writing and Communicating',
    issuer: 'Google',
    date: 'May 2026',
    credentialId: 'LJ9QVCH44JV9',
    category: 'Google',
    skills: ['AI Writing', 'Communication', 'Generative AI'],
    color: '#4285F4',
    badge: '💬',
  },
  // AMD
  {
    name: 'GPU Optimization for LLM Inference',
    issuer: 'AMD AI Academy',
    date: 'Jun 2026',
    category: 'AMD',
    skills: ['vLLM', 'GPU Optimization', 'LLM Inference', 'ROCm', 'Performance Tuning'],
    color: '#ED1C24',
    badge: '⚡',
  },
  {
    name: 'Hugging Face on AMD',
    issuer: 'AMD AI Academy',
    date: 'Jun 14, 2026',
    category: 'AMD',
    skills: ['Transformers', 'Hugging Face', 'AMD GPU', 'Model Inference'],
    color: '#ED1C24',
    badge: '🤗',
  },
  // Other
  {
    name: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    date: 'Apr 2024',
    credentialId: '8543773',
    category: 'Google',
    skills: ['Generative AI', 'Large Language Models', 'Google Cloud'],
    color: '#34A853',
    badge: '🌱',
  },
  {
    name: 'Artificial Intelligence with Python',
    issuer: 'Great Learning',
    date: 'Feb 2023',
    category: 'Other',
    skills: ['Python', 'AI Fundamentals', 'Machine Learning'],
    color: '#FF6B35',
    badge: '🐍',
  },
  {
    name: 'Blockchain Basics',
    issuer: 'Great Learning',
    date: 'Feb 2023',
    category: 'Other',
    skills: ['Blockchain', 'Cryptocurrency', 'Distributed Systems'],
    color: '#F7931A',
    badge: '⛓️',
  },
]

const CATEGORIES = ['Microsoft', 'Google', 'AMD', 'Other'] as const

export default function CertificationsSection() {
  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    certs: CERTS.filter((c) => c.category === cat),
  }))

  const categoryColors: Record<string, string> = {
    Microsoft: '#00A4EF',
    Google: '#4285F4',
    AMD: '#ED1C24',
    Other: '#FFAD00',
  }

  return (
    <section className="py-24 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <div className="absolute inset-0 pointer-events-none cyber-grid-bg-dense opacity-20" />

      <div className="container-site relative z-10">
        <span className="text-xs font-mono tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          {'// CREDENTIALS_VAULT'}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-display tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}>
            CERTIFICATIONS
          </h2>
          <span className="text-xs font-mono text-slate-500">
            {CERTS.length} credentials · {CERTS.filter((c) => c.verifyUrl).length} verifiable
          </span>
        </div>

        <div className="space-y-12">
          {grouped.map(({ category, certs }) => (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: categoryColors[category], boxShadow: `0 0 8px ${categoryColors[category]}` }}
                />
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold"
                  style={{ color: categoryColors[category] }}
                >
                  {category}
                </span>
                <div className="flex-1 h-px opacity-20" style={{ background: `linear-gradient(to right, ${categoryColors[category]}, transparent)` }} />
                <span className="text-[10px] font-mono text-slate-600">{certs.length} certs</span>
              </div>

              {/* Cert cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {certs.map((cert) => (
                  <div
                    key={cert.name}
                    className="relative card p-4 bg-[#090f16]/60 border clip-cyber-sm group transition-all duration-300 cursor-default"
                    style={{ borderColor: `${cert.color}20` }}
                    onMouseEnter={(e) => {
                      playClick()
                      e.currentTarget.style.borderColor = `${cert.color}45`
                      e.currentTarget.style.boxShadow = `0 0 16px ${cert.color}08`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${cert.color}20`
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Passed badge */}
                    {cert.passed && (
                      <div className="absolute top-2 right-2">
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,255,136,0.1)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.25)' }}>
                          PASSED
                        </span>
                      </div>
                    )}

                    {/* Cert header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="shrink-0 w-8 h-8 rounded flex items-center justify-center text-sm"
                        style={{ background: `${cert.color}10`, border: `1px solid ${cert.color}20` }}
                      >
                        {cert.badge}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-200 leading-tight mb-1 line-clamp-2">
                          {cert.name}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    {/* Date + credential */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-slate-500">{cert.date}</span>
                      {cert.credentialId && (
                        <span className="text-[9px] font-mono text-slate-600 truncate max-w-[110px]">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                          style={{ background: `${cert.color}08`, color: cert.color, border: `1px solid ${cert.color}15` }}
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded text-slate-600">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Verify button */}
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono transition-all duration-200 hover:opacity-100 opacity-60"
                        style={{ color: cert.color }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Shield size={9} />
                        Verify credential
                        <ExternalLink size={8} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
