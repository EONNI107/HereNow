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
import FeedDetailSkeleton from '@/components/FeedDetail/FeedDetailSkeleton';
import PopularPosts from '@/components/FeedDetail/PopularPosts';

import regionsData from '@/data/regions.json';

type Sigungu = {
  rnum: number;
  code: string;
  name: string;
};

type Region = {
  rnum: number;
  code: string;
  name: string;
  ename: string;
  image: string;
  sigungu: Sigungu[];
};

type RegionsData = {
  region: Region[];
};

const regions: RegionsData = regionsData as RegionsData;

const supabase = createClient();

async function fetchPost(id: string): Promise<Post | null> {
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
      ? {
          profileImage: data.Users.profileImage,
          nickname: data.Users.nickname ?? '알 수 없음',
        }
      : { profileImage: null, nickname: '알 수 없음' },
  };
}

async function fetchCommentCount(postId: number): Promise<number> {
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
  const [commentCount, setCommentCount] = useState(0);
  const { user } = useAuthStore();
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

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

  const incrementCommentCount = () => {
    setCommentCount((prevCount) => prevCount + 1);
  };

  const decrementCommentCount = () => {
    setCommentCount((prevCount) => prevCount - 1);
  };

  if (!post) {
    return <FeedDetailSkeleton />;
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
    toast(<DeletePrompt onConfirm={performDelete} isComment={false} />, {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };

  const performDelete = async () => {
    const { error } = await supabase.from('Feeds').delete().eq('id', post.id);

    if (error) {
      console.error('Delete Post Error:', error);
      toast.error('피드 삭제에 실패하였습니다.');
    } else {
      toast.success('피드가 성공적으로 삭제되었습니다.');
      router.replace('/feed');
    }
  };

  const handleRegionClick = () => {
    const regionData = regions.region.find(
      (region) => region.name === post.region,
    );
    const englishRegionName = regionData ? regionData.ename : '';

    if (englishRegionName) {
      router.push(`/local/${englishRegionName}`);
    } else {
      toast.error('해당 지역의 영어 이름을 찾을 수 없습니다.');
    }
  };

  const isAuthor = user?.id === post.userId;

  return (
    <div className="min-h-screen bg-gray0 pb-5">
      {isDesktop ? (
        <div className="xl:px-[17.7vw] xl:pt-[1.7vw]">
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

          <div className="xl:flex xl:space-x-[2.1vw] mt-[3.3vw]">
            <div className="flex flex-col xl:w-[41.7vw]">
              <button
                onClick={handleRegionClick}
                className="font-medium text-[1vw] text-white bg-orange3 px-[0.8vw] py-[0.4vw] rounded-[12px] self-start w-[10.7vw] h-[2.4vw] hover:bg-orange4 hover:text-white transition-colors duration-300"
              >
                {`${post.region} ${post.sigungu}`}
              </button>
              <div className="flex justify-between">
                <p className="text-[2.5vw] font-medium mt-[2.5vw]">
                  {post.title}
                </p>
                {isAuthor && (
                  <div className="flex space-x-4 ml-[16px] items-end">
                    <button
                      onClick={handleEdit}
                      className="btn border-[1px] border-blue4 text-white font-semibold text-[1vw] bg-blue4 rounded-md hover:bg-blue5 hover:text-white transition-colors duration-300 w-[5vw] h-[2.5vw]"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn border-[1px] border-blue4 text-blue4 font-semibold text-[1vw] bg-gray1 rounded-md hover:bg-gray2 hover:text-blue4 transition-colors duration-300 w-[5vw] h-[2.5vw]"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {formatDate(post.createdAt)}
              </p>
              <p className="text-[1vw] font-normal mt-[1.3vw]">
                {post.content}
              </p>
              <hr className="border-t border-gray6 my-[2.5vw]" />
              <div className="flex">
                <DetailLikeBtn
                  postId={post.id}
                  userId={user?.id ?? ''}
                  onCommentClick={() => {}}
                  commentCount={commentCount}
                />
              </div>
              <Comments
                postId={post.id}
                onClose={() => {}}
                onCommentAdded={incrementCommentCount}
                onCommentRemoved={decrementCommentCount}
              />
            </div>

            <div className="flex flex-col xl:w-[21vw]">
              <div className="bg-blue1 p-[0.8vw] rounded-[18px] shadow">
                <div className="flex items-center p-[0.4vw]">
                  <Image
                    src={userProfileImage}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-[3.8vw] h-[3.8vw] rounded-full"
                  />
                  <p className="pl-[1.6vw] text-[1.2vw] font-semibold">
                    {userNickname}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => router.push(`/profile/${post.userId}`)}
                    className="text-gray0 font-medium text-[1.2vw] bg-blue4 w-full h-[3.2vw] rounded-[16px] mt-[1.3vw] hover:bg-blue5 hover:text-white transition-colors duration-300"
                  >
                    프로필 구경하기
                  </button>
                </div>
              </div>
              <PopularPosts userId={post.userId} userNickname={userNickname} />
            </div>
          </div>
        </div>
      ) : (
        <div>
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
            <button
              onClick={handleRegionClick}
              className="font-semibold text-sm text-white bg-orange3 px-3 py-1.5 rounded-lg hover:bg-orange4 hover:text-white transition-colors duration-300"
            >
              {`${post.region} ${post.sigungu}`}
            </button>
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
            <div className="flex space-x-4 mr-[16px] justify-end">
              <button
                onClick={handleEdit}
                className="btn border-[1px] border-blue4 text-white font-semibold text-sm bg-blue4 w-[48px] h-[28px] rounded-lg hover:bg-blue5 hover:text-white transition-colors duration-300"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="btn border-[1px] border-blue4 text-blue4 font-semibold text-sm bg-gray1 w-[48px] h-[28px] rounded-lg hover:bg-gray2 hover:text-blue4 transition-colors duration-300"
              >
                삭제
              </button>
            </div>
          )}
          {isCommentModalOpen && (
            <div className="fixed inset-0 z-50">
              <Comments
                postId={post.id}
                onClose={() => setIsCommentModalOpen(false)}
                onCommentAdded={incrementCommentCount}
                onCommentRemoved={decrementCommentCount}
              />
            </div>
          )}
          <PopularPosts userId={post.userId} userNickname={userNickname} />
        </div>
      )}
    </div>
  );
}

export default PostPage;
