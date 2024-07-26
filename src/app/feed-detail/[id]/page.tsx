import { Post } from '@/types/post';
import { createClient } from '@/utils/supabase/client';

async function fetchPost(id: string): Promise<Post | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
}

type PostPageProps = {
  params: { id: string };
};

const PostPage = async ({ params }: PostPageProps) => {
  const post = await fetchPost(params.id);

  if (!post) {
    return <div>Post not found</div>;
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
            className="w-32 h-32 object-cover"
          />
        ))}
      </div>
      <p className="text-lg">{post.content}</p>
    </div>
  );
};

export default PostPage;
