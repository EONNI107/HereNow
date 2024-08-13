import Image from 'next/image';
import React from 'react';

function MainBanner() {
  return (
    <div className="w-full max-w-[1920px] max-h-[700px] relative">
      <Image
        src="/Main-Banner.jpg"
        alt="배너이미지"
        width={1920}
        height={700}
        className="w-full h-full object-cover"
      />
      <div className="gap-[24px] flex flex-col justify-center items-center absolute bottom-[180px] left-[250px]">
        <div className="w-[420px]">
          <h2 className="text-5xl font-semibold leading-[150%]">
            names님만의 맛집과 여행지를 알려주세요!
          </h2>
        </div>
        <div className="w-[420px] px-[28px] py-[16px] flex justify-center items-center rounded-2xl bg-blue4 text-white">
          <button className="text-[1.75rem] font-semibold leading-[150%]">
            글쓰러가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
