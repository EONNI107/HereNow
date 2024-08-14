import Skeleton from '@/components/Skeleton';

function LocalDetailsSkeleton() {
  return (
    <div className="my-4">
      <Skeleton height="h-[250px] mb-[-8px]" />
      <div className="mt-4 space-y-2">
        <Skeleton height="h-[340px]">
          <div className="bg-gray0 animate-pulse rounded-md h-8 w-[60%] mb-4" />
          <div className="bg-gray0 animate-pulse mt-5 rounded-md h-6 w-full mb-2 mx-auto" />
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] mt-4" />
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] mt-4" />
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-[50%] mt-4" />
        </Skeleton>
        <Skeleton height="h-[280px]">
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-1/2 mb-4" />
          <div className="bg-gray0 animate-pulse rounded-md h-[200px] w-full mb-4" />
        </Skeleton>
        <Skeleton height="h-[200px]">
          <div className="bg-gray0 animate-pulse rounded-md h-6 w-[40%] mb-4" />
          <div className="flex flex-row gap-4">
            <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4" />
            <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4" />
            <div className="bg-gray0 animate-pulse rounded-md h-28 w-28 mb-4" />
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default LocalDetailsSkeleton;
