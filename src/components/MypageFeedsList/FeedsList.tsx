import React, { useEffect, useState } from 'react';
import PostIcon from '@/components/IconList/PostIcon';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';
import useAuthStore from '@/zustand/useAuthStore';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import Link from 'next/link';

export default function FeedList({ userId }: { userId: string }) {
  const [feedsList, setFeedsList] = useState<Tables<'Feeds'>[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();
    const fetchFeeds = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('Feeds')
          .select('*')
          .eq('userId', userId);

        if (error) {
          showToast('error', '슈퍼베이스 불러오는중 오류가 발생했습니다');
          console.log(error.message);
        }
        if (!data) return;
        setFeedsList(data);
      } catch {}
    };

    fetchFeeds();
  }, [user?.id]);

  return (
    <div className="h-[calc((100svh_-_58px_-_92px)_*_0.7)] overflow-y-auto">
      {feedsList.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <PostIcon />
            <p className="mt-2">작성한 게시글이 없어요</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-0.5 w-full">
          {feedsList.map((post) => {
            const postImages = JSON.parse(post.image as string);

            return (
              <div key={post.id}>
                <Link href={`/feed-detail/${post.id}`}>
                  <Image
                    src={postImages ? postImages[0] : '/No_Img.jpg'}
                    alt="이미지"
                    width={200}
                    height={200}
                    priority
                    className="rounded aspect-square object-cover"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
