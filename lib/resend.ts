import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY || 're_dummykey')

export const FROM_EMAIL = process.env.FROM_EMAIL ?? 'orders@saurabhgaur.world'

