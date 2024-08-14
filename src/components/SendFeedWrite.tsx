'use client';

import useAuthStore from '@/zustand/useAuthStore';
import LoginPrompt from '@/components/LoginPrompt';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function SendFeedWrite() {
  const router = useRouter();
  const { user } = useAuthStore();

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
    <div>
      <button
        onClick={HandleOnClick}
        className="font-semibold bg-blue4 text-white px-4 py-2 rounded-md hover:bg-blue5 text-base xl:px-16 xl:py-3 xl:leading-7 xl:mt-4 xl:text-[28px] xl:text-gray0"
      >
        글쓰러 가기
      </button>
    </div>
  );
}

export default SendFeedWrite;
