import React, { useEffect, useState } from 'react';
import PostIcon from '../IconList/PostIcon';
import { createClient } from '@/utils/supabase/client';
import { Database, Tables } from '@/types/supabase';
import useAuthStore from '@/zustand/useAuthStore';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';

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
          console.log(error.message);
        }
        if (error) {
          showToast('error', '슈퍼베이스 에러');
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
        <div className="flex flex-col items-center">
          <PostIcon />
          <p className="mt-2">작성한 게시글이 없어요</p>
        </div>
      ) : (
        feedsList.map((post) => {
          const postImages = JSON.parse(JSON.stringify(post.image));

          return (
            <div key={post.id} className="mb-4">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {postImages &&
                postImages.length > 0 &&
                postImages.map((image, index) => {
                  console.log(image);
                  return (
                    <Image
                      key={index}
                      src={image}
                      alt="이미지"
                      width={30}
                      height={30}
                    />
                  );
                })}
            </div>
          );
        })
      )}
    </div>
  );
}
