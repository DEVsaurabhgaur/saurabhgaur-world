import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

function isAdmin(req: NextRequest) {
  const token = req.cookies.get('sg_admin')?.value
  return token === process.env.ADMIN_SECRET
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('art_products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { title, description, price_inr, tags, style, thumbnail_url, file_url, is_published } = body

    if (!title || !price_inr || !thumbnail_url || !file_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('art_products')
      .insert({
        title,
        description: description ?? null,
        price_inr: Number(price_inr),
        tags: tags ?? [],
        style: style ?? null,
        thumbnail_url,
        file_url,
        is_published: is_published ?? false,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
