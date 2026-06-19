'use client'

import { Briefcase, Clock, MapPin } from 'lucide-react'
import { playClick } from '@/lib/audio'

type Experience = {
  role: string
  company: string
  type: string
  period: string
  duration: string
  location: string
  description: string
  skills: string[]
  color: string
  icon: string
  active?: boolean
}

const EXPERIENCES: Experience[] = [
  {
    role: 'Independent AI Product Developer',
    company: 'saurabhgaur.world',
    type: 'Freelance · Self-Employed',
    period: 'Apr 2026 – Present',
    duration: '3 mos',
    location: 'Uttarakhand, India · Remote',
    description:
      'Building production AI products end-to-end — from architecture design through go-to-market. Shipped HireOS (LangGraph + Gemini 2.0 Flash, live), KundaliAI (TanStack Start + Supabase), and LaptopPulse (Python daemon). Managing full product lifecycle including AI product management, UX/UI, payments integration, and deployment.',
    skills: ['LangGraph', 'Gemini API', 'FastAPI', 'Next.js', 'TanStack Start', 'Supabase', 'Razorpay'],
    color: 'var(--accent)',
    icon: '🚀',
    active: true,
  },
  {
    role: 'AI Code & Reasoning Evaluator | LLM Quality Analyst',
    company: 'Scale AI',
    type: 'Freelance · Remote',
    period: 'May 2025 – May 2026',
    duration: '1 yr 1 mo',
    location: 'Remote',
    description:
      'Evaluated frontier LLM outputs across code generation and reasoning tasks for RLHF training pipelines. Designed multi-agent evaluation frameworks, benchmarked 4 frontier models across 5 capability dimensions, and developed structured failure taxonomies that informed annotation guidelines for subsequent training rounds.',
    skills: ['LLM Evaluation', 'RLHF', 'Python', 'SQL & Data Analysis', 'Prompt Engineering', 'Code Review'],
    color: '#FF6B00',
    icon: '🧠',
  },
  {
    role: 'Professional Development (Career Break)',
    company: 'Self-Directed Learning',
    type: 'Career Break · Upskilling',
    period: 'Apr 2021 – Jun 2024',
    duration: '3 yrs 3 mos',
    location: 'Rudrapur, Uttarakhand, India',
    description:
      'Intensive self-directed learning in AI/ML, completing B.Tech (CSE) at AKTU, and building foundational skills in Python, machine learning, and software development. Built the expertise that would later enable frontier model evaluation and AI product development.',
    skills: ['Python', 'Machine Learning', 'Computer Science', 'B.Tech CSE (AKTU)'],
    color: '#7B2FBE',
    icon: '📚',
  },
  {
    role: 'Quality Assurance & Quality Control Engineer',
    company: 'Interarch Building Products Ltd.',
    type: 'Full-time · On-site',
    period: 'Oct 2020 – Mar 2021',
    duration: '6 mos',
    location: 'India',
    description:
      'Multifaceted role covering quality assurance, production management, and team leadership for pre-engineered metal buildings. Applied systematic quality methodologies and led cross-functional teams in manufacturing environments.',
    skills: ['Quality Assurance', 'Production Management', 'Pre-engineered Metal Buildings', 'Team Leadership'],
    color: '#00FF88',
    icon: '⚙️',
  },
]

export default function ExperienceSection() {
  return (
    <section className="py-24 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <div className="absolute inset-0 pointer-events-none cyber-grid-bg-dense opacity-20" />

      <div className="container-site relative z-10">
        <span className="text-xs font-mono tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          {'// WORK_HISTORY'}
        </span>
        <h2 className="text-4xl sm:text-5xl font-display tracking-wide mb-16"
          style={{ fontFamily: 'var(--font-display)' }}>
          EXPERIENCE
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--accent), rgba(0,245,255,0.1) 80%, transparent)' }} />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="relative flex gap-8 group"
                onMouseEnter={playClick}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex shrink-0 items-start pt-5">
                  <div
                    className="relative w-8 h-8 rounded-full flex items-center justify-center text-sm border transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${exp.color}15`,
                      borderColor: `${exp.color}40`,
                      boxShadow: exp.active ? `0 0 12px ${exp.color}40` : 'none',
                    }}
                  >
                    <span>{exp.icon}</span>
                    {exp.active && (
                      <span
                        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                        style={{ background: '#00FF88', borderColor: 'var(--bg-primary)', boxShadow: '0 0 6px #00FF88', animation: 'blink 1.5s ease-in-out infinite' }}
                      />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className="flex-1 card p-6 bg-[#090f16]/60 border clip-cyber-sm transition-all duration-300 group-hover:border-opacity-60"
                  style={{
                    borderColor: `${exp.color}20`,
                    '--hover-border': exp.color,
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${exp.color}40`
                    e.currentTarget.style.boxShadow = `0 0 20px ${exp.color}08`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${exp.color}20`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="md:hidden text-base">{exp.icon}</span>
                        <h3
                          className="text-base font-semibold"
                          style={{ color: exp.color, textShadow: `0 0 8px ${exp.color}30` }}
                        >
                          {exp.role}
                        </h3>
                        {exp.active && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,255,136,0.1)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.25)' }}>
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-300">{exp.company}</p>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">{exp.type}</p>
                    </div>

                    <div className="shrink-0 text-right space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 sm:justify-end">
                        <Clock size={10} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 sm:justify-end">
                        <MapPin size={10} />
                        <span>{exp.location}</span>
                      </div>
                      <span
                        className="inline-block text-[9px] font-mono px-2 py-0.5 rounded"
                        style={{ background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}25` }}
                      >
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4" style={{ lineHeight: '1.8' }}>
                    {exp.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded clip-cyber-sm"
                        style={{
                          background: `${exp.color}08`,
                          color: exp.color,
                          border: `1px solid ${exp.color}20`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
