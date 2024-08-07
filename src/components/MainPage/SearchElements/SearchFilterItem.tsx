'use client';
import { SearchedType } from '@/app/(layout)/search-page/page';
import { HeartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type SearchedTypeProp = {
  item: SearchedType;
};
function SearchFilterItem({ item }: SearchedTypeProp) {
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
      <div className="w-[100px] h-[100px]">
        <Image
          src={item.firstimage || item.firstimage2 || '/No_Img.jpg'}
          alt="이미지"
          width={100}
          height={100}
          className="rounded-lg border w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between items-center font-semibold text-[16px] text-main w-[218px]">
        <p>{item.title}</p>
        <div>
          <HeartIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default SearchFilterItem;
