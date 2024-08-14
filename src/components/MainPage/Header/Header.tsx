import SendFeedWrite from '@/components/SendFeedWrite';
import Image from 'next/image';
import React from 'react';

type DataProps = {
  title: string;
  content: string;
};
function Header({ title, content }: DataProps) {
  return (
    <div className="relative">
      <div className="aspect-[16/9] w-full">
        <Image
          src={'/backgroundimage.png'}
          alt="메인 상단 이미지"
          width={300}
          height={200}
          priority={true}
          className="object-cover w-full"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-15 flex flex-col justify-end p-8">
        <div className="flex flex-col space-y-2">
          <SendFeedWrite />
          <h1 className="font-semibold text-[24px] text-white">
            <span className="block">{title}</span>
            {content}
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Header;
