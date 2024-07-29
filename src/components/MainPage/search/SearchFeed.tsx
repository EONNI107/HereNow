'use client';
import axios from 'axios';
import React, { useEffect } from 'react';

export default function SearchFeed() {
  useEffect(() => {
    feedData();
  }, []);
  const feedData = async () => {
    const res = await axios.get('/api/supabase-feed', {
      params: {},
    });
  };
  return (
    <>
      <div className="flex w-full border">
        <div className="grow">정렬</div>
        <div className="grow">관광명소</div>
        <div className="grow">문화시설</div>
        <div className="grow">맛집</div>
        <div className="grow">행사</div>
      </div>
      <div className="border w-full">
        <h2>피드</h2>
        <p>사람들끼리 공유한 모든 여행 꿀팁을 볼 수 있어요</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-3">
          <p>피드</p>
        </div>
      </div>
    </>
  );
}
