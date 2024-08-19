import React, { useEffect, useState } from 'react';
import PostIcon from '@/components/IconList/PostIcon';
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
  const supabase = createClient();

  useEffect(() => {
    const fetchFeedLikes = async () => {
      if (!user) return;

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
    };

    fetchFeedLikes();
  }, [user?.id]);

  return (
    <div className="h-[calc(100dvh-355px)] w-full overflow-y-auto">
      {feedLikes.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <PostIcon />
            <p className="mt-2">찜한 글이 없어요</p>
          </div>
        </div>
      ) : (
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
          {feedLikes.map((like) => {
            const post = like.Feeds;
            const postImages = post?.image
              ? JSON.parse(post.image as string)
              : [];
            return (
              <Link
                href={`/feed-detail/${like.id}`}
                key={like.id}
                className="flex items-center space-x-4 p-4 transition-shadow duration-200"
              >
                <Image
                  src={postImages.length > 0 ? postImages[0] : '/NoImg-v3.png'}
                  alt="이미지"
                  width={100}
                  height={100}
                  className="rounded-[8px] object-cover w-[100px] h-[100px] xl:w-[190px] xl:h-[120px]"
                  priority
                />
                <div className="flex-1 min-w-0 xl:w-full">
                  <strong className="font-semibold text-lg xl:text-2xl block mb-2 truncate">
                    {like.Feeds?.title}
                  </strong>
                  <p className="text-sub1 xl:text-lg line-clamp-2 xl:line-clamp-1">
                    {like.Feeds?.content}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
