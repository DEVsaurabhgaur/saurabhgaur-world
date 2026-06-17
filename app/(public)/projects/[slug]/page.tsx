import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, GitBranch, Calendar, Building2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { projects } from '@/data/projects'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Saurabh Kumar Gaur`,
    description: project.description,
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="container-site">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-150 hover:text-white text-[var(--text-secondary)]"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>

        <div className="grid lg:grid-cols-[1fr_300px] gap-16">
          {/* Main content */}
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-6xl font-display tracking-wide mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h1>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              {project.subtitle}
            </p>

            {/* Long description (markdown) */}
            <div
              className="prose-dark"
              style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
              }}
            >
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2
                      className="text-2xl font-display tracking-wide mt-10 mb-4"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      className="text-lg font-semibold mt-6 mb-3"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 space-y-2 pl-4" style={{ color: 'var(--text-secondary)' }}>
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--accent)', marginTop: '6px' }}>▸</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code
                      className="px-1.5 py-0.5 rounded text-xs"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        color: 'var(--accent)',
                      }}
                    >
                      {children}
                    </code>
                  ),
                }}
              >
                {project.longDescription}
              </ReactMarkdown>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meta card */}
            <div className="card p-5 space-y-4">
              <div>
                <p
                  className="text-xs font-mono mb-1"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  PERIOD
                </p>
                <div className="flex items-center gap-2">
                  <Calendar size={13} style={{ color: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {project.period}
                  </span>
                </div>
              </div>
              {project.company && (
                <div>
                  <p
                    className="text-xs font-mono mb-1"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                  >
                    COMPANY
                  </p>
                  <div className="flex items-center gap-2">
                    <Building2 size={13} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {project.company}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Key Highlights */}
            <div className="card p-5">
              <p
                className="text-xs font-mono tracking-widest uppercase mb-4"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
              >
                Highlights
              </p>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span style={{ color: 'var(--accent)', marginTop: '2px' }}>▸</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="card p-5 space-y-3">
                <p
                  className="text-xs font-mono tracking-widest uppercase mb-4"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                >
                  Links
                </p>
                 {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors duration-150 hover:text-white text-[var(--text-secondary)]"
                  >
                    <GitBranch size={14} />
                    GitHub Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors duration-150 hover:text-white text-[var(--text-secondary)]"
                  >
                    <ExternalLink size={14} />
                    Live Site
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
