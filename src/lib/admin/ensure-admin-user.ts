import { createAdminClient } from '@/lib/supabase/admin';

export async function ensureAdminUser() {
  const supabase = createAdminClient();

  // Check if the admin user already exists
  const { data, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listError) throw new Error(`Failed to check admin user: ${listError.message}`);

  const users = (data as any)?.users ?? [];
  const existing = (users as any[]).find(
    (u: any) => u.email?.toLowerCase() === 'superadmin234@gmail.com'
  );

  if (existing) return existing;

  // Create the admin user with the dedicated password
  const result = await supabase.auth.admin.createUser({
    email: 'superadmin234@gmail.com',
    password: process.env.ADMIN_PASSWORD!,
    email_confirm: true,
    user_metadata: { first_name: 'Admin', last_name: 'JudithsHub' },
  });

  if (result.error) {
    throw new Error(`Failed to create admin user: ${result.error.message}`);
  }

  return result.data.user;
}
