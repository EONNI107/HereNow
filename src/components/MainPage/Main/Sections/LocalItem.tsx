import { NearbyPlace } from '@/types/localDetails';
import Image from 'next/image';
import React from 'react';

type NearbyTypePlace = {
  item: NearbyPlace;
  onclick: () => void;
};
function LocalItem({ item, onclick }: NearbyTypePlace) {
  return (
    <li
      onClick={onclick}
      className="relative w-auto h-auto mb-5 rounded-xl overflow-hidden cursor-pointer"
    >
      <Image
        src={
          item.firstimage
            ? item.firstimage || item.firstimage2
            : '/NoImg-v1.png'
        }
        alt="축제이미지"
        width={368}
        height={100}
        className="rounded-xl object-cover w-full h-[135px]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent rounded-xl"></div>
      <div className="absolute top-10 left-3">
        <p
          className={
            item.firstimage
              ? ` z-1 text-white font-regular text-sm `
              : ` z-1 text-main font-regular text-sm`
          }
        >
          {item.addr1}
        </p>
        <p
          className={
            item.firstimage
              ? ` z-1 text-white font-semibold text-lg`
              : ` z-1 text-main font-semibold text-lg`
          }
        >
          {item.title}
        </p>
      </div>
    </li>
  );
}
export default LocalItem;
