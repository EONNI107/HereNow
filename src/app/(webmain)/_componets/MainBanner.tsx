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
    <div className="w-full max-w-[1920px] max-h-[700px] relative">
      <div className="w-auto h-auto">
        <Image
          src="/Main-Banner.jpg"
          alt="배너이미지"
          width={1920}
          height={700}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="gap-[24px] flex flex-col justify-center items-center absolute bottom-[150px] left-[260px]">
        <div className="w-[420px]">
          <h2 className="text-5xl font-semibold leading-[150%]">
            {user ? `${user.nickname}님` : '여러분'}
            만의 <br />
            맛집과 여행지를 알려주세요!
          </h2>
        </div>
        <div
          onClick={HandleOnClick}
          className="cursor-pointer w-full px-[28px] py-[16px] flex justify-center items-center rounded-2xl bg-blue4 text-white"
        >
          <button className="text-[1.75rem] font-semibold leading-[150%]">
            글쓰러가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
