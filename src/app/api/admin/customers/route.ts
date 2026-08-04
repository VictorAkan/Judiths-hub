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
    const { data: customers, error } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ customers: customers ?? [] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to load customers' },
      { status: 500 }
    );
  }
}
