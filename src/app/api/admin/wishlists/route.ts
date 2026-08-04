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

    const { data: wishlists, error } = await supabase
      .from('wishlists')
      .select('id, user_id, product_id, created_at');

    if (error) throw error;

    const entries = await Promise.all(
      (wishlists ?? []).map(async (w) => {
        const [productRes, profileRes] = await Promise.all([
          supabase.from('products').select('id, name, price, images, condition').eq('id', w.product_id).single(),
          supabase
            .from('profiles')
            .select('email, first_name, last_name')
            .eq('id', w.user_id)
            .single(),
        ]);
        return {
          ...w,
          product: productRes.data ?? null,
          profile: profileRes.data ?? null,
        };
      })
    );

    return NextResponse.json({ entries });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to load wishlists' },
      { status: 500 }
    );
  }
}
