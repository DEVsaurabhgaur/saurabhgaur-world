import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { ArtProduct } from '@/types/art'
import ArtDetailClient from './ArtDetailClient'

type Props = {
  params: { id: string }
}

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('art_products')
    .select('title, description, thumbnail_url')
    .eq('id', params.id)
    .eq('is_published', true)
    .single()

  if (!data) return {}
  return {
    title: `${data.title} — Art`,
    description: data.description ?? undefined,
    openGraph: { images: [data.thumbnail_url] },
  }
}

export default async function ArtDetailPage({ params }: Props) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('art_products')
    .select('*')
    .eq('id', params.id)
    .eq('is_published', true)
    .single()

  if (error || !data) notFound()

  return <ArtDetailClient product={data as ArtProduct} />
}
