import { itemtype } from '@/types/maintype';
import Image from 'next/image';
import React from 'react';

type itemtypeprops = {
  item: itemtype;
  key: string;
  onclick: () => void;
};
export default function LocalItem({ item, key, onclick }: itemtypeprops) {
  return (
    <li onClick={onclick} className="relative w-full h-[100px] mb-5" key={key}>
      <Image
        src={
          item.firstimage ? item.firstimage || item.firstimage2 : '/No_Img.jpg'
        }
        alt="축제이미지"
        fill
      />
      <div className="absolute top-8">
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
