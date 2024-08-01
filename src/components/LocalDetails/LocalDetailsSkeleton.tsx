type LocalDetailsSkeletonProps = {
  width?: string;
  height?: string;
};

function LocalDetailsSkeleton({
  width = 'w-full',
  height = 'h-full',
}: LocalDetailsSkeletonProps) {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded-md ${width} ${height}`}
    ></div>
  );
}

export default LocalDetailsSkeleton;
