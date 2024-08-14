import { Tables } from '@/types/supabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthUser = Omit<Tables<'Users'>, 'createdAt' | 'provider'>;
type AuthStore = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logOut: () => void;
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logOut: () => set({ user: null }),
    }),
    {
      name: 'user',
    },
  ),
);

export default useAuthStore;
