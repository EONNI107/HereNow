import { createClient } from '@/utils/supabase/server';
import { showToast } from '@/utils/toastHelper';

async function page() {
  const supabase = createClient();
  const { data, error } = await supabase.from('Feeds').select('*');

  if (error) {
    console.error('Error fetching feeds:', error);
    showToast('error', '피드 목록을 불러오는 중 에러가 발생했습니다.');
  }

  console.log('data => ', data);

  return (
    <div>
      <h1>Feeds</h1>
      {data &&
        data.map((feed) => (
          <div key={feed.id}>
            <h2>{feed.title}</h2>
            <p>{feed.content}</p>
            <div>{feed.createdAt}</div>
          </div>
        ))}
    </div>
  );
}

export default page;
