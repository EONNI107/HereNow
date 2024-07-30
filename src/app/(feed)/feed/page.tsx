import FeedListItem from '@/components/FeedList/FeedListItem';
import { createClient } from '@/utils/supabase/server';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';

async function FeedListPage() {
  const supabase = createClient();
  const { data, error } = await supabase.from('Feeds').select('*');

  if (error) {
    console.error('Error fetching feeds:', error);
    showToast('error', '피드 목록을 불러오는 중 에러가 발생했습니다.');
  }

  console.log('data => ', data);

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
            <button className="self-start font-semibold bg-blue-500 text-white px-4 py-2 rounded-md">
              글쓰러 가기
            </button>
            <h1 className="font-semibold text-[28px] text-white">
              <span className="block">홍길동님만의</span>
              맛집 · 여행지를 공유해주세요!
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="mb-4">{/* 드롭다운 구현 */}</div>
        <div className="grid grid-cols-1 gap-4">
          {data &&
            data.map((feed) => <FeedListItem key={feed.id} feed={feed} />)}
        </div>
      </div>
    </div>
  );
}

export default FeedListPage;
