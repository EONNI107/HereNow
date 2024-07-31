'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import WebFeedItem from './WebFeedItem';
import { tableType } from '@/types/mainType';

function WebFeedSection() {
  const [feedItems, setFeedItems] = useState<tableType[]>([]);
  useEffect(() => {
    FeedData();
  }, []);
  const FeedData = async () => {
    const res = await axios.get('/api/supabase-feed');
    const items = res.data.data as tableType[];
    console.log(items);
    setFeedItems(items);
  };

  return (
    <section className="flex flex-col gap-4 w-full px-4 py-4">
      <div className="flex justify-between">
        <h2>지금 뜨고 있는 피드</h2>
        <button>더보러가기</button>
      </div>
      <div className="grid gap-4 grid-cols-2 grid-rows-2 w-full h-full">
        {feedItems.map((item) => (
          <WebFeedItem feedItem={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
export default WebFeedSection;
