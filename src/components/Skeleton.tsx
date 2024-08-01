type SkeletonProps = {
  width?: string;
  height?: string;
};

function Skeleton({ width = 'w-full', height = 'h-full' }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded-md ${width} ${height}`}
    ></div>
  );
}

export default Skeleton;
