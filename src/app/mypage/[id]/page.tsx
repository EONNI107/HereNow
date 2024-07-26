'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

function MyPage() {
  const supabase = createClient();
  const [proflie, setProfile] = useState({ nickname: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await supabase.auth.getUser();
      console.log(user);
      if (user) {
        const { data, error } = await supabase
          .from('Users')
          .select('nickname, email')
          .eq('id', user.data.user?.id)
          .single();

        if (error) {
          console.error('에러', error.message);
        } else {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <div>마이 페이지</div>
      <div>프로필 이미지:</div>
      <div>닉네임: {proflie.nickname}</div>
      <div>이메일: {proflie.email}</div>
    </div>
  );
}

export default MyPage;
