import React, { useEffect, useState } from 'react';
import PostIcon from '../IconList/PostIcon';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';
import useAuthStore from '@/zustand/useAuthStore';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import Link from 'next/link';

export default function FeedList() {
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
          .eq('userId', user.id);

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
    <div>
      {feedsList.length === 0 ? (
        <div className="flex flex-col items-center h-full justify-center">
          <PostIcon />
          <p className="mt-2">작성한 게시글이 없어요</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {feedsList.map((post) => {
            const postImages = JSON.parse(post.image as string);

            return (
              <div key={post.id}>
                {postImages && postImages.length > 0 && (
                  <Link href={`/feed-detail/${post.id}`}>
                    <Image
                      src={postImages[0]}
                      alt="이미지"
                      width={200}
                      height={200}
                      className="rounded aspect-square object-cover"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
