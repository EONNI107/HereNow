'use client';
import { TableFeedUserType } from '@/types/mainType';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type feedTypeProps = {
  feedItem: TableFeedUserType;
};
const WebFeedItem = ({ feedItem }: feedTypeProps) => {
  const router = useRouter();
  let feedImage = '/No_Img.jpg';
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
    <>
      <div className="flex flex-col items-center">
        <div
          className="w-[150px] h-[150px] relative cursor-pointer"
          onClick={() => handleFeedMove(feedItem.id)}
        >
          <Image
            src={feedImage}
            alt="피드이미지"
            width={150}
            height={150}
            className="border rounded-2xl object-cover w-full h-full"
          />
          <div className="absolute bottom-3 left-3 felx flex-col text-[#fff] z-1">
            <p className="line-clamp-1 text-sm">{feedItem.region}</p>
            <p className="line-clamp-1">{feedItem.title}</p>
          </div>
        </div>

        <div className="w-full flex mt-2 ml-8 gap-1">
          <div className="w-[25px] h-[25px]">
            <Image
              src={feedItem.Users.profileImage || feedImage}
              alt="프로필이미지"
              width={25}
              height={25}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <div>
            <h1>{feedItem.Users.nickname}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebFeedItem;
