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
      <Image src={item.firstimage} alt="축제이미지" fill />
      <div className="absolute top-8">
        <p className="z-1 text-[#fff]">{item.addr1}</p>
        <p className="z-1 text-[#fff]">{item.title}</p>
      </div>
    </li>
  );
}
