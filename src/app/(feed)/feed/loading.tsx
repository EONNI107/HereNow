import FeedItemSkeleton from '@/components/FeedList/FeedItemSkeleton';
import UserName from '@/components/FeedList/UserName';
import Image from 'next/image';
import Link from 'next/link';

function FeedLoading() {
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
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <FeedItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedLoading;
