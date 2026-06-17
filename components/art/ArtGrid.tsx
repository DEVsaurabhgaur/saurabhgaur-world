'use client'

import { useState, useMemo } from 'react'
import { ArtProduct } from '@/types/art'
import ArtCard from './ArtCard'
import ArtFilters from './ArtFilters'

type SortOption = 'newest' | 'price_asc' | 'price_desc'

type Props = {
  products: ArtProduct[]
}

export default function ArtGrid({ products }: Props) {
  const [activeStyle, setActiveStyle] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>('newest')

  // Collect unique styles from products
  const styles = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => { if (p.style) set.add(p.style) })
    return Array.from(set).sort()
  }, [products])

  // Filter + sort
  const filtered = useMemo(() => {
    let result = products
    if (activeStyle) result = result.filter((p) => p.style === activeStyle)
    switch (sort) {
      case 'price_asc': return [...result].sort((a, b) => a.price_inr - b.price_inr)
      case 'price_desc': return [...result].sort((a, b) => b.price_inr - a.price_inr)
      default: return [...result].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }
  }, [products, activeStyle, sort])

  return (
    <div>
      <ArtFilters
        styles={styles}
        activeStyle={activeStyle}
        onStyleChange={setActiveStyle}
        sort={sort}
        onSortChange={setSort}
      />

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No art found for this filter.
          </p>
          <button
            onClick={() => setActiveStyle(null)}
            className="mt-3 text-xs underline underline-offset-2"
            style={{ color: 'var(--accent)' }}
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((product) => (
            <ArtCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
