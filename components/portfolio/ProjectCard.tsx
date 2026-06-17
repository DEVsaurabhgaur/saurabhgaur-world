'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, GitBranch, Shield, Activity, Terminal, Server, Cpu } from 'lucide-react'
import { Project } from '@/types/project'
import { playClick } from '@/lib/audio'
import { useTextScramble } from '@/hooks/useTextScramble'

type Props = { project: Project; featured?: boolean }

// High-tech SVG thumbnail designs based on project slug
function ProjectThumbnail({ slug, featured }: { slug: string; featured: boolean }) {
  const heightClass = featured ? 'h-[220px]' : 'h-[180px]'
  
  switch (slug) {
    case 'openclaw-atlas':
      return (
        <div className={`w-full ${heightClass} relative overflow-hidden bg-[#060a0f] border-b border-cyan-500/10`}>
          <svg className="w-full h-full opacity-85" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,0 L 400,220 M 400,0 L 0,220" stroke="rgba(0, 245, 255, 0.04)" strokeWidth="1" />
            <circle cx="200" cy="110" r="45" fill="none" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx="200" cy="110" r="15" fill="rgba(0, 245, 255, 0.1)" stroke="#00F5FF" strokeWidth="1" />
            <circle cx="200" cy="110" r="4" fill="#00F5FF" />
            {/* satellite nodes */}
            <circle cx="90" cy="60" r="4" fill="#FF6B00" />
            <line x1="200" y1="110" x2="90" y2="60" stroke="rgba(255, 107, 0, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
            
            <circle cx="310" cy="70" r="4" fill="#7B2FBE" />
            <line x1="200" y1="110" x2="310" y2="70" stroke="rgba(123, 47, 190, 0.3)" strokeWidth="1" />
            
            <circle cx="110" cy="160" r="4" fill="#00FF88" />
            <line x1="200" y1="110" x2="110" y2="160" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="1" />
            
            <circle cx="290" cy="160" r="4" fill="#00F5FF" />
            <line x1="200" y1="110" x2="290" y2="160" stroke="rgba(0, 245, 255, 0.3)" strokeWidth="1" strokeDasharray="2,2" />
            
            <text x="200" y="195" textAnchor="middle" fill="#00F5FF" fontFamily="monospace" fontSize="9" letterSpacing="2">OPENCLAW :: CORE_HARNESS_V1</text>
          </svg>
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20">
            <Shield size={8} /> <span>SECURE</span>
          </div>
        </div>
      )
    case 'frontier-benchmarking':
      return (
        <div className={`w-full ${heightClass} relative overflow-hidden bg-[#060a0f] border-b border-cyan-500/10`}>
          <svg className="w-full h-full opacity-85" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
            <polygon points="200,30 320,110 280,180 120,180 80,110" fill="none" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
            <polygon points="200,60 290,110 260,160 140,160 110,110" fill="none" stroke="rgba(0, 245, 255, 0.05)" strokeWidth="1" />
            {/* radar data polygon */}
            <polygon points="200,45 305,110 270,170 130,150 95,110" fill="rgba(255, 107, 0, 0.08)" stroke="#FF6B00" strokeWidth="1.5" />
            <circle cx="200" cy="45" r="3" fill="#FF6B00" />
            <circle cx="305" cy="110" r="3" fill="#FF6B00" />
            <circle cx="270" cy="170" r="3" fill="#FF6B00" />
            <circle cx="130" cy="150" r="3" fill="#FF6B00" />
            <circle cx="95" cy="110" r="3" fill="#FF6B00" />
            <line x1="200" y1="110" x2="200" y2="30" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="0.5" />
            <line x1="200" y1="110" x2="320" y2="110" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="0.5" />
            <line x1="200" y1="110" x2="280" y2="180" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="0.5" />
            <line x1="200" y1="110" x2="120" y2="180" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="0.5" />
            <line x1="200" y1="110" x2="80" y2="110" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="0.5" />
            <text x="200" y="195" textAnchor="middle" fill="#FF6B00" fontFamily="monospace" fontSize="9" letterSpacing="2">EVAL_MODEL :: FRONTIER_RADAR</text>
          </svg>
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-orange-400 bg-orange-950/40 px-1.5 py-0.5 rounded border border-orange-500/20">
            <Activity size={8} /> <span>METRIC_RUN</span>
          </div>
        </div>
      )
    case 'ai-prompt-pipeline':
      return (
        <div className={`w-full ${heightClass} relative overflow-hidden bg-[#060a0f] border-b border-cyan-500/10`}>
          <svg className="w-full h-full opacity-85" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="40" width="280" height="120" fill="none" stroke="rgba(0, 245, 255, 0.08)" strokeWidth="1" />
            <circle cx="200" cy="100" r="45" fill="none" stroke="#7B2FBE" strokeWidth="1.2" strokeDasharray="5,4" />
            <circle cx="200" cy="100" r="6" fill="#00FF88" />
            {/* focus bounds */}
            <path d="M 50,45 L 50,25 L 70,25 M 330,25 L 350,25 L 350,45 M 350,155 L 350,175 L 330,175 M 70,175 L 50,175 L 50,155" stroke="#00F5FF" strokeWidth="1.2" fill="none" />
            <text x="200" y="195" textAnchor="middle" fill="#7B2FBE" fontFamily="monospace" fontSize="9" letterSpacing="2">LATENT_PIPELINE :: DIFFUSION_LOOP</text>
          </svg>
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-purple-400 bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-500/20">
            <Terminal size={8} /> <span>PIPELINE</span>
          </div>
        </div>
      )
    case 'saurabhgaur-world':
      return (
        <div className={`w-full ${heightClass} relative overflow-hidden bg-[#060a0f] border-b border-cyan-500/10`}>
          <svg className="w-full h-full opacity-85" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(200, 100) scale(0.95)">
              <polygon points="0,-35 60,-70 0,-105 -60,-70" fill="rgba(0, 245, 255, 0.03)" stroke="#00F5FF" strokeWidth="1.2" />
              <polygon points="-60,-70 0,-35 0,35 -60,0" fill="rgba(255, 107, 0, 0.03)" stroke="#FF6B00" strokeWidth="1.2" />
              <polygon points="0,-35 60,-70 60,0 0,35" fill="rgba(123, 47, 190, 0.03)" stroke="#7B2FBE" strokeWidth="1.2" />
              <circle cx="0" cy="-35" r="4" fill="#00FF88" />
            </g>
            <text x="200" y="195" textAnchor="middle" fill="#00F5FF" fontFamily="monospace" fontSize="9" letterSpacing="2">PORTFOLIO_NODE :: SAURABHGAUR</text>
          </svg>
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
            <Server size={8} /> <span>LIVE_HOST</span>
          </div>
        </div>
      )
    case 'tata-python-tooling':
      return (
        <div className={`w-full ${heightClass} relative overflow-hidden bg-[#060a0f] border-b border-cyan-500/10`}>
          <svg className="w-full h-full opacity-85" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
            <path d="M 40,110 L 110,110 L 130,60 L 150,160 L 170,110 L 230,110 L 245,35 L 260,185 L 275,110 L 360,110" fill="none" stroke="#00FF88" strokeWidth="1.5" />
            <line x1="40" y1="50" x2="360" y2="50" stroke="rgba(255, 107, 0, 0.2)" strokeWidth="0.75" strokeDasharray="3,3" />
            <line x1="40" y1="170" x2="360" y2="170" stroke="rgba(255, 107, 0, 0.2)" strokeWidth="0.75" strokeDasharray="3,3" />
            <text x="200" y="195" textAnchor="middle" fill="#00FF88" fontFamily="monospace" fontSize="9" letterSpacing="2">AEROSPACE_STATISTICS :: ANOMALY_Z</text>
          </svg>
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-blue-400 bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-500/20">
            <Cpu size={8} /> <span>ANOMALY_RUN</span>
          </div>
        </div>
      )
    default:
      return (
        <div className={`w-full ${heightClass} relative overflow-hidden bg-[#060a0f] border-b border-cyan-500/10`}>
          <svg className="w-full h-full opacity-85" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="360" height="180" fill="none" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
            <text x="200" y="115" textAnchor="middle" fill="var(--text-secondary)" fontFamily="monospace" fontSize="10" letterSpacing="1">GENERIC :: PROJECT_NODE_LOADED</text>
          </svg>
        </div>
      )
  }
}

