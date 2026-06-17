export type OrderStatus = 'pending' | 'paid' | 'failed'

export type Order = {
  id: string
  buyer_email: string
  razorpay_order_id: string
  razorpay_payment_id: string | null
  amount_inr: number
  status: OrderStatus
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  price_at_purchase: number
}

export type DownloadToken = {
  id: string
  order_id: string
  product_id: string
  token: string
  expires_at: string
  used_at: string | null
}

export type CartItem = {
  id: string
  title: string
  thumbnail_url: string
  price_inr: number
}
