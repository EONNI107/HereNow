'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toastHelper';
import useAuthStore from '@/zustand/useAuthStore';
import UserName from '@/components/FeedList/UserName';

function FeedListHeader() {
  const { user } = useAuthStore();
  const router = useRouter();

  const isLoggedIn = !!user;

  const handleWriteClick = () => {
    if (isLoggedIn) {
      router.push('/feed-write');
    } else {
      showToast('info', '로그인이 필요한 서비스입니다.');
      router.push('/sign-in');
    }
  };

  return (
    <div className="relative mb-4">
      <div className="aspect-[16/9] w-full">
        <Image
          src={'/AreaDetail-Main.jpg'}
          alt="피드 상단 이미지"
          width={300}
          height={200}
          priority={true}
          className="object-cover w-full"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-15 flex flex-col justify-end p-8">
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleWriteClick}
            className="self-start font-semibold bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {isLoggedIn ? '글쓰러 가기' : '로그인하고 글쓰기'}
          </button>
          <h1 className="font-semibold text-[28px] text-white">
            <span className="block">
              <UserName />
            </span>
            맛집 · 여행지를 공유해주세요!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default FeedListHeader;
