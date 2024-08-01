import React, { useState, useEffect } from 'react';
import {
  HeartIcon,
  ShareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import { showToast } from '@/utils/toastHelper';

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

  useEffect(() => {
    const fetchLikes = async () => {
      const { count, error } = await supabase
        .from('FeedLikes')
        .select('id', { count: 'exact', head: true })
        .eq('feedId', postId);

      if (error) {
        console.error(error);
      } else {
        setLikeCount(count || 0);
      }

      const { data, error: likeError } = await supabase
        .from('FeedLikes')
        .select('id')
        .eq('feedId', postId)
        .eq('userId', userId)
        .single();

      if (likeError) {
        console.error(likeError);
      } else if (data) {
        setLiked(true);
      }
    };

    fetchLikes();
  }, [postId, userId, supabase]);

  const handleLike = async () => {
    if (liked) {
      const { error } = await supabase
        .from('FeedLikes')
        .delete()
        .eq('feedId', postId)
        .eq('userId', userId);

      if (error) {
        console.error(error);
      } else {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } else {
      const { error } = await supabase.from('FeedLikes').insert({
        feedId: postId,
        userId,
      });

      if (error) {
        console.error(error);
      } else {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
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
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-1">
        <button onClick={handleLike} className="focus:outline-none">
          <HeartIcon
            className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-400'}`}
            fill={liked ? '#ff5c5c' : 'none'}
          />
        </button>
        <span>{likeCount}</span>
        <button onClick={onCommentClick} className="focus:outline-none ml-4">
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 cursor-pointer" />
        </button>
        <span>{commentCount}</span>
      </div>
      <button onClick={handleShareBtn}>
        <ShareIcon className="w-5 h-5 grid justify-items-end" />
      </button>
    </div>
  );
}

export default DetailLikeBtn;
