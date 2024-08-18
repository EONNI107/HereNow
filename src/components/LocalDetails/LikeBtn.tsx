import React, { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginPrompt from '@/components/LoginPrompt';
import useAuthStore from '@/zustand/useAuthStore';

type LikeBtnProps = {
  placeId: string;
  imageUrl: string;
  isInNearbyPlaces?: boolean;
  isInLocalList?: boolean;
};

function LikeBtn({
  placeId,
  imageUrl,
  isInNearbyPlaces = false,
  isInLocalList = false,
}: LikeBtnProps) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);

  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
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
      await axios.post('/api/like-place', { userId, placeId, imageUrl });
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
        queryKey: ['like-place', userId, placeId, imageUrl],
      });
    },
  });

  const { mutate: unlikeMutate } = useMutation({
    mutationFn: async () => {
      await axios.delete('/api/like-place', {
        data: { userId, placeId, imageUrl },
      });
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
        queryKey: ['like-place', userId, placeId, imageUrl],
      });
    },
  });

  const handleLike = () => {
    if (!userId) {
      toast(<LoginPrompt />, {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });
      return;
    }
    if (liked) {
      unlikeMutate();
    } else {
      likeMutate();
    }
  };

  return (
    <div>
      {isInLocalList ? (
        <button
          onClick={handleLike}
          className={`flex gap-2 justify-center xl:hover:bg-blue5 xl:bg-blue4 xl:border border-blue4 xl:p-2 xl:rounded-lg xl:w-24 ${
            isInLocalList &&
            'xl:bg-transparent xl:hover:bg-transparent xl:border-none xl:w-4 xl:p-0 xl:algin'
          }`}
        >
          <div className="">
            <HeartIcon
              className={`w-6 h-6 ${liked && 'animate-pop'} ${
                liked ? 'text-orange5 fill-orange5 ' : 'text-gray3 '
              }`}
            />
          </div>
        </button>
      ) : (
        <button
          onClick={handleLike}
          className={`flex gap-2 justify-center xl:hover:bg-blue5 xl:bg-blue4 xl:border border-blue4 xl:p-2 xl:rounded-lg xl:w-24 ${
            isInNearbyPlaces &&
            'xl:bg-transparent xl:hover:bg-transparent xl:border-none xl:w-4 xl:p-0 xl:algin'
          }`}
        >
          <div className="">
            <HeartIcon
              className={`w-6 h-6 ${liked && 'animate-pop'} ${
                isInNearbyPlaces
                  ? liked
                    ? 'animate-pop xl:text-orange5 xl:fill-orange5'
                    : 'xl:text-gray3'
                  : liked
                  ? 'text-orange5 fill-orange5 xl:fill-white xl:text-white'
                  : 'text-gray3 xl:text-white'
              }`}
            />
          </div>
          <span
            className={`hidden xl:inline-flex text-white ${
              isInNearbyPlaces && 'xl:hidden'
            }`}
          >
            찜
          </span>
        </button>
      )}
    </div>
  );
}

export default LikeBtn;
