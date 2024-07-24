// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import LikeBtn from '@/components/LocalDetails/LikeBtn';
// import { createClient } from '@/utils/supabase/client';
// import { HeartIcon } from '@heroicons/react/24/outline'; // HeartIcon 가져오기

// interface Post {
//   id: number;
//   content: string;
// }

// export default function PostPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id'); // 쿼리 파라미터에서 id를 가져옴
//   const [post, setPost] = useState<Post | null>(null);
//   const [likes, setLikes] = useState<number>(0);
//   const [liked, setLiked] = useState<boolean>(false);
//   const userId = 1; // 예시로 고정된 사용자 ID, 실제로는 인증된 사용자 ID를 사용
//   const supabase = createClient(); // Supabase 클라이언트 생성

//   useEffect(() => {
//     if (id) {
//       fetchPost(Number(id));
//       fetchLikes(Number(id));
//       checkIfLiked(Number(id));
//     }
//   }, [id]);

//   const fetchPost = async (postId: number) => {
//     const { data, error } = await supabase
//       .from('posts')
//       .select('*')
//       .eq('id', postId)
//       .single();

//     if (error) {
//       console.error('Error fetching post:', error);
//     } else {
//       setPost(data);
//     }
//   };

//   const fetchLikes = async (postId: number) => {
//     const { count, error } = await supabase
//       .from('likes')
//       .select('*', { count: 'exact' }) // 좋아요 개수를 정확히 가져옴
//       .eq('post_id', postId);

//     if (error) {
//       console.error('Error fetching likes:', error);
//     } else {
//       setLikes(count || 0); // 좋아요 개수를 상태에 저장
//     }
//   };

//   const checkIfLiked = async (postId: number) => {
//     const { data, error } = await supabase
//       .from('likes')
//       .select('*')
//       .eq('post_id', postId)
//       .eq('user_id', userId)
//       .single();

//     if (error && error.code !== 'PGRST116') {
//       // 'PGRST116' 에러는 데이터가 없는 경우를 의미
//       console.error('Error checking like status:', error);
//     } else {
//       setLiked(!!data); // 데이터가 존재하면 liked를 true로 설정
//     }
//   };

//   const handleLike = async () => {
//     if (liked) {
//       const { error } = await supabase
//         .from('likes')
//         .delete()
//         .eq('post_id', Number(id))
//         .eq('user_id', userId);

//       if (error) {
//         console.error('Error unliking post:', error);
//       } else {
//         setLikes(likes - 1);
//         setLiked(false);
//       }
//     } else {
//       const { error } = await supabase
//         .from('likes')
//         .insert({ post_id: Number(id), user_id: userId });

//       if (error) {
//         console.error('Error liking post:', error);
//       } else {
//         setLikes(likes + 1);
//         setLiked(true);
//       }
//     }
//   };

//   if (!post) return <div>Loading...</div>; // 게시물 데이터를 가져오기 전에는 로딩 메시지를 표시

//   return (
//     <div>
//       <h1>{post?.content}</h1>
//       {/* Supabase와의 상호작용을 처리하는 좋아요 버튼 */}
//       <button onClick={handleLike} className="focus:outline-none">
//         <HeartIcon
//           className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-400'}`}
//           fill={liked ? '#ff5c5c' : 'none'}
//         />
//       </button>
//       <LikeBtn />
//       <p>Likes: {likes}</p> {/* 좋아요 개수를 표시 */}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LikeBtn from '@/components/LocalDetails/LikeBtn';
import { createClient } from '@/utils/supabase/client';
import { HeartIcon } from '@heroicons/react/24/outline';

interface Post {
  id: number;
  content: string;
}

const mockPost: Post = {
  id: 1,
  content: 'content',
};

export default function PostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [post, setPost] = useState<Post | null>(mockPost);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const userId = 1;
  const supabase = createClient();

  useEffect(() => {
    if (id) {
      // fetchPost(Number(id));
      // fetchLikes(Number(id));
      // checkIfLiked(Number(id));
      setPost(mockPost);
    }
  }, [id]);

  const handleLike = async () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  if (!post) return <div>Loading...</div>;
  return (
    <div>
      <h1>{post?.content}</h1>
      <button onClick={handleLike} className="focus:outline-none">
        <HeartIcon
          className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-400'}`}
          fill={liked ? '#ff5c5c' : 'none'}
        />
      </button>
      <p>Likes: {likes}</p>
      <LikeBtn />
    </div>
  );
}
