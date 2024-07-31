'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Post } from '@/types/post';
import Comments from '@/components/FeedDetail/Comments';
import DetailLikeBtn from '@/components/FeedDetail/DetailLikeBtn';

async function fetchPost(id: string): Promise<Post | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('Feeds')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
}

async function fetchCommentCount(postId: number): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('FeedComments')
    .select('id', { count: 'exact', head: true })
    .eq('feedId', postId);

  if (error) {
    console.error('Error fetching comment count:', error);
    return 0;
  }

  return count || 0;
}

type PostPageProps = {
  params: { id: string };
};

const PostPage = ({ params }: PostPageProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const userId = '2596d4ff-f4e9-4875-a67c-22abc5fdacfa'; // 임시 사용자 ID

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchPost(params.id);
      if (fetchedPost) {
        // image가 문자열인지 확인하고 배열로 변환
        fetchedPost.image =
          typeof fetchedPost.image === 'string'
            ? JSON.parse(fetchedPost.image)
            : fetchedPost.image;
        setPost(fetchedPost);
      }

      const fetchedCommentCount = await fetchCommentCount(parseInt(params.id));
      setCommentCount(fetchedCommentCount);
    };

    fetchData();
  }, [params.id]);

  if (!post) {
    return <div>피드를 찾을 수 없습니다</div>;
  }

  const images = Array.isArray(post.image) ? post.image : [post.image];

  return (
    <div className="container mx-auto p-4">
      <p className="font-semibold text-14px text-gray-600 mb-4 text-right">{`${post.region} ${post.sigungu}`}</p>
      <div className="image-previews flex overflow-x-scroll space-x-2 mb-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
      <DetailLikeBtn
        postId={post.id}
        userId={userId}
        onCommentClick={() => setIsCommentModalOpen(true)}
        commentCount={commentCount}
      />
      <p className="text-lg mb-4">{post.content}</p>
      {isCommentModalOpen && (
        <Comments
          postId={post.id}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PostPage;
