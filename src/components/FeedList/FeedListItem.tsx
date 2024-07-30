import React from 'react';
import { Feed } from '@/types/feed';
import Image from 'next/image';
import { fromNow } from '@/utils/formatDate';

function FeedListItem({ feed }: { feed: Feed }) {
  return (
    <div className="p-4 border rounded-3xl">
      <div className="flex items-center mb-4">
        <Image
          src={'/'}
          alt="유저 아바타"
          width={100}
          height={100}
          className="w-12 h-12 border rounded-full mr-4"
        />
        <span className="text-[14px] font-regular">닉네임</span>
      </div>
      <div className="relative h-48">
        <Image
          src={`/${feed.image}`}
          alt="피드 썸네일"
          width={300}
          height={200}
          className="object-cover w-full h-48 border rounded-3xl"
        />
      </div>
      <div className="p-4">
        <h2 className="text-[#212125] text-[18px] font-semibold mb-2">
          {feed.title}
        </h2>
        <p className="text-[14px] text-[#767676] mb-2">{feed.content}</p>
        <div className="flex items-center justify-between text-xs text-[#505050]">
          <span>{fromNow(feed.createdAt)}</span>
          <div className="flex items-center space-x-2">
            <span>좋아요 0</span>
            <span>댓글 0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedListItem;
