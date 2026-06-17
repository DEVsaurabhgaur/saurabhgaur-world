import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createServerClient } from '@/lib/supabase/server'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { generateToken, tokenExpiryDate } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    // 1. Verify HMAC signature
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    const supabase = createServerClient()

    // 2. Update order status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({ status: 'paid', razorpay_payment_id })
      .eq('razorpay_order_id', razorpay_order_id)
      .select('id, buyer_email')
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // 3. Fetch order items + product file URLs
    const { data: orderItems } = await supabase
      .from('order_items')
      .select('product_id, art_products(title, file_url)')
      .eq('order_id', order.id)

    if (!orderItems?.length) {
      return NextResponse.json({ error: 'No order items found' }, { status: 404 })
    }

    // 4. Generate download tokens (one per product)
    const expiresAt = tokenExpiryDate()
    const tokens: { product_id: string; token: string; title: string }[] = []

    for (const item of orderItems) {
      const token = generateToken()
      await supabase.from('download_tokens').insert({
        order_id: order.id,
        product_id: item.product_id,
        token,
        expires_at: expiresAt,
        used_at: null,
      })
      tokens.push({
        product_id: item.product_id,
        token,
        title: (item.art_products as any)?.title ?? 'Art',
      })
    }

    // 5. Send fulfillment email
    const downloadLinks = tokens
      .map(
        (t) =>
          `<tr>
            <td style="padding:8px 0;color:#F0F0F0;font-size:14px">${t.title}</td>
            <td style="padding:8px 0;padding-left:24px">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/api/download?token=${t.token}" 
                 style="color:#E8593C;text-decoration:none;font-size:14px">
                Download →
              </a>
            </td>
          </tr>`
      )
      .join('')

    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.buyer_email,
      subject: 'Your download links — saurabhgaur.world',
      html: `
        <div style="background:#0A0A0A;padding:40px;font-family:sans-serif;max-width:560px;margin:0 auto">
          <h1 style="color:#F0F0F0;font-size:24px;margin-bottom:8px">Thank you for your purchase!</h1>
          <p style="color:#888;margin-bottom:24px;font-size:14px">
            Your download links are valid for <strong style="color:#F0F0F0">72 hours</strong>.
          </p>
          <table style="width:100%;border-collapse:collapse">
            ${downloadLinks}
          </table>
          <hr style="border:none;border-top:1px solid #222;margin:32px 0" />
          <p style="color:#555;font-size:12px">
            Order ID: ${razorpay_order_id}<br/>
            Questions? Email saurabhgaur122000@gmail.com
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, order_id: order.id })
  } catch (err: any) {
    console.error('[verify]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
