// src/components/LoginPromptToast.tsx
import React from 'react';
import { toast } from 'react-toastify';

const LoginPrompt = ({
  closeToast,
  redirectToLogin,
}: {
  closeToast: () => void;
  redirectToLogin: () => void;
}) => {
  const handleConfirm = () => {
    closeToast();
    toast.dismiss();
    redirectToLogin();
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
            closeToast();
            redirectToLogin();
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
