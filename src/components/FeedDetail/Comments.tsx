'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

type Comment = {
  id: number;
  feedId: number;
  content: string;
  userId: string;
  createdAt: string;
};

type CommentsProps = {
  postId: number;
  onClose: () => void;
};

function Comments({ postId, onClose }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('FeedComments')
        .select('*')
        .eq('feedId', postId)
        .order('createdAt', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
      } else if (data) {
        setComments(data);
      }
    };

    fetchComments();
  }, [postId, supabase]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = '2596d4ff-f4e9-4875-a67c-22abc5fdacfa'; // 임시 사용자 ID

    console.log('Submitting comment:', newComment);

    const { data, error } = await supabase.from('FeedComments').insert({
      feedId: postId,
      content: newComment,
      userId: userId,
    });

    if (error) {
      console.error('Error adding comment:', error);
    } else if (data) {
      setComments((prevComments) => [...prevComments, data[0]]);
      setNewComment('');
      setNotification('댓글이 등록되었습니다');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          닫기
        </button>
        <h2 className="text-2xl font-bold mb-4">댓글</h2>
        {notification && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
            {notification}
          </div>
        )}
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              <p>{comment.content}</p>
              <small className="text-gray-500">
                Posted by {comment.userId} on{' '}
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요"
            required
            className="textarea no-focus w-full"
          />
          <button type="submit" className="btn mt-2">
            댓글 등록
          </button>
        </form>
      </div>
    </div>
  );
}

export default Comments;
