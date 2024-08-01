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
    <li onClick={onclick} className="relative w-full h-[100px] mb-5" key={key}>
      <Image
        src={
          item.firstimage ? item.firstimage || item.firstimage2 : '/No_Img.jpg'
        }
        alt="축제이미지"
        fill
        className="rounded-xl"
      />
      <div className="absolute top-8 left-3">
        <p
          className={item.firstimage ? ` z-1 text-[#fff]` : ` z-1 text-[#000]`}
        >
          {item.addr1}
        </p>
        <p
          className={item.firstimage ? ` z-1 text-[#fff]` : ` z-1 text-[#000]`}
        >
          {item.title}
        </p>
      </div>
    </li>
  );
}
export default LocalItem;
