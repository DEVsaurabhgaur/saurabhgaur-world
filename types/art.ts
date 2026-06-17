export type ArtProduct = {
  id: string
  title: string
  description: string | null
  price_inr: number          // stored in paise
  tags: string[]
  style: string | null
  thumbnail_url: string
  file_url: string
  is_published: boolean
  created_at: string
}

export type ArtProductInsert = Omit<ArtProduct, 'id' | 'created_at'>
