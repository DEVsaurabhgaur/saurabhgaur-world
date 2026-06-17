'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { ArtProduct } from '@/types/art'

export type CartItem = {
  product: ArtProduct
  addedAt: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  add: (product: ArtProduct) => void
  remove: (productId: string) => void
  clear: () => void
  isInCart: (productId: string) => boolean
  total: number // in paise
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'sg_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  // Persist to localStorage + fire custom event whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      window.dispatchEvent(new Event('sg_cart_update'))
    } catch {}
  }, [items, hydrated])

  const add = useCallback((product: ArtProduct) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) return prev
      return [...prev, { product, addedAt: Date.now() }]
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  )

  const total = items.reduce((sum, i) => sum + i.product.price_inr, 0)

  return (
    <CartContext.Provider value={{ items, count: items.length, add, remove, clear, isInCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
