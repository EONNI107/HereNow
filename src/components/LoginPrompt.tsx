import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const LoginPrompt = () => {
  const router = useRouter();

  const closeToast = () => toast.dismiss();
  const handleConfirm = () => {
    closeToast();
    setTimeout(() => {
      router.push('/sign-in');
    }, 300);
  };

  return (
    <div>
      <p>
        로그인이 필요합니다.
        <br />
        로그인 페이지로 이동하시겠습니까?
      </p>
      <div className="flex justify-center gap-2 space-x-2 mt-4">
        <button
          className="bg-gray-300 w-32 px-3 py-1 rounded"
          onClick={closeToast}
        >
          취소
        </button>
        <button
          className="bg-blue-500 w-32 text-white px-3 py-1 rounded"
          onClick={() => {
            handleConfirm();
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
