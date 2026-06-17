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
    .from('orders')
    .select('*, order_items(product_id, price_at_purchase, art_products(title, thumbnail_url))')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
