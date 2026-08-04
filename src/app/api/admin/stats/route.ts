import { NextResponse } from 'next/server';
import { isAdminUser } from '@/lib/admin/index';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const isAdmin = await isAdminUser();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    const [
      productsRes,
      ordersRes,
      usersRes,
      wishlistsRes,
      pendingRes,
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact' }),
      supabase.from('orders').select('*', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact' }),
      supabase.from('wishlists').select('id', { count: 'exact' }),
      supabase.from('orders').select('*', { count: 'exact' }).eq('status', 'pending'),
    ]);

    const orders = ordersRes.data ?? [];
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    return NextResponse.json({
      stats: {
        products: productsRes.count ?? 0,
        orders: ordersRes.count ?? 0,
        users: usersRes.count ?? 0,
        wishlists: wishlistsRes.count ?? 0,
        pendingOrders: pendingRes.count ?? 0,
        revenue: totalRevenue,
      },
      recentOrders: orders.slice(0, 6),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to load dashboard data' },
      { status: 500 }
    );
  }
}
