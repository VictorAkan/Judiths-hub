'use client';

import { useEffect, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/use-auth-store';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    // Get initial session
    supabase.auth.getSession().then((result: any) => {
      const session = result.data?.session;
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then((profileResult: any) => {
            const profile = profileResult.data;
            if (profile) {
              setUser({
                id: profile.id,
                email: profile.email,
                first_name: profile.first_name,
                last_name: profile.last_name,
                avatar_url: profile.avatar_url,
              });
            }
          });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: any, session: any) => {
        if (session?.user) {
          const profileResult = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileResult.data) {
            setUser({
              id: profileResult.data.id,
              email: profileResult.data.email,
              first_name: profileResult.data.first_name,
              last_name: profileResult.data.last_name,
              avatar_url: profileResult.data.avatar_url,
            });
          }
        } else {
          clearUser();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, clearUser]);

  return <>{children}</>;
}
