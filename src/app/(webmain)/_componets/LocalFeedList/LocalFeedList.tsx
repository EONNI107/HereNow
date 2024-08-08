'use client';
import React, { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import FeedBar from './FeedBar';
import { TableFeedUserType } from '@/types/mainTypes';
import axios from 'axios';

function LocalFeedList() {
  const [feedItems, setFeedItems] = useState<TableFeedUserType[] | null>([]);
  useEffect(() => {
    feedUserDatas();
  }, []);
  const feedUserDatas = async () => {
    const res = await axios.get('/api/supabase-feeduserdata');
    const items = res.data.data as TableFeedUserType[];
    setFeedItems(items);
  };

  return (
    <div className="flex flex-col gap-9">
      <FeedBar title="가장 인기있는" content="핫한 로컬들의 피드" url="/feed" />
      <div className="grid grid-cols-4 grid-rows-2 gap-7">
        {feedItems?.map((item) => (
          <FeedItem feedItem={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default LocalFeedList;
