'use client';

import React, { useState, useEffect } from 'react';
import {
  HeartIcon,
  ShareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import { showToast } from '@/utils/toastHelper';
import LoginPrompt from '@/components/LoginPrompt';
import { toast } from 'react-toastify';

type DetailLikeBtnProps = {
  postId: number;
  userId: string;
  onCommentClick: () => void;
  commentCount: number;
};

function DetailLikeBtn({
  postId,
  userId,
  onCommentClick,
  commentCount,
}: DetailLikeBtnProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const supabase = createClient();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { count, error } = await supabase
          .from('FeedLikes')
          .select('id', { count: 'exact', head: true })
          .eq('feedId', postId);

        if (error) {
          console.error(error);
        } else {
          setLikeCount(count || 0);
        }
        if (userId) {
          const { data, error: likeError } = await supabase
            .from('FeedLikes')
            .select('id')
            .eq('feedId', postId)
            .eq('userId', userId)
            .maybeSingle();

          if (likeError) {
            console.error(likeError);
          } else if (data) {
            setLiked(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLikes();
  }, [postId, userId, supabase]);

  const handleLike = async () => {
    if (!userId) {
      toast(<LoginPrompt />, {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });
      return;
    }

    const originalLiked = liked;
    const originalLikeCount = likeCount;

    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      if (liked) {
        const { error } = await supabase
          .from('FeedLikes')
          .delete()
          .eq('feedId', postId)
          .eq('userId', userId);

        if (error) {
          throw error;
        }
      } else {
        const { error } = await supabase.from('FeedLikes').insert({
          feedId: postId,
          userId,
        });

        if (error) {
          throw error;
        }
      }
    } catch (e) {
      setLiked(originalLiked);
      setLikeCount(originalLikeCount);
      showToast('error', '좋아요 처리 중 오류가 발생했습니다.');
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

  return isDesktop ? (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={handleLike}
          className="flex w-[6.4vw] h-[2.4vw] bg-blue4 focus:outline-none items-center rounded-[12px] justify-center hover:bg-blue5 hover:text-white transition-colors duration-300"
        >
          <span className="flex items-center text-white text-[1vw] font-semibold">
            <HeartIcon
              className={`${
                liked ? 'xl:fill-white xl:text-white animate-pop' : 'text-white'
              } w-[1.3vw] h-[1.3vw] mr-[0.8vw]`}
              fill={liked ? '#ff5c5c ' : 'none'}
            />{' '}
            찜 {likeCount}
          </span>
        </button>
        <span className="mx-[1.25vw] text-gray-700 flex text-[1vw] font-semibold bg-blue0 w-[6.4vw] h-[2.4vw] items-center border-blue4 border-[1px] rounded-[12px] justify-center">
          <ChatBubbleOvalLeftEllipsisIcon className="w-[1.3vw] h-[1.3vw] mr-[0.8vw]" />
          댓글 {commentCount}
        </span>
      </div>
      <button
        onClick={handleShareBtn}
        className="flex text-[1vw] font-semibold w-[5.6vw] h-[2.4vw] bg-gray0 items-center border-gray8 border-[1px] rounded-[12px] justify-center hover:bg-gray1 hover:text-black transition-colors duration-300"
      >
        <ShareIcon className="w-[1.3vw] h-[1.3vw] mr-[0.8vw]" /> 공유
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-between h-14 px-4">
      <div className="flex items-center">
        <button onClick={handleLike} className="focus:outline-none w-6 h-6 m-2">
          <HeartIcon
            className={`${liked ? 'text-red-500 animate-pop' : 'text-black'}`}
            fill={liked ? '#ff5c5c' : 'none'}
          />
        </button>
        <span className="mr-4">{likeCount}</span>
        <button
          onClick={onCommentClick}
          className="focus:outline-none w-6 h-6 m-2"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 cursor-pointer" />
        </button>
        <span>{commentCount}</span>
      </div>
      <button onClick={handleShareBtn}>
        <ShareIcon className="w-6 h-6 m-2" />
      </button>
    </div>
  );
}

export default DetailLikeBtn;
