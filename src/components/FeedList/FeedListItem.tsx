import { Feed } from '@/types/feed';
import Image from 'next/image';
import { fromNow } from '@/utils/formatDate';
import { showToast } from '@/utils/toastHelper';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import HeartIconSolid from './HeartIconSolid';
import { useRouter } from 'next/navigation';

function FeedListItem({
  feed,
  likesCount,
  commentsCount,
  userId,
}: {
  feed: Feed;
  likesCount: number;
  commentsCount: number;
  userId: string | null;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!userId) return;

      try {
        const { data, error } = await supabase
          .from('FeedLikes')
          .select('id')
          .eq('feedId', feed.id)
          .eq('userId', userId)
          .maybeSingle();

        if (error) {
          console.error('Error checking like status:', error);
        } else {
          setIsLiked(!!data);
        }
      } catch (err) {
        console.error('Error in checkLikeStatus:', err);
      }
    };

    checkLikeStatus();
  }, [feed.id, userId, supabase]);
  let feedImage = '/NoImg-v2.png';

  if (feed.image) {
    try {
      const parsedImage = JSON.parse(feed.image);
      feedImage = Array.isArray(parsedImage) ? parsedImage[0] : parsedImage;
    } catch (error) {
      console.error('Failed to parse feed image:', error);
      showToast('error', '이미지를 불러오는 중 오류가 발생했습니다.');
    }
  }

  const handleMoveFeedDetail = () => {
    router.push(`/feed-detail/${feed.id}`);
  };

  return (
    <div className="xl:flex xl:flex-col xl:h-full p-4 rounded-3xl">
      <div className="xl:flex xl:flex-col xl:h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Image
              src={feed.Users?.profileImage || '/default-profile.jpg'}
              alt="유저 프로필 이미지"
              width={48}
              height={48}
              className="w-6 h-6 xl:w-12 xl:h-12 border rounded-full mr-4"
            />
            <span className="text-[14px] xl:text-[20px] font-regular">
              {feed.Users?.nickname}
            </span>
          </div>
          <span className="text-[12px] xl:text-[15px] text-sub2 xl:ml-auto xl:pl-4">
            {fromNow(feed.createdAt)}
          </span>
        </div>
        <div
          className="relative w-full h-48  xl:h-[400px] overflow-hidden border rounded-3xl xl:rounded-[32px] group cursor-pointer"
          onClick={handleMoveFeedDetail}
        >
          <Image
            src={feedImage}
            alt="피드 썸네일"
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-[28px] font-semibold text-center">
              {feed.region && <span>{feed.region}</span>}
              {feed.region && feed.sigungu && ' '}
              {feed.sigungu && <span>{feed.sigungu}</span>}
            </p>
          </div>
        </div>
        <div className="p-4 xl:flex-grow xl:flex xl:flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="line-clamp-1 text-main text-[18px] font-semibold xl:text-[22px] xl:font-medium">
              {feed.title}
            </h2>
            <div className="flex items-center space-x-3 text-xs text-sub1 xl:hidden">
              <div className="flex items-center space-x-1">
                {isLiked ? (
                  <HeartIconSolid />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{likesCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                <span>{commentsCount}</span>
              </div>
            </div>
          </div>
          <div className="hidden xl:block xl:flex-grow">
            <p className="line-clamp-1 font-medium text-sub1 text-[18px] mb-2">
              {feed.content}
            </p>
            <div
              onClick={handleMoveFeedDetail}
              className="text-orange4 font-semibold cursor-pointer"
            >
              더보기
            </div>
          </div>
          <div className="hidden xl:flex items-center space-x-3  text-sub1 mt-4">
            <div className="flex items-center space-x-1">
              {isLiked ? <HeartIconSolid /> : <HeartIcon className="w-8 h-8" />}
              <span className="font-medium text-[20px]">{likesCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
              <span className="font-medium text-[20px]">{commentsCount}</span>
            </div>
          </div>
          <p className="block xl:hidden text-[14px] font-semibold text-sub2 ">
            {feed.region && <span>{feed.region}</span>}
            {feed.region && feed.sigungu && ' '}
            {feed.sigungu && <span>{feed.sigungu}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeedListItem;
