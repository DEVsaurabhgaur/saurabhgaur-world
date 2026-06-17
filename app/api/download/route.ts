import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  const supabase = createServerClient()

  // 1. Look up token
  const { data: dl, error } = await supabase
    .from('download_tokens')
    .select('id, product_id, expires_at, used_at, art_products(file_url, title)')
    .eq('token', token)
    .single()

  if (error || !dl) {
    return new NextResponse(
      '<h2 style="font-family:sans-serif;color:#e74c3c">Invalid or expired download link.</h2>',
      { status: 404, headers: { 'Content-Type': 'text/html' } }
    )
  }

  // 2. Check expiry
  if (new Date(dl.expires_at) < new Date()) {
    return new NextResponse(
      '<h2 style="font-family:sans-serif;color:#e74c3c">This download link has expired (72-hour window). Please contact saurabhgaur122000@gmail.com for assistance.</h2>',
      { status: 410, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const product = dl.art_products as any
  if (!product?.file_url) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  // 3. Extract path from Supabase Storage URL and create 1-hour signed URL
  // file_url format: https://<project>.supabase.co/storage/v1/object/public/art-files/<path>
  const urlParts = product.file_url.split('/storage/v1/object/public/art-files/')
  const filePath = urlParts[1]

  if (!filePath) {
    return NextResponse.json({ error: 'Invalid file path' }, { status: 500 })
  }

  const { data: signedData, error: signedError } = await supabase.storage
    .from('art-files')
    .createSignedUrl(filePath, 3600, {
      download: product.title ?? 'download',
    })

  if (signedError || !signedData?.signedUrl) {
    return NextResponse.json({ error: 'Failed to generate download URL' }, { status: 500 })
  }

  // 4. Mark token as used (first use only — subsequent downloads still work within 72hr)
  if (!dl.used_at) {
    await supabase
      .from('download_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', dl.id)
  }

  // 5. Redirect to signed URL
  return NextResponse.redirect(signedData.signedUrl)
}