export default function ProjectCard({ project, featured = false }: Props) {
  const [hovered, setHovered] = useState(false)
  const { displayText: titleText, triggerScramble: scrambleTitle } = useTextScramble(project.title, false)

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block card overflow-hidden transition-all duration-300 clip-cyber cyber-corners cyber-card-scanner hover:scale-[1.01]"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
      onMouseEnter={() => {
        playClick()
        setHovered(true)
        scrambleTitle()
      }}
      onMouseLeave={() => {
        setHovered(false)
      }}
    >
      {/* Visual SVG schematic graphic */}
      <ProjectThumbnail slug={project.slug} featured={featured} />

      <div className="p-5 font-body relative">
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5 select-none">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill clip-cyber-sm">{tag}</span>
            ))}
          </div>
        )}

        <h3 
          className="text-base font-semibold mb-2 font-mono tracking-wide text-cyan-400 group-hover:text-white transition-colors duration-200"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {hovered ? titleText : project.title}
        </h3>

        {project.subtitle && (
          <p className="text-xs font-mono mb-4 line-clamp-2 text-slate-400" style={{ fontFamily: 'var(--font-mono)' }}>
            {project.subtitle}
          </p>
        )}

        <div className="flex items-center gap-3 pt-3.5" style={{ borderTop: '1px solid var(--border)' }}>
          {project.githubUrl && (
            <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <GitBranch size={10} /> GitHub
            </span>
          )}
          {project.liveUrl && (
            <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <ExternalLink size={10} /> Live
            </span>
          )}
          <span 
            className="ml-auto text-[11px] font-mono tracking-widest text-cyan-400 group-hover:text-white group-hover:underline transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            RESOLVE_NODE →
          </span>
        </div>
      </div>
    </Link>
  )
}