import React, { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ShareIcon } from '@heroicons/react/24/outline';
import { showToast } from '@/utils/toastHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function LikeBtn({ userId, placeId }: { userId: string; placeId: string }) {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get<boolean>(
          `/api/like-place?userId=${userId}&placeId=${placeId}`,
        );
        setLiked(response.data);
      } catch (error) {
        console.error('좋아요 상태정보를 가져오는데 실패 했습니다:', error);
      }
    };
    fetchLikeStatus();
  }, [userId, placeId]);

  const { mutate: likeMutate } = useMutation({
    mutationFn: async () => {
      await axios.post('/api/like-place', { userId, placeId });
    },
    onMutate: async () => {
      setLiked(true);
    },
    onError: (error) => {
      console.error('좋아요 에러:', error);
      setLiked(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['like-place', userId, placeId],
      });
    },
  });

  const { mutate: unlikeMutate } = useMutation({
    mutationFn: async () => {
      await axios.delete('/api/like-place', { data: { userId, placeId } });
    },
    onMutate: async () => {
      setLiked(false);
    },
    onError: (error) => {
      console.error('좋아요 취소 에러.', error);
      console.error('응답 에러:', error.message);
      setLiked(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['like-place', userId, placeId],
      });
    },
  });

  const handleLike = () => {
    if (liked) {
      unlikeMutate();
    } else {
      likeMutate();
    }
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
    <div className="items-center flex gap-2 mb-4">
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
