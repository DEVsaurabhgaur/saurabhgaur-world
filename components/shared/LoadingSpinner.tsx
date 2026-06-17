import { cn } from '@/lib/utils'

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn('inline-block w-5 h-5 border-2 rounded-full animate-spin', className)}
      style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }}
      role="status"
      aria-label="Loading"
    />
  )
}
