import Image from 'next/image';
import React from 'react';

type DataProps = {
  title: string;
  content: string;
};
function Header({ title, content }: DataProps) {
  return (
    <div className="h-[200px] w-full bg-[#888] flex flex-col items-center relative">
      <Image src="/backgroundimage.png" alt="배경이미지" fill />
      <div className="text-white absolute bottom-10 left-8">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <button className="absolute bottom-1 left-8 text-white bg-[#ccc]">
        공유하러가기
      </button>
    </div>
  );
}
export default Header;
