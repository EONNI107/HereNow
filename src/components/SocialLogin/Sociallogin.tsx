'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import useAuthStore from '@/zustand/useAuthStore';

function SocialLogin() {
  const supabase = createClient();
  const { setUser } = useAuthStore();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      const userInfo = {
        id: user.id,
        email: user.user_metadata.email,
        nickname: user.user_metadata.nickname || user.user_metadata.name,
        profileImage: user.user_metadata.profileImage,
      };
      setUser(userInfo);
    };
    getUser();
  }, []);
  return null;
}

export default SocialLogin;
