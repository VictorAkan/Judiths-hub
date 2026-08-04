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

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const ordersWithItems = await Promise.all(
      (orders ?? []).map(async (order) => {
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('email, first_name, last_name')
          .eq('id', order.user_id)
          .single();
        return { ...order, items: items ?? [], customer: profile ?? null };
      })
    );

    return NextResponse.json({ orders: ordersWithItems });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to load orders' },
      { status: 500 }
    );
  }
}
