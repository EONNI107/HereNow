import Skeleton from '@/components/Skeleton';

function LocalDetailsSkeleton() {
  return (
    <div className="xl:container xl:max-w-screen-xl">
      <div className="flex flex-col bg-gray0 mx-4 xl:mx-0 xl:max-h-[2000px] xl:mt-8 xl:mb-5 xl:flex xl:flex-row xl:justify-center xl:gap-8">
        <div className="mb-5">
          <Skeleton height="mt-4 xl:mt-0 relative w-full h-[310px] xl:w-[800px] xl:h-[600px] mx-auto mb-6 xl:mb-12">
            <div className="bg-gray0 animate-pulse rounded-md h-[100%] w-[100%]" />
          </Skeleton>
          <div className="mt-4 space-y-2 xl:space-y-10">
            <Skeleton height="h-[340px] mb-5">
              <div className="bg-gray0 animate-pulse rounded-md h-8 w-[60%] xl:h-14 mb-6" />
              <div className="bg-gray0 animate-pulse mt-5 rounded-md h-6 w-full mb-4 mx-auto" />
              <div className="bg-gray0 animate-pulse rounded-md h-6 w-full mb-4 mx-auto" />
              <div className="bg-gray0 animate-pulse rounded-md h-6 w-full mb-6 mx-auto xl:mb-0" />
              <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] my-4 " />
              <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] my-4" />
              <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] mt-4" />
            </Skeleton>
            <Skeleton height="h-[280px] xl:h-[570px]">
              <div className="bg-gray0 animate-pulse rounded-md h-6 w-1/2 mb-4" />
              <div className="bg-gray0 animate-pulse rounded-md h-[200px] xl:h-[480px] w-full mb-4" />
            </Skeleton>
          </div>
        </div>

        <Skeleton height="h-[200px] xl:w-[400px] xl:h-[100%] xl:p-3">
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-[40%] mb-4 xl:w-[60%] xl:h-10 xl:mb-6" />
          <div className="flex flex-row gap-4 xl:flex-col">
            <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4 xl:w-[375px] xl:h-[310px]" />
            <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4 xl:w-[375px] xl:h-[310px]" />
            <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4 xl:w-[375px] xl:h-[310px]" />
            <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4 xl:w-[375px] xl:h-[310px]" />
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default LocalDetailsSkeleton;
