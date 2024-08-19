'use client';
import { SearchedType } from '@/components/SearchMain/SearchMain';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type SearchedTypeProp = {
  item: SearchedType;
};

function WebSearchItem({ item }: SearchedTypeProp) {
  const router = useRouter();

  const handleClick = (contentid: string) => {
    router.push(`/local/details/${contentid}`);
  };
  return (
    <div
      key={item.contentid}
      className="w-full flex cursor-pointer gap-4"
      onClick={() => handleClick(item.contentid)}
    >
      <div className="w-[190px] h-[120px]">
        <Image
          src={item.firstimage || item.firstimage2 || '/NoImg-v2.png'}
          alt="이미지"
          width={190}
          height={120}
          className="rounded-lg border w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center font-semibold text-[16px] text-main">
        <p>{item.title}</p>
      </div>
    </div>
  );
}

export default WebSearchItem;
