'use client';
import { TableFeedUserType } from '@/types/mainType';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import React from 'react';

type feedTypeProps = {
  feedItem: TableFeedUserType;
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
  return (
    <>
      <div key={key} className="w-full h-[170px] flex flex-col">
        <div className="w-full h-[150px] relative">
          <Image
            src={feedImage}
            alt="피드이미지"
            fill
            className="border rounded-2xl"
          />
        </div>
        <div className="absolute bottom-6 left-3 felx flex-col text-[#fff] z-1">
          <p>{feedItem.title}</p>
          <p>{feedItem.content}</p>
        </div>
        <div className="w-full flex mt-2">
          <div className="w-[25px] h-[25px] relative">
            <Image
              src={`/${feedItem.Users.profileImage}`}
              alt="프로필이미지"
              fill
              className="rounded-full"
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
