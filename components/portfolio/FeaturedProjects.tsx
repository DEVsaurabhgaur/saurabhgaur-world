import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3)

  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container-site">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span
              className="text-xs font-mono tracking-widest uppercase mb-4 block"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              Work
            </span>
            <h2
              className="text-4xl sm:text-5xl font-display tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SELECTED
              <br />
              PROJECTS
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm transition-colors duration-150 hover:text-[#F0F0F0]"
            style={{ color: 'var(--text-secondary)' }}
          >
            All Projects
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm hover:text-[#F0F0F0] transition-colors duration-150"
            style={{ color: 'var(--text-secondary)' }}
          >
            All Projects
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
