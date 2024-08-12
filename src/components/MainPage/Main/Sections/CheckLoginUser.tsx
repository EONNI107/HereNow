import { createClient } from '@/utils/supabase/client';
import { showToast } from '@/utils/toastHelper';
import { useEffect } from 'react';
import useAuthStore from '@/zustand/useAuthStore';

function CheckLoginUser() {
  const supabase = createClient();
  const { user, setUser, logOut } = useAuthStore();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from('Users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        return;
      }
      if (userData) {
        setUser(userData);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return null;
}

export default CheckLoginUser;
