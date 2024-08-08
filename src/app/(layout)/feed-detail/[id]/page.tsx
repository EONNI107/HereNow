'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Post } from '@/types/post';
import Comments from '@/components/FeedDetail/Comments';
import DetailLikeBtn from '@/components/FeedDetail/DetailLikeBtn';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import useAuthStore from '@/zustand/useAuthStore';
import { formatDate } from '@/utils/formatDate';
import { toast } from 'react-toastify';
import DeletePrompt from '@/components/DeletePrompt';

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

function PostPage({ params }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const { user } = useAuthStore();
  const router = useRouter();

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
    post.userProfile?.profileImage || '/default-profile.jpg';
  const userNickname = post.userProfile?.nickname || '알 수 없음';

  const handleEdit = () => {
    if (!user || user.id !== post.userId) {
      toast.error('수정 권한이 없습니다.');
      return;
    }

    const queryParams = new URLSearchParams({
      id: String(post.id),
      title: post.title,
      content: post.content,
      region: post.region,
      sigungu: post.sigungu,
      image: JSON.stringify(post.image),
    });

    router.replace(`/feed-write?${queryParams.toString()}`);
  };

  const handleDelete = async () => {
    toast(<DeletePrompt onConfirm={performDelete} />, {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };

  const performDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase.from('Feeds').delete().eq('id', post.id);

    if (error) {
      console.error('Delete Post Error:', error);
      toast.error('피드 삭제에 실패하였습니다.');
    } else {
      toast.success('피드가 성공적으로 삭제되었습니다.');
      router.replace('/feed');
    }
  };

  const isAuthor = user?.id === post.userId;

  return (
    <div className="bg-gray0 pb-5">
      <div className="flex items-center justify-between h-14 mt-2 px-4">
        <div className="flex items-center">
          <Image
            src={userProfileImage}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full mr-2"
          />
          <p className="font-semibold text-sm">{userNickname}</p>
        </div>
        <button className="font-semibold text-sm text-white bg-orange3 px-3 py-1.5 rounded-lg">{`${post.region} ${post.sigungu}`}</button>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Image ${index}`}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <DetailLikeBtn
        postId={post.id}
        userId={user?.id ?? ''}
        onCommentClick={() => setIsCommentModalOpen(true)}
        commentCount={commentCount}
      />
      <div className="mx-4 mb-5 px-4 py-2.5 bg-white rounded-3xl">
        <p className="text-2xl font-bold mb-2">{post.title}</p>
        <p className="text-sm text-gray-500 mb-2">
          {formatDate(post.createdAt)}
        </p>
        <p className="text-base font-normal">{post.content}</p>
      </div>
      {isAuthor && (
        <div className="flex space-x-4 ml-7">
          <button
            onClick={handleEdit}
            className="btn border-2 border-blue4 text-blue4 font-semibold text-sm bg-transparent px-4 py-2 rounded-md hover:bg-blue4 hover:text-white transition-colors duration-300"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="btn border-2 border-blue4 text-blue4 font-semibold text-sm bg-transparent px-4 py-2 rounded-md hover:bg-blue4 hover:text-white transition-colors duration-300"
          >
            삭제하기
          </button>
        </div>
      )}
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
}

export default PostPage;
