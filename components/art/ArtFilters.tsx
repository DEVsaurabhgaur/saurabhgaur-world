'use client'

type SortOption = 'newest' | 'price_asc' | 'price_desc'

type Props = {
  styles: string[]
  activeStyle: string | null
  onStyleChange: (style: string | null) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price ↑' },
  { value: 'price_desc', label: 'Price ↓' },
]

export default function ArtFilters({
  styles,
  activeStyle,
  onStyleChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <div
      className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between py-4 mb-8"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      {/* Style filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onStyleChange(null)}
          className="px-3 py-1.5 rounded text-xs font-mono transition-all duration-150"
          style={{
            fontFamily: 'var(--font-mono)',
            background: !activeStyle ? 'var(--accent)' : 'var(--bg-card)',
            border: `1px solid ${!activeStyle ? 'var(--accent)' : 'var(--border)'}`,
            color: !activeStyle ? '#fff' : 'var(--text-secondary)',
          }}
        >
          All
        </button>
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => onStyleChange(style === activeStyle ? null : style)}
            className="px-3 py-1.5 rounded text-xs font-mono transition-all duration-150"
            style={{
              fontFamily: 'var(--font-mono)',
              background: activeStyle === style ? 'var(--accent)' : 'var(--bg-card)',
              border: `1px solid ${activeStyle === style ? 'var(--accent)' : 'var(--border)'}`,
              color: activeStyle === style ? '#fff' : 'var(--text-secondary)',
            }}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 shrink-0">
        <span
          className="text-xs font-mono"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Sort:
        </span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className="px-2.5 py-1 rounded text-xs font-mono transition-all duration-150"
            style={{
              fontFamily: 'var(--font-mono)',
              background: sort === opt.value ? '#1a1a1a' : 'transparent',
              border: `1px solid ${sort === opt.value ? 'var(--border-hover)' : 'transparent'}`,
              color: sort === opt.value ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
