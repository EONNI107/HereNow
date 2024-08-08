import { createClient } from '@/utils/supabase/client';
import { showToast } from '@/utils/toastHelper';
import { useEffect } from 'react';
import useAuthStore from '@/zustand/useAuthStore';

function CheckLoginUser() {
  const supabase = createClient();
  const { user, setUser, logOut } = useAuthStore();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log(data.user?.id);

    if (error) {
      showToast('error', '사용자를 가져오는 중에 오류가 발생했습니다.');
      return;
    }
    if (data.user) {
      console.log('User ID:', data.user.id);

      const { data: userData, error: userError } = await supabase
        .from('Users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        showToast('error', '사용자를 가져오는 중에 오류가 발생했습니다.');
        return;
      }
      if (userData) {
        console.log(userData);

        setUser(userData);
        showToast('success', '사용자 정보가 업데이트되었습니다.');
      }
    } else {
      logOut();
      showToast('success', '로그아웃되었습니다');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return null;
}

export default CheckLoginUser;
