import { createServerClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Order } from '@/types/order'

export const revalidate = 0

export default async function AdminOrdersPage() {
  const supabase = createServerClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(product_id, price_at_purchase, art_products(title))')
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <div>
      <h1 className="text-3xl font-display tracking-wide mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        ORDERS
      </h1>

      {!orders?.length ? (
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {order.buyer_email}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {order.razorpay_order_id}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {new Date(order.created_at).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-mono font-semibold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(order.amount_inr)}
                  </p>
                  <span
                    className="inline-block mt-1 text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      background: order.status === 'paid' ? 'rgba(34,197,94,0.1)' : order.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                      color: order.status === 'paid' ? '#22C55E' : order.status === 'pending' ? '#F59E0B' : '#ef4444',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              {order.order_items?.length > 0 && (
                <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex flex-wrap gap-2">
                    {order.order_items.map((item: any) => (
                      <span
                        key={item.product_id}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                      >
                        {item.art_products?.title ?? item.product_id} — {formatPrice(item.price_at_purchase)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
