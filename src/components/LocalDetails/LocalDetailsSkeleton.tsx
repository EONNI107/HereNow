import Skeleton from '../Skeleton';

function LocalDetailsSkeleton() {
  return (
    <>
      <Skeleton height="h-[250px]" />
      <div className="mt-4 space-y-4">
        <Skeleton height="h-[340px]">
          <div className="bg-gray-400 animate-pulse rounded-md h-8 w-1/2 mb-4" />
          <div className="bg-gray-400 animate-pulse mt-5 rounded-md h-6 w-full mb-2 mx-auto" />
          <div className="bg-gray-400 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
          <div className="bg-gray-400 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
          <div className="bg-gray-400 animate-pulse rounded-md h-6 w-full mb-2 mx-auto" />
          <div className="bg-gray-400 animate-pulse rounded-md h-6 w-[50%] mt-4" />
          <div className="bg-gray-400 animate-pulse rounded-md h-6 w-[50%] mt-4" />
          <div className="bg-gray-400 animate-pulse rounded-md h-6 w-[50%] mt-4" />
        </Skeleton>
        <Skeleton height="h-[280px]">
          <div className="bg-gray-400 animate-pulse rounded-md h-6 w-1/2 mb-4" />
          <div className="bg-gray-400 animate-pulse rounded-md h-[200px] w-full mb-4" />
        </Skeleton>
        <Skeleton height="h-[250px]">
          <div className="bg-gray-400 animate-pulse rounded-md h-6 w-1/2 mb-4" />
        </Skeleton>
      </div>
    </>
  );
}

export default LocalDetailsSkeleton;
