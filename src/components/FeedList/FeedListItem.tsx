import React from 'react';
import { Feed } from '@/types/feed';
import Image from 'next/image';

function FeedListItem({ feed }: { feed: Feed }) {
  return (
    <div className="p-4 border rounded-3xl">
      <Image
        src={`${feed.image}`}
        alt="피드 썸네일"
        width={300}
        height={200}
        className="object-cover w-full h-48 border rounded-3xl"
      />
      <h2 className="text-xl font-semibold">{feed.title}</h2>
      <p className="text-gray-600">{feed.content}</p>
      <p className="text-sm text-gray-400">{feed.createdAt}</p>
    </div>
  );
}

export default FeedListItem;
