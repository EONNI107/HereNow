'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import useAuthStore from '@/zustand/useAuthStore';
import { toast } from 'react-toastify';
import LoginPrompt from '@/components/LoginPrompt';
import DeletePrompt from '@/components/DeletePrompt';
import { fromNow } from '@/utils/formatDate';

type Comment = {
  id: number;
  content: string;
  userId: string;
  createdAt: string;
  Users: {
    profileImage: string | null;
    nickname: string | null;
  } | null;
};

type FeedComment = Comment & { feedId: number };
type PlaceComment = Comment & { placeId: number };

type CommentsProps = {
  postId?: number;
  placeId?: number;
  onClose: () => void;
  onCommentAdded: () => void;
  onCommentRemoved: () => void;
};

function Comments({
  postId,
  placeId,
  onClose,
  onCommentAdded,
  onCommentRemoved,
}: CommentsProps) {
  const [comments, setComments] = useState<(FeedComment | PlaceComment)[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const { user } = useAuthStore();
  const supabase = createClient();
  const [isDesktop, setIsDesktop] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        const { data, error } = await supabase
          .from('FeedComments')
          .select('*, Users (profileImage, nickname)')
          .eq('feedId', postId)
          .order('createdAt', { ascending: true });

        if (error) {
          console.error(error);
        } else if (data) {
          setComments(data as FeedComment[]);
        }
      } else if (placeId) {
        const { data, error } = await supabase
          .from('PlaceComments')
          .select('*, Users (profileImage, nickname)')
          .eq('placeId', placeId)
          .order('createdAt', { ascending: true });

        if (error) {
          console.error(error);
        } else if (data) {
          setComments(data as PlaceComment[]);
        }
      }
    };
    fetchComments();
  }, [postId, placeId, supabase]);

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

    if (postId) {
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
            (comment): FeedComment => ({
              ...comment,
              Users: comment.Users || {
                profileImage: null,
                nickname: null,
              },
            }),
          ),
        ]);
        setNewComment('');
        onCommentAdded();
      }
    } else if (placeId) {
      const { data, error } = await supabase
        .from('PlaceComments')
        .insert({
          placeId: placeId,
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
            (comment): PlaceComment => ({
              ...comment,
              Users: comment.Users || {
                profileImage: null,
                nickname: null,
              },
            }),
          ),
        ]);
        setNewComment('');
        onCommentAdded();
      }
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
      .from(postId ? 'FeedComments' : 'PlaceComments')
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
    }

    setEditingCommentId(null);
    setEditingContent('');
    toast.success('댓글이 수정되었습니다.');
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
      .from(postId ? 'FeedComments' : 'PlaceComments')
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
      onCommentRemoved();
      toast.success('댓글이 삭제되었습니다.', {
        autoClose: 1500,
        closeOnClick: true,
      });
    }
  };

  const confirmDelete = (commentId: number) => {
    toast(
      <DeletePrompt
        onConfirm={() => handleDeleteComment(commentId)}
        isComment={true}
      />,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      },
    );
  };

  return isDesktop ? (
    <div className="w-full mt-8">
      <form onSubmit={handleCommentSubmit} className="w-full mb-4">
        <div className="w-full flex items-center">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력해주세요"
            required
            className="textarea w-[720px] text-[16px] flex h-[48px] bg-gray-100 rounded-xl items-center p-2 resize-none"
          />
          <button
            type="submit"
            className="btn bg-blue4 w-[80px] h-[48px] rounded-xl text-white text-[16px] ml-4 hover:bg-blue5 transition-colors duration-300"
          >
            등록
          </button>
        </div>
      </form>
      {comments.length === 0 && (
        <div className="flex items-center justify-center flex-wrap h-24">
          <p className="text-gray5 text-[16px]">첫 댓글의 주인공이 되세요!</p>
        </div>
      )}
      <ul className=" px-4">
        {comments
          .slice(0, showAllComments ? comments.length : 3)
          .map((comment) => (
            <li key={comment.id} className="py-4 flex border-b border-gray-300">
              <Image
                src={comment.Users?.profileImage || '/default-profile.jpg'}
                alt="User Avatar"
                width={48}
                height={48}
                className="rounded-full mr-4 w-12 h-12"
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <p className="font-semibold text-[18px ] mr-2">
                      {comment.Users?.nickname || '알 수 없음'}
                    </p>
                    <p className="text-gray-500 text-[12px]">
                      {fromNow(comment.createdAt)}
                    </p>
                  </div>
                  {user?.id === comment.userId && (
                    <div className="flex space-x-2">
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
                          수정
                        </button>
                      )}
                      <button
                        onClick={() => confirmDelete(comment.id)}
                        className="text-orange4 text-[14px]"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                {editingCommentId === comment.id ? (
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="textarea w-full mt-2 text-[14px] border border-gray-300 resize-none"
                  />
                ) : (
                  <p className="mt-2 text-[15px]">{comment.content}</p>
                )}
              </div>
            </li>
          ))}
      </ul>

      {comments.length > 3 && (
        <div className="mt-[18px] flex justify-center">
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-[14px] font-semibold flex items-center"
          >
            {showAllComments ? '접기' : '더보기'}
            <ChevronDownIcon
              className={`w-[16px] h-[16px] ml-[16px] ${
                showAllComments ? 'transform rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-70 flex items-end justify-center">
      <div className="bg-white rounded-t-2xl w-full h-[68%] flex flex-col">
        <XMarkIcon
          onClick={onClose}
          className="text-xl ml-auto my-4 p-1 h-8 w-8 cursor-pointer mr-4"
        />
        <hr className="border-gray-300 mx-4" />
        <div className="flex-grow overflow-y-auto px-4">
          {comments.length === 0 ? (
            <div className="flex items-center justify-center flex-wrap h-56">
              <p className="text-gray5 text-[16px]">
                첫 댓글의 주인공이 되세요!
              </p>
            </div>
          ) : (
            <ul>
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
                        {fromNow(comment.createdAt)}
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
                          className={`textarea resize-none no-focus w-full mt-[7px] text-[14px] border border-gray-400 focus:border-gray-400 focus:outline-none`}
                        />
                      </div>
                    ) : (
                      <p className="mt-[7px] text-[14px]">{comment.content}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handleCommentSubmit} className="w-full pb-16">
            <div className="w-full flex items-center pt-1 pb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력해주세요"
                required
                className="textarea resize-none text-[16px] flex-grow no-focus mr-2 h-[48px] bg-blue0 rounded-xl p-2 ml-4"
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
    </div>
  );
}

export default Comments;
