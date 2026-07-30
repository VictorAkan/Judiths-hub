import { create } from 'zustand';
import type { UserProfile } from '@/types/auth';

interface AuthState {
  userId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  isAuthenticated: boolean;

  setUser: (user: UserProfile | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  isAuthenticated: false,

  setUser: (user) => {
    if (user) {
      set({
        userId: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        isAuthenticated: true,
      });
    } else {
      set({
        userId: null,
        email: null,
        firstName: null,
        lastName: null,
        isAuthenticated: false,
      });
    }
  },

  clearUser: () =>
    set({
      userId: null,
      email: null,
      firstName: null,
      lastName: null,
      isAuthenticated: false,
    }),
}));
