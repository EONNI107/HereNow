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
      <div className="mb-4">
        <div className="relative aspect-[16/9] max-w-[1920px] w-full mx-auto !px-0 h-[500px] overflow-hidden ">
          <Image
            src={'/Main-Banner.jpg'}
            alt="피드 상단 이미지"
            width={1600}
            height={900}
            priority
            className="object-cover w-full h-full "
          />
          <div className="absolute inset-0 bg-black bg-opacity-15 flex flex-col justify-end p-8 xl:justify-center xl:items-start xl:pl-[15%]">
            <div className="flex flex-col space-y-4">
              <div className="xl:order-2">
                <SendFeedWrite />
              </div>
              <h1 className="font-semibold text-[24px] text-white xl:order-1 xl:text-[48px] xl:text-main">
                <span className="block">
                  <UserName />
                </span>
                여행지를 알려주세요!
              </h1>
            </div>
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
