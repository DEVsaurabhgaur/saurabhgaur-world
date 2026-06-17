import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default async function AdminDashboard() {
  const supabase = createServerClient()

  const [{ count: productCount }, { count: orderCount }, { data: recentOrders }] =
    await Promise.all([
      supabase.from('art_products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'paid'),
      supabase
        .from('orders')
        .select('id, buyer_email, amount_inr, status, created_at, razorpay_order_id')
        .order('created_at', { ascending: false })
        .limit(5),
    ])

  const stats = [
    { label: 'Published Products', value: productCount ?? 0 },
    { label: 'Paid Orders', value: orderCount ?? 0 },
  ]

  return (
    <div>
      <h1
        className="text-3xl font-display tracking-wide mb-8"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        DASHBOARD
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="p-5 rounded-xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <p
              className="text-xs font-mono uppercase tracking-widest mb-2"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {label}
            </p>
            <p
              className="text-4xl font-display"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-10">
        <Link
          href="/admin/products"
          className="px-4 py-2.5 rounded text-sm font-medium text-white transition-all duration-150 hover:opacity-90"
          style={{ background: 'var(--accent)' }}
        >
          Manage Products
        </Link>
        <Link
          href="/admin/orders"
          className="px-4 py-2.5 rounded text-sm font-medium transition-all duration-150 hover:border-[#333] hover:text-[#F0F0F0]"
          style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        >
          View Orders
        </Link>
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="text-sm font-mono uppercase tracking-widest mb-4"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Recent Orders
        </h2>
        {!recentOrders?.length ? (
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No orders yet.</p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-4 py-3 rounded-lg"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {order.buyer_email}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {order.razorpay_order_id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(order.amount_inr)}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      background: order.status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      color: order.status === 'paid' ? '#22C55E' : '#ef4444',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
