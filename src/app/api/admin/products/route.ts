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
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ products: products ?? [] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to load products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await isAdminUser();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        compare_at_price: body.compare_at_price ?? null,
        condition: body.condition,
        sizes: body.sizes,
        images: body.images,
        material: body.material ?? null,
        category: body.category ?? null,
        style: body.style ?? null,
        in_stock: body.in_stock ?? true,
        featured: body.featured ?? false,
        eco_score: body.eco_score ?? 0,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to create product' },
      { status: 500 }
    );
  }
}
