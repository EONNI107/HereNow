import FeedListClient from '@/components/FeedList/FeedListClient';
import UserName from '@/components/FeedList/UserName';
import SendFeedWrite from '@/components/SendFeedWrite';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

async function FeedListPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id || null;

  const { data, error } = await supabase
    .from('Feeds')
    .select(`*, Users(profileImage, nickname), FeedLikes(id), FeedComments(id)`)
    .order('createdAt', { ascending: false })
    .range(0, 3);

  if (error) {
    console.error('Error fetching feeds:', error);
  }

  const SupabaseError = error;

  return (
    <div>
      <div className="relative mb-4">
        <div className="aspect-[16/9] w-full">
          <Image
            src={'/AreaDetail-Main.jpg'}
            alt="피드 상단 이미지"
            width={300}
            height={200}
            priority={true}
            className="object-cover w-full"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-15 flex flex-col justify-end p-8">
          <div className="flex flex-col space-y-2">
            <SendFeedWrite />
            <h1 className="font-semibold text-[24px] text-white">
              <span className="block">
                <UserName />
              </span>
              맛집 · 여행지를 공유해주세요!
            </h1>
          </div>
        </div>
      </div>
      {data && (
        <FeedListClient
          initialFeeds={data || []}
          SupabaseError={SupabaseError}
          userId={userId}
        />
      )}
    </div>
  );
}

export default FeedListPage;
