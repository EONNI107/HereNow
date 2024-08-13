import Skeleton from '@/components/Skeleton';

function LocalDetailsSkeleton() {
  return (
    <div className="flex flex-col bg-gray0 mx-auto xl:max-h-[2000px] xl:mb-5 xl:flex xl:flex-row xl:justify-center xl:gap-10">
      <div className="mb-5">
        <Skeleton height="mt-4 relative w-full h-[310px] xl:w-[730px] xl:h-[600px] mx-auto mb-6 xl:mb-16" />
        <div className="mt-4 space-y-2 xl:space-y-10">
          <Skeleton height="h-[340px] mb-5">
            <div className="bg-gray0 animate-pulse rounded-md h-8 w-[60%] xl:h-14 mb-4" />
            <div className="bg-gray0 animate-pulse mt-5 rounded-md h-6 w-full mb-2 mx-auto" />
            <div className="bg-gray0 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
            <div className="bg-gray0 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
            <div className="bg-gray0 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
            <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] mt-4" />
            <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] mt-4" />
            <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] mt-4 xl:hidden" />
          </Skeleton>
          <Skeleton height="h-[280px] xl:h-[570px]">
            <div className="bg-gray0 animate-pulse rounded-md h-6 w-1/2 mb-4" />
            <div className="bg-gray0 animate-pulse rounded-md h-[200px] xl:h-[480px] w-full mb-4" />
          </Skeleton>
        </div>
      </div>

      <Skeleton height=" h-[200px] xl:w-[400px] xl:h-[1760px] x">
        <div className="bg-gray0 animate-pulse rounded-md h-6 w-[40%] mb-4 xl:w-[50%] xl:h-10" />
        <div className="flex flex-row gap-4 xl:flex-col">
          <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4 xl:w-[350px] xl:h-[325px]" />
          <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4 xl:w-[350px] xl:h-[325px]" />
          <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4 xl:w-[350px] xl:h-[325px]" />
          <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4 xl:w-[350px] xl:h-[325px]" />
        </div>
      </Skeleton>
    </div>
  );
}

export default LocalDetailsSkeleton;
