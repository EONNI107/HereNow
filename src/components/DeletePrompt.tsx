import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

type DeletePromptProps = {
  onConfirm: () => Promise<void>;
  isComment?: boolean;
};

function DeletePrompt({ onConfirm, isComment = false }: DeletePromptProps) {
  const router = useRouter();
  const pathname = usePathname();

  const closeToast = () => toast.dismiss();
  const handleConfirm = async () => {
    closeToast();
    await onConfirm();

    if (!isComment && !pathname.startsWith('/feed-detail/')) {
      setTimeout(() => {
        router.push('/feed');
      }, 300);
    }
  };

  return (
    <div>
      <p>
        정말 삭제하시겠습니까?
        <br />
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
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default DeletePrompt;
