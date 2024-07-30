'use client';
import Image from 'next/image';
import React from 'react';

function SearchFeed() {
  return (
    <>
      <div className="flex w-full border">
        <div className="grow">정렬</div>
        <div className="grow">관광명소</div>
        <div className="grow">문화시설</div>
        <div className="grow">맛집</div>
        <div className="grow">행사</div>
      </div>
      <div className="w-full px-5 py-5">
        <div className="w-full rounded-lg bg-[#FFF4F0] flex">
          <div>
            <Image src="/Save.png" alt="피드아이콘" width={20} height={20} />
          </div>
          <div>
            <h2>피드</h2>
            <p>사람들끼리 공유한 모든 여행 꿀팁을 볼 수 있어요</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-3">
          <p>피드</p>
        </div>
      </div>
    </>
  );
}
export default SearchFeed;
