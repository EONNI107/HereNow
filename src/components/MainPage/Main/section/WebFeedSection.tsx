'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function WebFeedSection() {
  const [feedItems, setFeedItems] = useState([]);
  useEffect(() => {
    FeedData();
  }, []);
  const FeedData = async () => {
    const res = await axios.get('/api/supabase-feed');
    const items = res.data.data;
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
        {feedItems.map((feedItem) => (
          <div key={feedItem.id} className="w-full h-[170px] relative">
            {/* <Image
              src={}
              alt="피드이미지"
              width={150}
              height={150}
              className="relative"
            /> */}
            <div className="absolute bottom-0">
              <p>{feedItem.title}</p>
              <p>{feedItem.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default WebFeedSection;
