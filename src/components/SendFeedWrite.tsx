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
        className="self-start font-semibold bg-blue4 text-white px-4 py-2 rounded-md hover:bg-blue5"
      >
        글쓰러 가기
      </button>
    </div>
  );
}

export default SendFeedWrite;
