import FeedListItem from '@/components/FeedList/FeedListItem';
import { Feed } from '@/types/feed';
import { createClient } from '@/utils/supabase/server';
import { showToast } from '@/utils/toastHelper';

async function Page() {
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
      <div className="grid grid-cols-1 gap-4">
        {data && data.map((feed) => <FeedListItem key={feed.id} feed={feed} />)}
      </div>
    </div>
  );
}

export default Page;
