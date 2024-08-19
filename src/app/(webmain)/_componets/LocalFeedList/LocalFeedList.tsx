'use client';
import React, { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import { TableFeedUserType } from '@/types/mainTypes';
import axios from 'axios';
import WebMainBar from '../WebMainBar';
import SkeletonWebFeed from '@/components/MainPage/Skeleton/SkeletonWebFeed';

function LocalFeedList() {
  const [feedItems, setFeedItems] = useState<TableFeedUserType[] | null>([]);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  useEffect(() => {
    feedUserDatas();
  }, []);
  const feedUserDatas = async () => {
    const res = await axios.get('/api/supabase-feeduserdata');
    const items = res.data.data as TableFeedUserType[];
    const sortedItems = items.sort(
      (a, b) => b.FeedLikes.length - a.FeedLikes.length,
    );
    setFeedItems(sortedItems);
    setIsSkeleton(false);
  };

  return (
    <div className="flex flex-col gap-9">
      <WebMainBar
        title="가장 인기있는"
        content="핫한 로컬들의 피드"
        url="/feed"
      />
      <div className="grid grid-cols-4 grid-rows-2 gap-7 max-xl:grid-cols-3">
        {isSkeleton
          ? Array.from({ length: 8 }).map((_: unknown, index) => (
              <SkeletonWebFeed key={index} />
            ))
          : feedItems?.map((item) => (
              <FeedItem feedItem={item} key={item.id} />
            ))}
      </div>
    </div>
  );
}

export default LocalFeedList;
