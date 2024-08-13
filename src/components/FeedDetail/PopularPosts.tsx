import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

// Post 타입 정의
type Post = {
  id: number;
  title: string;
  image: string[];
  region: string | null;
  sigungu: string | null;
};

type PopularPostsProps = {
  userId: string;
  userNickname: string;
};

// RPC 호출로부터 데이터를 가져오는 함수
const fetchUserPopularPosts = async (userId: string): Promise<Post[]> => {
  const supabase = createClient();

  // get_popular_posts RPC 호출
  const { data, error } = await supabase.rpc('get_popular_posts', {
    user_id: userId,
  });

  if (error) {
    console.error('Error fetching popular posts:', error);
    return [];
  }

  if (!data || !Array.isArray(data)) {
    console.error('Data is not an array');
    return [];
  }

  // 데이터를 Post 타입으로 변환
  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    image: Array.isArray(post.image) ? post.image : [],
    region: post.region,
    sigungu: post.sigungu,
  }));
};

const PopularPosts: React.FC<PopularPostsProps> = ({
  userId,
  userNickname,
}) => {
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchUserPopularPosts(userId);
      setPopularPosts(posts);
    };

    fetchData();
  }, [userId]);

  return (
    <div className="popular-posts mt-8">
      <hr className="border-gray-300" />
      <h3 className="text-lg font-semibold mt-4">
        {userNickname}님의 인기글이에요
      </h3>
      <button
        onClick={() => router.push(`/my-page/${userId}`)}
        className="text-blue4 mt-2 border-blue4 border-[1px] rounded-[16px]"
      >
        프로필 보기
      </button>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {popularPosts.map((post) => (
          <div
            key={post.id}
            className="relative w-full h-40 bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url(${post.image[0]})` }}
            onClick={() => router.push(`/feed-detail/${post.id}`)}
          >
            <div className="bg-black bg-opacity-20 text-white p-2 w-full h-full">
              <p className="text-sm">
                {post.region} {post.sigungu}
              </p>
              <p className="text-sm font-bold">{post.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
