'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import WebFeedItem from '@/components/MainPage/Main/Sections/WebFeedItem';
import { TableFeedUserType } from '@/types/mainTypes';
import SkeletonFeedItem from '@/components/MainPage/Skeleton/SkeletonFeedItem';
import { useRouter } from 'next/navigation';

function WebFeedSection() {
  const router = useRouter();

  const [feedItems, setFeedItems] = useState<TableFeedUserType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    feedUserDatas();
  }, []);
  const feedUserDatas = async () => {
    const res = await axios.get('/api/supabase-feeduserdata');
    const items = res.data.data as TableFeedUserType[];
    setFeedItems(items);
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col gap-4 w-full px-4 py-4 mb-6">
      <div className="flex justify-between">
        <h2 className="text-main font-semibold text-lg">인기 있는 피드</h2>
        <button
          className="text-main font-regular text-sm"
          onClick={() => router.push('/feed')}
        >
          더보러가기
        </button>
      </div>
      <div className="grid gap-4 grid-cols-2 grid-rows-2 w-full h-full">
        {isLoading
          ? Array.from({ length: 4 }).map((_: unknown, index) => (
              <SkeletonFeedItem key={index} />
            ))
          : feedItems?.map((item) => (
              <WebFeedItem feedItem={item} key={item.id} />
            ))}
      </div>
    </section>
  );
}
export default WebFeedSection;
