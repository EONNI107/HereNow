'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Post } from '@/types/post';
import Comments from '@/components/FeedDetail/Comments';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

async function fetchPost(id: string): Promise<Post | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
}

type PostPageProps = {
  params: { id: string };
};

const PostPage = ({ params }: PostPageProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchPost(params.id);
      setPost(fetchedPost);
    };

    fetchData();
  }, [params.id]);

  if (!post) {
    return <div>피드를 찾을 수 없습니다</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{post.location}</p>
      <div className="image-previews flex flex-wrap space-x-2 mb-4">
        {post.image_urls.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
      <ChatBubbleOvalLeftEllipsisIcon
        onClick={() => setIsCommentModalOpen(true)}
        className="btn mt-2 mb-2 w-6 h-6 cursor-pointer"
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
