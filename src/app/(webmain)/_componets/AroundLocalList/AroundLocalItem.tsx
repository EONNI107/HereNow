'use client';
import { NearbyPlace } from '@/types/localDetails';
import Image from 'next/image';
import React from 'react';
type NearbyTypePlace = {
  item: NearbyPlace;
  onclick: () => void;
};
function AroundLocalItem({ item, onclick }: NearbyTypePlace) {
  return (
    <li
      onClick={onclick}
      className="rounded-xl cursor-pointer w-full flex flex-col gap-4 items-center max-xl:last:hidden"
    >
      <div className="w-[384px] h-[264px]">
        <Image
          src={
            item.firstimage
              ? item.firstimage || item.firstimage2
              : '/NoImg-v3.png'
          }
          alt="축제이미지"
          width={384}
          height={264}
          className="rounded-xl object-cover w-full h-full"
          priority
        />
      </div>
      <div className="w-full">
        <p className="text-sm not-italic font-normal leading-[150%]">
          {item.addr1}
        </p>
        <p className="text-xl not-italic font-medium leading-[150%]">
          {item.title}
        </p>
      </div>
    </li>
  );
}

export default AroundLocalItem;
