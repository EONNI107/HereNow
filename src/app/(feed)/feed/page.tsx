import FeedListClient from '@/components/FeedList/FeedListClient';
import UserName from '@/components/FeedList/UserName';
import { createClient } from '@/utils/supabase/server';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import Link from 'next/link';

async function FeedListPage() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('Feeds')
    .select(`*, Users(profileImage, nickname), FeedLikes(id), FeedComments(id)`)
    .order('createdAt', { ascending: false })
    .range(0, 9);

  if (error) {
    console.error('Error fetching feeds:', error);
    showToast('error', '피드 목록을 불러오는 중 오류가 발생했습니다.');
  }

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
            <Link
              href={'/feed-write'}
              className="self-start font-semibold bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              글쓰러 가기
            </Link>
            <h1 className="font-semibold text-[28px] text-white">
              <span className="block">
                <UserName />
              </span>
              맛집 · 여행지를 공유해주세요!
            </h1>
          </div>
        </div>
      </div>
      {data && <FeedListClient initialFeeds={data || []} />}
    </div>
  );
}

export default FeedListPage;
