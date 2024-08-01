'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Post } from '@/types/post';
import Comments from '@/components/FeedDetail/Comments';
import DetailLikeBtn from '@/components/FeedDetail/DetailLikeBtn';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import dayjs from 'dayjs';
import Image from 'next/image';

async function fetchPost(id: string): Promise<Post | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('Feeds')
    .select(
      `
      *,
      Users (
        profileImage,
        nickname
      )
    `,
    )
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return {
    ...data,
    image: data.image ? JSON.parse(data.image) : [],
    region: data.region || '',
    sigungu: data.sigungu || '',
    userProfile: data.Users
      ? { profileImage: data.Users.profileImage, nickname: data.Users.nickname }
      : { profileImage: null, nickname: '알 수 없음' },
  };
}

async function fetchCommentCount(postId: number): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('FeedComments')
    .select('id', { count: 'exact', head: true })
    .eq('feedId', postId);

  if (error) {
    console.error(error);
    return 0;
  }

  return count || 0;
}

type PostPageProps = {
  params: { id: string };
};

const PostPage = ({ params }: PostPageProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const userId = '2596d4ff-f4e9-4875-a67c-22abc5fdacfa';

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchPost(params.id);
      if (fetchedPost) {
        setPost(fetchedPost);
      }

      const fetchedCommentCount = await fetchCommentCount(parseInt(params.id));
      setCommentCount(fetchedCommentCount);
    };

    fetchData();
  }, [params.id]);

  if (!post) {
    return <div>피드를 찾을 수 없습니다</div>;
  }

  const images = Array.isArray(post.image) ? post.image : [post.image];
  const userProfileImage =
    post.userProfile?.profileImage || '/path/to/default/avatar.png';
  const userNickname = post.userProfile?.nickname || '알 수 없음';

  return (
    <div className="container mx-auto relative">
      <div className="flex items-center justify-between py-1 px-1">
        <div className="flex items-center">
          <Image
            src={userProfileImage}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full mr-2"
          />
          <p className="font-semibold text-14px text-gray-600">
            {userNickname}
          </p>
        </div>
        <p className="font-semibold text-14px text-gray-600 text-right">{`${post.region} ${post.sigungu}`}</p>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mb-4"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Image ${index}`}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <DetailLikeBtn
        postId={post.id}
        userId={userId}
        onCommentClick={() => setIsCommentModalOpen(true)}
        commentCount={commentCount}
      />
      <p className="text-3xl font-bold mb-2">{post.title}</p>
      <p className="text-sm text-gray-500 mb-4">
        {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
      </p>
      <p className="text-16px mb-4">{post.content}</p>
      {isCommentModalOpen && (
        <div className="fixed inset-0 z-50">
          <Comments
            postId={post.id}
            onClose={() => setIsCommentModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default PostPage;
