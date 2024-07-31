'use client';
import { tableType } from '@/types/mainType';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import React from 'react';

type feedTypeProps = {
  feedItem: tableType;
  key: number;
};
const WebFeedItem = ({ feedItem, key }: feedTypeProps) => {
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
  console.log(feedImage);
  return (
    <div key={key} className="w-full h-[150px] relative">
      <Image
        src={feedImage}
        alt="피드이미지"
        fill
        className="border rounded-2xl"
      />
      <div className="absolute bottom-6 left-3 felx flex-col text-[#fff]">
        <p>{feedItem.title}</p>
        <p>{feedItem.content}</p>
      </div>
    </div>
  );
};

export default WebFeedItem;
