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
  const supabase = createClient();
  useEffect(() => {
    const fetchFeeds = async () => {
      if (!user) return;
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
    };

    fetchFeeds();
  }, [user?.id]);

  return (
    <div className="h-[calc(100dvh-355px)] w-full overflow-y-auto">
      {feedsList.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <PostIcon />
            <p className="mt-2">작성한 게시글이 없어요</p>
          </div>
        </div>
      ) : (
        <div className="pt-4 flex flex-col gap-4">
          {feedsList.map((post) => {
            const postImages = JSON.parse(post.image as string);

            return (
              <Link
                href={`/feed-detail/${post.id}`}
                key={post.id}
                className="flex items-center space-x-4 align-it"
              >
                <Image
                  src={postImages ? postImages[0] : '/No_Img.jpg'}
                  alt="이미지"
                  width={100}
                  height={100}
                  priority
                  className="rounded-[8px] aspect-square object-cover"
                />
                <div className="items-baseline w-[100%] overflow-hidden">
                  <strong className="font-semibold">{post.title}</strong>
                  <div className="mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {post.content}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
