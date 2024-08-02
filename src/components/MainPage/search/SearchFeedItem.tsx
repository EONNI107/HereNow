'use client';

import { TableFeedType } from '@/types/mainType';
import { showToast } from '@/utils/toastHelper';
import { HeartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type itemProps = {
  item: TableFeedType;
};
function SearchFeedItem({ item }: itemProps) {
  const router = useRouter();

  let feedImage = '/No_Img.jpg';
  if (item.image) {
    try {
      const parsedImage = JSON.parse(item.image) as string;
      feedImage = Array.isArray(parsedImage) ? parsedImage[0] : parsedImage;
    } catch (error) {
      console.error('Failed to parse feed image:', error);
      showToast('error', '피드이미지를 불러오는 중 오류가 발생하였습니다.');
    }
  }
  const handleMoveClick = (Id: number) => {
    router.push(`/feed-detail/${Id}`);
  };
  return (
    <div
      className="flex w-full cursor-pointer"
      onClick={() => handleMoveClick(item.id)}
    >
      <div className="w-[100px] h-[100px] relative">
        <Image
          src={feedImage}
          alt="해당피드이미지"
          fill
          className="rounded-lg border"
        />
      </div>
      <div className="flex justify-between w-[300px] items-center px-4">
        <div className="flex flex-col">
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
        <div>
          <HeartIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default SearchFeedItem;
