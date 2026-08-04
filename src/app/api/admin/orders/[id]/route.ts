import { NextResponse } from 'next/server';
import { isAdminUser } from '@/lib/admin/index';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAdminUser();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('orders')
      .update({ status: body.status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ order: data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to update order' },
      { status: 500 }
    );
  }
}
