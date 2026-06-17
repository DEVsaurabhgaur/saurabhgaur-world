import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Convert paise to ₹ display string */
export function formatPrice(paise: number): string {
  return `₹${(paise / 100).toLocaleString('en-IN')}`
}

/** Generate a random token string */
export function generateToken(): string {
  return crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
}

/** 72 hours from now as ISO string */
export function tokenExpiryDate(): string {
  const d = new Date()
  d.setHours(d.getHours() + 72)
  return d.toISOString()
}
