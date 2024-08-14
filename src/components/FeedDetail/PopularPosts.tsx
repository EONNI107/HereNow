import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Post } from '@/types/post';
import { useRouter } from 'next/navigation';

const supabase = createClient();

type PostWithLikes = Post & {
  like_count?: number;
};

type PopularPostsProps = {
  userId: string;
  userNickname: string; // 유저 닉네임 추가
};

async function getPopularPosts(userId: string): Promise<PostWithLikes[]> {
  const { data: feeds, error: feedsError } = await supabase
    .from('Feeds')
    .select('id, title, image, region, sigungu, userId, content, createdAt')
    .eq('userId', userId);

  if (feedsError) {
    console.error('Error fetching feeds:', feedsError);
    return [];
  }

  const { data: likes, error: likesError } = await supabase
    .from('FeedLikes')
    .select('*')
    .in(
      'feedId',
      feeds.map((feed) => feed.id),
    );

  if (likesError) {
    console.error('Error fetching likes:', likesError);
    return [];
  }

  const likeCounts = feeds.reduce((acc, feed) => {
    const likeCount = likes.filter((like) => like.feedId === feed.id).length;
    acc[feed.id] = likeCount;
    return acc;
  }, {} as Record<number, number>);

  const postsWithLikes = feeds.map((feed) => {
    return {
      ...feed,
      image: feed.image ? JSON.parse(feed.image) : [],
      region: feed.region || '',
      sigungu: feed.sigungu || '',
      like_count: likeCounts[feed.id] || 0,
    };
  });

  postsWithLikes.sort((a, b) => (b.like_count || 0) - (a.like_count || 0));

  return postsWithLikes.slice(0, 4);
}

function PopularPosts({ userId, userNickname }: PopularPostsProps) {
  // userNickname 사용
  const [popularPosts, setPopularPosts] = useState<PostWithLikes[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularPosts = async () => {
      const posts = await getPopularPosts(userId);
      setPopularPosts(posts);
    };

    fetchPopularPosts();
  }, [userId]);

  return (
    <div className="mt-8">
      <hr className="border-gray-300" />
      <h3 className="text-lg font-semibold mt-4 mx-[16px]">
        {userNickname}님의 인기글이에요 {/* 헤더 변경 */}
      </h3>
      <button
        onClick={() => router.push(`/my-page/${userId}`)}
        className="text-blue4 mt-2 border-blue4 border-[1px] rounded-[16px] px-4 py-2"
      >
        프로필 보기
      </button>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {popularPosts.map((post) => (
          <div
            key={post.id}
            className="relative w-full h-40 bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url(${post.image[0] || ''})` }}
            onClick={() => router.push(`/feed-detail/${post.id}`)}
          >
            <div className="bg-black bg-opacity-20 text-white p-2 w-full h-full">
              <p className="text-sm">
                {post.region} {post.sigungu}
              </p>
              <p className="text-sm font-bold">{post.title}</p>
              <p className="text-xs">좋아요 {post.like_count}개</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularPosts;
