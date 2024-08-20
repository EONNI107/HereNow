import FeedItemSkeleton from '@/components/FeedList/FeedItemSkeleton';
import UserName from '@/components/FeedList/UserName';
import Image from 'next/image';

function FeedLoading() {
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
                <div className="h-10 w-32 bg-gray-300 rounded-md animate-pulse"></div>
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
      <div className="mx-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <FeedItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedLoading;
