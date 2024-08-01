import React, { useEffect, useState } from 'react';
import PostIcon from '../IconList/PostIcon';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';
import useAuthStore from '@/zustand/useAuthStore';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import Link from 'next/link';

type LikedFeeds = Tables<'FeedLikes'> & { Feeds: Tables<'Feeds'> | null };

export default function FeedLikes() {
  const [feedLikes, setFeedLikes] = useState<LikedFeeds[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();
    const fetchFeedLikes = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('FeedLikes')
          .select('*,Feeds(*)')
          .eq('userId', user.id);

        if (error) {
          showToast('error', '슈퍼베이스 불러오는중 오류가 발생했습니다');
          console.log(error.message);
        }
        if (!data) return;
        setFeedLikes(data);
      } catch {}
    };

    fetchFeedLikes();
  }, [user?.id]);

  return (
    <>
      {feedLikes.length === 0 ? (
        <div className="flex flex-col items-center h-full justify-center">
          <PostIcon />
          <p className="mt-2">찜한 글이 없어요</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {feedLikes.map((like) => {
            const post = like.Feeds;
            const postImages = post?.image
              ? JSON.parse(post.image as string)
              : [];

            return (
              <div key={like.id}>
                {postImages.length > 0 && (
                  <Link href={`/feed-detail/${post?.id}`}>
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
    </>
  );
}
