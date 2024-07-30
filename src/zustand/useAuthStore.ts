import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
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
