'use client'

import { useState, useEffect } from 'react'
import { Folder, FolderOpen, FileCode, Shield, Calendar, GitBranch, ExternalLink, Activity, Search, Star, GitFork, Cpu } from 'lucide-react'
import { Project } from '@/types/project'
import { playClick } from '@/lib/audio'
import { useTextScramble } from '@/hooks/useTextScramble'
import ReactMarkdown from 'react-markdown'

type Props = {
  projects: Project[]
}

type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

// Project schematic SVGs matching ProjectCard logic
function ProjectInspectorGraphic({ slug }: { slug: string }) {
  switch (slug) {
    case 'openclaw-atlas':
      return (
        <svg className="w-full h-32 opacity-85" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="120" fill="none" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
          <circle cx="200" cy="60" r="30" fill="none" stroke="#00F5FF" strokeWidth="1" strokeDasharray="3,3" className="animate-spin" style={{ transformOrigin: '200px 60px', animationDuration: '12s' }} />
          <circle cx="200" cy="60" r="8" fill="#00F5FF" />
          <circle cx="100" cy="40" r="3" fill="#FF6B00" />
          <line x1="200" y1="60" x2="100" y2="40" stroke="rgba(255, 107, 0, 0.3)" />
          <circle cx="300" cy="80" r="3" fill="#7B2FBE" />
          <line x1="200" y1="60" x2="300" y2="80" stroke="rgba(123, 47, 190, 0.3)" />
        </svg>
      )
    case 'frontier-benchmarking':
      return (
        <svg className="w-full h-32 opacity-85" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="120" fill="none" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
          <polygon points="200,15 260,60 230,105 170,105 140,60" fill="none" stroke="rgba(0, 245, 255, 0.15)" />
          <polygon points="200,30 240,60 220,90 180,90 160,60" fill="rgba(255, 107, 0, 0.1)" stroke="#FF6B00" strokeWidth="1.2" />
        </svg>
      )
    case 'ai-prompt-pipeline':
      return (
        <svg className="w-full h-32 opacity-85" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="120" fill="none" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
          <circle cx="200" cy="60" r="25" fill="none" stroke="#7B2FBE" strokeWidth="1" strokeDasharray="4,4" />
          <path d="M 175,60 L 225,60 M 200,35 L 200,85" stroke="#00FF88" strokeWidth="1.2" />
        </svg>
      )
    case 'saurabhgaur-world':
      return (
        <svg className="w-full h-32 opacity-85" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="120" fill="none" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
          <g transform="translate(200, 60) scale(0.6)">
            <polygon points="0,-35 60,-70 0,-105 -60,-70" fill="none" stroke="#00F5FF" strokeWidth="1.5" />
            <polygon points="-60,-70 0,-35 0,35 -60,0" fill="none" stroke="#FF6B00" strokeWidth="1.5" />
            <polygon points="0,-35 60,-70 60,0 0,35" fill="none" stroke="#7B2FBE" strokeWidth="1.5" />
          </g>
        </svg>
      )
    case 'tata-python-tooling':
      return (
        <svg className="w-full h-32 opacity-85" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="120" fill="none" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
          <path d="M 50,60 L 140,60 L 155,20 L 170,100 L 185,60 L 350,60" fill="none" stroke="#00FF88" strokeWidth="1.5" />
        </svg>
      )
    default:
      return null
  }
}

