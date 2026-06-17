import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'saurabhgaur122000@gmail.com',
      reply_to: email,
      subject: subject ? `[Contact] ${subject}` : `[Contact] Message from ${name}`,
      html: `
        <div style="background:#0A0A0A;padding:40px;font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#F0F0F0;font-size:20px;margin-bottom:16px">New contact message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#888;font-size:13px;width:80px">From</td>
                <td style="padding:6px 0;color:#F0F0F0;font-size:13px">${name} &lt;${email}&gt;</td></tr>
            ${subject ? `<tr><td style="padding:6px 0;color:#888;font-size:13px">Subject</td>
                <td style="padding:6px 0;color:#F0F0F0;font-size:13px">${subject}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #222;margin:20px 0" />
          <p style="color:#F0F0F0;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
