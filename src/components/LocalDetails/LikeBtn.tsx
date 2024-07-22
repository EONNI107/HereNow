import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ShareIcon } from '@heroicons/react/24/outline';
import { showToast } from '@/utils/toastHelper';

function LikeBtn() {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShareBtn = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('success', '현재 페이지 주소가 복사되었습니다.');
    } catch (err) {
      console.error('복사 실패', err);
      showToast('error', '현재 페이지 주소 복사를 실패하였습니다.');
    }
  };

  return (
    <div className="items-center ">
      <button onClick={handleLike} className="focus:outline-none">
        <HeartIcon
          className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-400'}`}
          fill={liked ? '#ff5c5c' : 'none'}
        />
      </button>
      <button onClick={handleShareBtn}>
        <ShareIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default LikeBtn;
