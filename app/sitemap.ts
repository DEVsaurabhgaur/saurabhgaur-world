import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { createServerClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://saurabhgaur.world'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/art`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  // Project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Art product pages (published only)
  let artPages: MetadataRoute.Sitemap = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('art_products')
      .select('id, created_at')
      .eq('is_published', true)

    artPages = (data ?? []).map((p) => ({
      url: `${baseUrl}/art/${p.id}`,
      lastModified: new Date(p.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {}

  return [...staticPages, ...projectPages, ...artPages]
}
