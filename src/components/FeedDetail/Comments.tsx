'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import useAuthStore from '@/zustand/useAuthStore';
import { toast } from 'react-toastify';
import LoginPrompt from '@/components/LoginPrompt';
import DeletePrompt from '@/components/DeletePrompt';

dayjs.extend(relativeTime);

type Comment = {
  id: number;
  feedId: number;
  content: string;
  userId: string;
  createdAt: string;
  Users: {
    profileImage: string | null;
    nickname: string | null;
  } | null;
};

type CommentsProps = {
  postId: number;
  onClose: () => void;
};

function Comments({ postId, onClose }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const { user } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('FeedComments')
        .select('*, Users (profileImage, nickname)')
        .eq('feedId', postId)
        .order('createdAt', { ascending: true });

      if (error) {
        console.error(error);
      } else if (data) {
        setComments(data as Comment[]);
      }
    };

    fetchComments();
  }, [postId, supabase]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast(<LoginPrompt />, {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });
      return;
    }

    const { data, error } = await supabase
      .from('FeedComments')
      .insert({
        feedId: postId,
        content: newComment,
        userId: user.id,
      })
      .select('*, Users (profileImage, nickname)');

    if (error) {
      console.error(error);
    } else if (data) {
      setComments((prevComments) => [
        ...prevComments,
        ...data.map(
          (comment): Comment => ({
            ...comment,
            Users: comment.Users || {
              profileImage: null,
              nickname: null,
            },
          }),
        ),
      ]);
      setNewComment('');
    }
  };

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!user) {
      toast(<LoginPrompt />, {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });
      return;
    }

    if (!editingContent.trim()) {
      toast.error('수정할 내용을 입력하세요.');
      return;
    }

    const { error } = await supabase
      .from('FeedComments')
      .update({ content: editingContent })
      .eq('id', commentId)
      .eq('userId', user.id);

    if (error) {
      console.error(error);
      toast.error('댓글 수정에 실패하였습니다.');
    } else {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editingContent }
            : comment,
        ),
      );
      setEditingCommentId(null);
      setEditingContent('');
      toast.success('댓글이 수정되었습니다.');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!user) {
      toast(<LoginPrompt />, {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });
      return;
    }

    const { error } = await supabase
      .from('FeedComments')
      .delete()
      .eq('id', commentId)
      .eq('userId', user.id);

    if (error) {
      console.error(error);
      toast.error('댓글 삭제에 실패하였습니다.');
    } else {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
      toast.success('댓글이 삭제되었습니다.');
    }
  };

  const confirmDelete = (commentId: number) => {
    toast(<DeletePrompt onConfirm={() => handleDeleteComment(commentId)} />, {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-end justify-center">
      <div className="bg-white rounded-t-2xl w-full h-[68%] flex flex-col">
        <XMarkIcon
          onClick={onClose}
          className="text-xl ml-auto my-4 p-1 h-8 w-8 cursor-pointer mr-4"
        />
        <hr className="border-gray-300 mx-4" />
        <ul className="flex-grow overflow-y-auto px-4">
          {comments.map((comment) => (
            <li key={comment.id} className="py-4 flex">
              <Image
                src={comment.Users?.profileImage || '/default-profile.jpg'}
                alt="User Avatar"
                width={48}
                height={48}
                className="rounded-full mr-6 w-12 h-12"
              />
              <div className="items-center w-full">
                <div className="flex">
                  <p className="font-semibold text-[14px] mr-2">
                    {comment.Users?.nickname || '알 수 없음'}
                  </p>
                  <p className="text-gray-500 text-[14px]">
                    {dayjs(comment.createdAt).fromNow()}
                  </p>
                  {user?.id === comment.userId && (
                    <span className="flex space-x-2 ml-5">
                      {editingCommentId === comment.id ? (
                        <button
                          onClick={() => handleUpdateComment(comment.id)}
                          className="text-blue4 text-[14px]"
                        >
                          <CheckCircleIcon className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(comment)}
                          className="text-blue4 text-[14px]"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => confirmDelete(comment.id)}
                        className="text-orange4 text-[14px]"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </span>
                  )}
                </div>
                {editingCommentId === comment.id ? (
                  <div>
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className={`textarea no-focus w-full mt-[7px] text-[14px] border border-gray-400 focus:border-gray-400 focus:outline-none`}
                    />
                  </div>
                ) : (
                  <p className="mt-[7px] text-[14px]">{comment.content}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} className="w-full">
          <div className="w-full flex items-center pt-1 pb-4 shadow-2xl">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              required
              className="textarea text-[16px] flex-grow no-focus mr-2 h-[48px] bg-blue0 rounded-xl p-2 ml-4"
            />
            <button
              type="submit"
              className="btn bg-blue3 px-5 h-[48px] rounded-xl text-white text-[16px] mr-4"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Comments;
