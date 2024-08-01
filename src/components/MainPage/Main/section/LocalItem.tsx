import { NearbyPlace } from '@/types/local-details';
import Image from 'next/image';
import React from 'react';

type NearbyTypePlace = {
  item: NearbyPlace;
  key: string;
  onclick: () => void;
};
function LocalItem({ item, key, onclick }: NearbyTypePlace) {
  return (
    <li
      onClick={onclick}
      className="relative w-full h-[100px] mb-5 bg-gradient-to-r from-black/50 rounded-xl"
      key={key}
    >
      <Image
        src={
          item.firstimage ? item.firstimage || item.firstimage2 : '/No_Img.jpg'
        }
        alt="축제이미지"
        fill
        className="rounded-xl"
        objectFit="cover"
      />
      <div className="absolute top-8 left-3">
        <p
          className={
            item.firstimage
              ? ` z-1 text-[#fff] font-regular text-sm `
              : ` z-1 text-[#000] font-regular text-sm`
          }
        >
          {item.addr1}
        </p>
        <p
          className={
            item.firstimage
              ? ` z-1 text-[#fff] font-semibold text-lg`
              : ` z-1 text-[#000] font-semibold text-lg`
          }
        >
          {item.title}
        </p>
      </div>
    </li>
  );
}
export default LocalItem;
