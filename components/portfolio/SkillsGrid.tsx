'use client'

import { playClick } from '@/lib/audio'
import { useTextScramble } from '@/hooks/useTextScramble'

type SkillGroup = {
  label: string
  color: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'AI & LLM',
    color: '#FF4A26',
    skills: [
      'LLM Evaluation',
      'Prompt Engineering',
      'RLHF',
      'Agentic AI',
      'RAG',
      'Hugging Face',
      'Stable Diffusion',
      'Midjourney',
    ],
  },
  {
    label: 'Agentic Stack',
    color: '#00F5FF',
    skills: [
      'LangGraph',
      'LangChain',
      'FAISS',
      'ChromaDB',
      'Google Gemini',
      'OpenAI',
      'Anthropic',
      'Tool-Use Chains',
    ],
  },
  {
    label: 'Languages',
    color: '#00D8FF',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
  },
  {
    label: 'Web & Frameworks',
    color: '#BD5CFF',
    skills: ['Next.js', 'React', 'TanStack Start', 'Tailwind CSS', 'FastAPI', 'Flask', 'REST APIs'],
  },
  {
    label: 'Data & Infra',
    color: '#00FF88',
    skills: ['Supabase', 'PostgreSQL', 'Pandas', 'NumPy', 'Jupyter', 'Docker', 'Vercel'],
  },
  {
    label: 'AI Product Mgmt',
    color: '#FFAD00',
    skills: ['Azure', 'Power BI', 'Copilot', 'Market Research', 'Product Roadmapping', 'UX/UI Fundamentals', 'GTM Strategy'],
  },
  {
    label: 'Dev Tools',
    color: '#FF69B4',
    skills: ['Git', 'GitHub', 'Razorpay', 'Resend', 'VS Code', 'Linux'],
  },
]

export default function SkillsGrid() {
  const { displayText: titleText, triggerScramble: scrambleTitle } = useTextScramble('TOOLKIT', false)

  return (
    <section className="py-24 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      {/* Background wire grid */}
      <div className="absolute inset-0 pointer-events-none cyber-grid-bg-dense opacity-30" />

      <div className="container-site relative z-10">
        <span
          className="text-xs font-mono tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
        >
          {'// SYSTEMS_INVENTORY'}
        </span>
        <h2
          className="text-4xl sm:text-5xl font-display tracking-wide mb-16 select-none cursor-pointer"
          style={{ fontFamily: 'var(--font-display)' }}
          onMouseEnter={scrambleTitle}
        >
          {titleText}
        </h2>

        <div className="space-y-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-4 group/row">
              {/* Category node point & label */}
              <div className="sm:w-52 shrink-0 flex items-center gap-3 select-none">
                <span 
                  className="w-2.5 h-2.5 rounded-full block border border-black shadow-[0_0_8px_currentColor] animate-pulse" 
                  style={{ color: group.color, backgroundColor: group.color }}
                />
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold"
                  style={{ color: group.color, fontFamily: 'var(--font-mono)' }}
                >
                  {group.label}
                </span>
              </div>

              {/* Visual circuit connector wire */}
              <div 
                className="hidden sm:block flex-1 h-px mt-2 opacity-25 group-hover/row:opacity-60 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, ${group.color}, transparent)` }}
              />

              {/* Skill Node pills */}
              <div className="flex flex-wrap gap-2.5 sm:max-w-[60%]">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded text-xs font-mono transition-all duration-200 clip-cyber-sm hover:scale-105 border bg-slate-900/40 select-none cursor-pointer hover:bg-slate-950/60"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      borderColor: `${group.color}25`,
                      color: group.color,
                      boxShadow: `inset 0 0 10px ${group.color}05`
                    }}
                    onMouseEnter={() => {
                      playClick()
                    }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mr-2 opacity-60 animate-ping shrink-0" 
                      style={{ backgroundColor: group.color }} 
                    />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
