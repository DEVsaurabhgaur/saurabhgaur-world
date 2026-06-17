import { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectsClient from '@/components/portfolio/ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects — Saurabh Kumar Gaur',
  description:
    'LLM evaluation frameworks, agentic AI benchmarking, AI art pipelines, and full-stack engineering projects by Saurabh Kumar Gaur.',
}

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />
}
