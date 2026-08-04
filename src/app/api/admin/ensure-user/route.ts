import { NextResponse } from 'next/server';
import { ensureAdminUser } from '@/lib/admin/ensure-admin-user';

export const dynamic = 'force-dynamic';

// Ensures the admin user exists in Supabase auth. Called from the admin login
// page before the first sign-in attempt so the owner can log in immediately.
export async function GET() {
  try {
    const user = await ensureAdminUser();
    return NextResponse.json({ success: true, email: user.email });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to ensure admin user' },
      { status: 500 }
    );
  }
}
