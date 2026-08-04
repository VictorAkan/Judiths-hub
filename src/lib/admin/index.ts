import { createClient } from '@/lib/supabase/server';

export async function isAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;
  return user.email?.toLowerCase() === 'superadmin234@gmail.com';
}
