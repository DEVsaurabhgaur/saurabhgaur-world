'use client'

import { useState, useEffect } from 'react'
import { Folder, Star, GitFork, Search, ExternalLink } from 'lucide-react'
import { playClick } from '@/lib/audio'

type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('https://api.github.com/users/DEVsaurabhgaur/repos?sort=updated&per_page=100')
        if (!res.ok) throw new Error('Failed to retrieve GitHub repository array.')
        const data = await res.json()
        if (Array.isArray(data)) {
          setRepos(data)
        } else {
          throw new Error('Invalid registry data structure returned.')
        }
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  const filtered = repos.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
  )

  const getLangColor = (lang: string | null) => {
    if (!lang) return '#777'
    switch (lang.toLowerCase()) {
      case 'python': return '#00FF88'
      case 'typescript': return '#00D8FF'
      case 'javascript': return '#F59E0B'
      case 'css': return '#8B5CF6'
      case 'html': return '#EF4444'
      case 'shell': return '#E8593C'
      case 'rust': return '#FF6B2B'
      case 'go': return '#00ADD8'
      default: return '#7A9BB5'
    }
  }

  const getRelativeTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return 'today'
    if (days === 1) return '1d ago'
    if (days < 30) return `${days}d ago`
    const months = Math.floor(days / 30)
    if (months < 12) return `${months}mo ago`
    return `${Math.floor(months / 12)}y ago`
  }

  return (
    <div className="space-y-8">
      {/* Search Input bar */}
      <div className="relative max-w-md select-none">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-500/50">
          <Search size={14} />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="SEARCH LIVE REPOSITORY ARCHIVES..."
          className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded outline-none text-xs font-mono tracking-widest text-cyan-400 placeholder-slate-600 focus:border-cyan-500/40 transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        />
      </div>

      {loading && (
        <div className="py-24 text-center space-y-3 select-none">
          <div className="inline-block w-8 h-8 border-2 rounded-full border-t-cyan-400 border-slate-800 animate-spin" />
          <p className="text-xs font-mono text-cyan-400/80 tracking-widest">// SYNCHRONIZING REPOSITORY INVENTORY...</p>
        </div>
      )}

      {error && (
        <div className="py-16 text-center border border-rose-500/20 bg-rose-950/10 rounded-lg max-w-xl mx-auto select-none">
          <p className="text-xs font-mono text-rose-500 tracking-widest mb-2">{'>>'} LINK STATE FAILURE :: OFFLINE or UNRESOLVED</p>
          <p className="text-xs text-slate-400">Could not fetch live GitHub repositories. Verify connection parameters.</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="py-16 text-center text-slate-500 text-xs font-mono tracking-wider select-none">
          NO MATCHING INVENTORY CODES FOUND.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group block card p-5 relative overflow-hidden transition-all duration-300 clip-cyber-sm border border-slate-850 hover:border-cyan-500/30 bg-[#090f16]/40 cyber-card-scanner"
              onMouseEnter={playClick}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="p-2 rounded bg-cyan-950/20 border border-cyan-500/10 text-cyan-400 group-hover:text-white transition-colors duration-200">
                  <Folder size={16} />
                </span>
                <span className="text-slate-500 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={14} />
                </span>
              </div>

              <h3 className="text-sm font-semibold font-mono tracking-wide mb-2 truncate text-slate-200 group-hover:text-cyan-400 transition-colors">
                {repo.name}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 mb-4 h-8" style={{ lineHeight: '1.6' }}>
                {repo.description || 'No module description registered.'}
              </p>

              <div className="flex items-center gap-4 pt-3.5 border-t border-slate-800/60 text-[10px] font-mono text-slate-500">
                {/* Language */}
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
                    {repo.language}
                  </span>
                )}
                
                {/* Stars */}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={10} className="text-amber-500" />
                    {repo.stargazers_count}
                  </span>
                )}

                {/* Forks */}
                {repo.forks_count > 0 && (
                  <span className="flex items-center gap-1">
                    <GitFork size={10} />
                    {repo.forks_count}
                  </span>
                )}

                {/* Updated */}
                <span className="ml-auto text-slate-600">{getRelativeTime(repo.updated_at)}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
