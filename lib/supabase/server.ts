import { createClient } from '@supabase/supabase-js'

const mockSupabase = {
  from: () => {
    const queryChain = {
      select: () => queryChain,
      eq: () => queryChain,
      order: () => queryChain,
      limit: () => queryChain,
      single: () => queryChain,
      then: (onfulfilled: any) => {
        return Promise.resolve({ data: [], error: null }).then(onfulfilled)
      }
    }
    return queryChain
  }
} as any

/** Server-side client with service role key — full DB access, bypasses RLS */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return mockSupabase
  }
  return createClient(url, key)
}

/** Server-side client with anon key — respects RLS (for auth checks) */
export function createAnonServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    return mockSupabase
  }
  return createClient(url, key)
}
