import React, { useEffect, useState } from 'react';
import PostIcon from '../IconList/PostIcon';
import { createClient } from '@/utils/supabase/client';
import { Database, Tables } from '@/types/supabase';
import useAuthStore from '@/zustand/useAuthStore';
import { showToast } from '@/utils/toastHelper';

export default function FeedLikes() {
  const [feedLikes, setFeedLikes] = useState<Tables<'FeedLikes'>[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();
    const fetchFeedLikes = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('FeedLikes')
          .select('*')
          .eq('userId', user.id);

        if (error) {
          showToast('error', '슈퍼베이스 불러오는중 오류가 발생했습니다');
          console.log(error.message);
        }
        if (!data) return;
        setFeedLikes(data);
        console.log(data);
      } catch {}
    };

    fetchFeedLikes();
  }, [user?.id]);

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <PostIcon />
      <p className="mt-2">찜한 글이 없어요</p>
    </div>
  );
}
