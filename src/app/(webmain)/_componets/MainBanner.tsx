'use client';
import LoginPrompt from '@/components/LoginPrompt';
import useAuthStore from '@/zustand/useAuthStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

function MainBanner() {
  const { user } = useAuthStore();
  const router = useRouter();
  const HandleOnClick = () => {
    if (!user) {
      toast(<LoginPrompt />, {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });
    } else {
      router.push('/feed-write');
    }
  };
  return (
    <div className="w-full max-w-[1920px] max-h-[700px] relative overflow-hidden">
      <div className="w-auto h-auto">
        <Image
          src="/Main-Banner.jpg"
          alt="배너이미지"
          width={1920}
          height={700}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="gap-[30px] flex flex-col justify-center items-start absolute top-[40%] left-[10%] w-[30%] h-[30%] text-[150%]">
        <div className="w-full">
          <h2 className="font-semibold leading-[150%] shrink-0 text-[170%]">
            {user ? `${user.nickname}님` : '여러분'}
            만의 <br />
            맛집과 여행지를 알려주세요!
          </h2>
        </div>
        <div
          onClick={HandleOnClick}
          className="hover:bg-blue5 transition-colors duration-300 shrink-0 cursor-pointer px-[22px] py-[12px] w-[60%] flex justify-center items-center rounded-2xl bg-blue4 text-white"
        >
          <button className="font-semibold ">글쓰러가기</button>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