export default function ProjectsClient({ projects }: Props) {
  const [activeNode, setActiveNode] = useState<{ type: 'core' | 'github'; slug?: string; id?: number }>({
    type: 'core',
    slug: projects[0].slug,
  })

  // Collapsible Tree state
  const [coreOpen, setCoreOpen] = useState(true)
  const [githubOpen, setGithubOpen] = useState(true)

  // Live Repos listing state
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loadingRepos, setLoadingRepos] = useState(false)
  const [reposError, setReposError] = useState<string | null>(null)
  const [githubSearch, setGithubSearch] = useState('')

  const { displayText: titleText, triggerScramble: scrambleTitle } = useTextScramble('INDEXER_V4', false)

  // Fetch repositories on mount
  useEffect(() => {
    async function loadRepos() {
      setLoadingRepos(true)
      try {
        const res = await fetch('https://api.github.com/users/DEVsaurabhgaur/repos?sort=updated&per_page=50')
        if (!res.ok) throw new Error('API Sync Failed')
        const data = await res.json()
        if (Array.isArray(data)) {
          setRepos(data)
        }
      } catch (e) {
        setReposError('Offline Build Mode or Network Blocked')
      } finally {
        setLoadingRepos(false)
      }
    }
    loadRepos()
  }, [])

  // Filter dynamic repo listing
  const filteredRepos = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(githubSearch.toLowerCase()))
  )

  const selectedCoreProject = activeNode.type === 'core' 
    ? projects.find((p) => p.slug === activeNode.slug) 
    : null
  
  const selectedGithubRepo = activeNode.type === 'github' 
    ? repos.find((r) => r.id === activeNode.id) 
    : null

  const handleNodeClick = (node: typeof activeNode) => {
    playClick()
    setActiveNode(node)
  }

  return (
    <main className="min-h-screen pt-28 pb-24 relative overflow-hidden select-none fui-crt-screen">
      <div className="absolute inset-0 pointer-events-none cyber-grid-bg opacity-30" />

      <div className="container-site relative z-10">
        
        {/* Header telemetry info */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-8 text-[10px] font-mono text-cyan-400">
          <span className="flex items-center gap-1.5"><Activity size={12} className="animate-pulse" /> CORE_INDEXER // SECURE SHELL LINK</span>
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start h-[70vh]">
          
          {/* LEFT PANEL:collapsible directories tree (lg:col-span-4) */}
          <div className="lg:col-span-4 w-full h-full flex flex-col bg-[#070B0F]/90 border border-slate-800 rounded clip-cyber glow-glow overflow-y-auto max-h-[70vh] p-5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/60 mb-4 font-mono text-[10px] text-slate-500 font-bold">
              <span>EXPLORER_TREE [LOCAL_NODE]</span>
              <span>VER_4.2.0</span>
            </div>

            {/* Folder 1: Core Projects */}
            <div className="font-mono text-xs space-y-1">
              <div 
                onClick={() => { playClick(); setCoreOpen(!coreOpen) }}
                className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-cyan-400 transition-colors py-1.5"
              >
                {coreOpen ? <FolderOpen size={14} className="text-amber-500" /> : <Folder size={14} className="text-amber-500" />}
                <span className="font-bold tracking-widest text-[11px]">📁 CORE_PROJECT_FILES</span>
              </div>

              {coreOpen && (
                <div className="pl-6 border-l border-slate-800 ml-1.5 space-y-1">
                  {projects.map((p) => {
                    const active = activeNode.type === 'core' && activeNode.slug === p.slug
                    return (
                      <div
                        key={p.slug}
                        onClick={() => handleNodeClick({ type: 'core', slug: p.slug })}
                        className={`flex items-center gap-2 cursor-pointer py-1 px-2 rounded clip-cyber-sm transition-all duration-150 ${
                          active ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold shadow-[0_0_6px_rgba(0,245,255,0.15)]' : 'border border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <FileCode size={12} className={active ? 'text-cyan-400' : 'text-slate-500'} />
                        <span className="truncate">{p.slug}.json</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Folder 2: Live GitHub Repositories */}
            <div className="font-mono text-xs space-y-1 mt-6">
              <div 
                onClick={() => { playClick(); setGithubOpen(!githubOpen) }}
                className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-cyan-400 transition-colors py-1.5"
              >
                {githubOpen ? <FolderOpen size={14} className="text-amber-500" /> : <Folder size={14} className="text-amber-500" />}
                <span className="font-bold tracking-widest text-[11px]">📁 GITHUB_LIVE_FEED</span>
              </div>

              {githubOpen && (
                <div className="pl-6 border-l border-slate-800 ml-1.5 space-y-3">
                  {/* Repo search filter */}
                  <div className="relative pt-1 select-none pr-1">
                    <span className="absolute inset-y-0 left-2 pt-2 flex items-center pointer-events-none text-slate-500">
                      <Search size={10} />
                    </span>
                    <input
                      type="text"
                      value={githubSearch}
                      onChange={(e) => setGithubSearch(e.target.value)}
                      placeholder="FILTER REPOS..."
                      onClick={(e) => e.stopPropagation()}
                      className="w-full pl-6 pr-2 py-1 bg-slate-950/80 border border-slate-800 rounded outline-none text-[9px] font-mono tracking-widest text-cyan-400 placeholder-slate-600 focus:border-cyan-500/30 transition-colors"
                    />
                  </div>

                  {loadingRepos && (
                    <div className="py-4 text-center text-[10px] text-cyan-400 animate-pulse font-mono tracking-widest">
                      // SYNCING LIVE FEED...
                    </div>
                  )}

                  {reposError && (
                    <div className="py-2 text-center text-[10px] text-rose-500 font-mono">
                      // API_ERR_OFFLINE
                    </div>
                  )}

                  {!loadingRepos && !reposError && (
                    <div className="space-y-1 max-h-[30vh] overflow-y-auto pr-1">
                      {filteredRepos.map((r) => {
                        const active = activeNode.type === 'github' && activeNode.id === r.id
                        return (
                          <div
                            key={r.id}
                            onClick={() => handleNodeClick({ type: 'github', id: r.id })}
                            className={`flex items-center gap-2 cursor-pointer py-1 px-2 rounded clip-cyber-sm transition-all duration-150 ${
                              active ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold shadow-[0_0_6px_rgba(0,245,255,0.15)]' : 'border border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <FileCode size={12} className={active ? 'text-cyan-400' : 'text-slate-500'} />
                            <span className="truncate">{r.name.toLowerCase()}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT PANEL: dynamic Decryptor Code Panel (lg:col-span-8) */}
          <div className="lg:col-span-8 w-full h-full flex flex-col bg-[#070B0F]/90 border border-slate-800 rounded clip-cyber glow-glow overflow-y-auto max-h-[70vh] p-6">
            
            {/* Active Core Project inspect panel */}
            {selectedCoreProject && (
              <div className="space-y-6 font-mono">
                
                {/* Header panel details */}
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
                  <div>
                    <h2 className="text-xs text-cyan-400 font-bold">
                      FILE: /projects/{selectedCoreProject.slug}.json
                    </h2>
                    <h1 className="text-xl sm:text-2xl font-display text-slate-100 mt-1 select-all" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedCoreProject.title}
                    </h1>
                  </div>
                  <div className="text-[10px] text-right text-slate-500">
                    <p>STATUS: <span className="text-emerald-400 font-bold">DECRYPTED_OK</span></p>
                    <p>SIZE: 1.48 KB</p>
                  </div>
                </div>

                {/* Cyber schematic vector graphic */}
                <div className="p-3 bg-slate-950/40 border border-slate-850/60 rounded">
                  <ProjectInspectorGraphic slug={selectedCoreProject.slug} />
                </div>

                {/* Highlights listing grid */}
                <div>
                  <p className="text-[10px] text-cyan-500/80 mb-2.5 font-bold tracking-widest">{'>>'} SCHEMATIC KEY HIGHLIGHTS:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedCoreProject.highlights.map((h, idx) => (
                      <div key={idx} className="flex gap-2 p-2 bg-slate-950/30 border border-slate-850 rounded text-slate-300 text-xs">
                        <span className="text-cyan-400 select-none">▸</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtitle / Description breakdown */}
                <div>
                  <p className="text-[10px] text-cyan-500/80 mb-2 font-bold tracking-widest">{'>>'} DATA_FIELD DECRYPTION:</p>
                  <div className="prose prose-invert text-xs text-slate-350 bg-slate-950/30 p-4 border border-slate-850/60 rounded leading-relaxed select-text">
                    <ReactMarkdown
                      components={{
                        h2: ({ children }) => <h2 className="text-xs text-cyan-400 border-b border-slate-800 pb-1 mt-4 mb-2 font-bold uppercase">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xs text-slate-300 font-bold mt-3 mb-1">{children}</h3>,
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        li: ({ children }) => <li>{children}</li>,
                      }}
                    >
                      {selectedCoreProject.longDescription}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Meta details footer */}
                <div className="grid sm:grid-cols-3 gap-4 border-t border-slate-800 pt-5 text-[10px] text-slate-500">
                  <div>
                    <span className="block text-[8px] text-slate-600 font-bold uppercase">EXECUTION_PERIOD</span>
                    <span className="text-slate-300 flex items-center gap-1.5 mt-1"><Calendar size={11} className="text-cyan-500" /> {selectedCoreProject.period}</span>
                  </div>
                  {selectedCoreProject.company && (
                    <div>
                      <span className="block text-[8px] text-slate-600 font-bold uppercase">COMPANY_AFFILIATE</span>
                      <span className="text-slate-300 flex items-center gap-1.5 mt-1"><Cpu size={11} className="text-cyan-500" /> {selectedCoreProject.company}</span>
                    </div>
                  )}
                  {/* Action links */}
                  <div className="flex gap-2 items-end sm:col-span-1 justify-end">
                    {selectedCoreProject.githubUrl && (
                      <a 
                        href={selectedCoreProject.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/15 rounded text-cyan-400 hover:text-white transition-all duration-150"
                        title="Open Source Repository"
                      >
                        <GitBranch size={13} />
                      </a>
                    )}
                    {selectedCoreProject.liveUrl && (
                      <a 
                        href={selectedCoreProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/15 rounded text-cyan-400 hover:text-white transition-all duration-150"
                        title="Launch Live Target"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* Active GitHub project inspect panel */}
            {selectedGithubRepo && (
              <div className="space-y-6 font-mono">
                
                {/* Header details */}
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
                  <div>
                    <h2 className="text-xs text-orange-400 font-bold">
                      FILE: /github/repos/{selectedGithubRepo.name.toLowerCase()}.git
                    </h2>
                    <h1 className="text-xl sm:text-2xl font-display text-slate-100 mt-1 select-all" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedGithubRepo.name}
                    </h1>
                  </div>
                  <div className="text-[10px] text-right text-slate-500">
                    <p>INDEX: <span className="text-orange-400 font-bold">ONLINE_SYNC</span></p>
                    <p>TYPE: PUBLIC_REPO</p>
                  </div>
                </div>

                {/* Telemetry metadata stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-950/40 p-3 border border-slate-850 rounded text-center">
                    <span className="block text-[8px] text-slate-600 font-bold uppercase">PRIMARY_LANG</span>
                    <span className="text-xs text-orange-400 font-bold block mt-1">{selectedGithubRepo.language || 'NONE'}</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 border border-slate-850 rounded text-center">
                    <span className="block text-[8px] text-slate-600 font-bold uppercase">STAR_METRICS</span>
                    <span className="text-xs text-slate-200 font-bold flex items-center justify-center gap-1 mt-1">
                      <Star size={11} className="text-amber-500" /> {selectedGithubRepo.stargazers_count}
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-3 border border-slate-850 rounded text-center">
                    <span className="block text-[8px] text-slate-600 font-bold uppercase">FORK_COUNT</span>
                    <span className="text-xs text-slate-200 font-bold flex items-center justify-center gap-1 mt-1">
                      <GitFork size={11} /> {selectedGithubRepo.forks_count}
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-3 border border-slate-850 rounded text-center">
                    <span className="block text-[8px] text-slate-600 font-bold uppercase">REF_INTEGRATED</span>
                    <span className="text-xs text-emerald-400 font-bold block mt-1">STABLE</span>
                  </div>
                </div>

                {/* Description details */}
                <div>
                  <p className="text-[10px] text-orange-500/85 mb-2 font-bold tracking-widest">{'>>'} DATA_FIELD DECRYPTION:</p>
                  <div className="text-xs text-slate-350 bg-slate-950/30 p-5 border border-slate-850/60 rounded leading-relaxed select-text">
                    <p className="mb-3">
                      {selectedGithubRepo.description || 'No database module description registered under this repository.'}
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Last update committed: {new Date(selectedGithubRepo.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Link footer */}
                <div className="border-t border-slate-800 pt-5 flex justify-between items-center text-[10px] text-slate-500">
                  <span>DEPLOYMENT: GITHUB_SHELL</span>
                  <a
                    href={selectedGithubRepo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/15 rounded text-orange-400 hover:text-white transition-all duration-150"
                  >
                    <GitBranch size={12} />
                    <span>RESOLVE_REPOSITORY ↗</span>
                  </a>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </main>
  )
}
