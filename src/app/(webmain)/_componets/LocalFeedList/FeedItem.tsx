'use client';
import { TableFeedUserType } from '@/types/mainTypes';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
type feedTypeProps = {
  feedItem: TableFeedUserType;
};
function FeedItem({ feedItem }: feedTypeProps) {
  const router = useRouter();
  let feedImage = '/NoImg-v2.png';
  if (feedItem.image) {
    try {
      const parsedImage = JSON.parse(feedItem.image) as string;
      feedImage = Array.isArray(parsedImage) ? parsedImage[0] : parsedImage;
    } catch (error) {
      console.error('Failed to parse feed image:', error);
      showToast('error', '이미지를 불러오는 중 오류가 발생하였습니다.');
    }
  }
  const handleFeedMove = (Id: number) => {
    router.push(`/feed-detail/${Id}`);
  };
  return (
    <div className="w-full h-[336px] flex flex-col gap-4">
      <div
        className="w-[288px] h-[288px] cursor-pointer relative"
        onClick={() => handleFeedMove(feedItem.id)}
      >
        <Image
          src={feedImage}
          alt="피드이미지"
          width={288}
          height={288}
          className="border rounded-2xl object-cover w-full h-full
            
              "
        />
        <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-black/50 to-transparent rounded-xl"></div>
        <div className="absolute bottom-8 left-8 felx flex-col text-white z-1">
          <p className="line-clamp-1 text-sm">{feedItem.region}</p>
          <p className="line-clamp-1">{feedItem.title}</p>
        </div>
      </div>

      <div className="w-full flex gap-4 items-center">
        <div className="w-[32px] h-[32px] shrink-0">
          <Image
            src={feedItem.Users.profileImage || feedImage}
            alt="프로필이미지"
            width={32}
            height={32}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <div>
          <h1 className="line-clamp-1">{feedItem.Users.nickname}</h1>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
