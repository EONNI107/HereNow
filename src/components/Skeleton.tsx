import { ReactNode } from 'react';

type SkeletonProps = {
  width?: string;
  height?: string;
  children?: ReactNode;
};
function Skeleton({
  width = 'w-full',
  height = 'h-full',
  children,
}: SkeletonProps) {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded-md p-5 ${width} ${height}`}
    >
      {children}
    </div>
  );
}

export default Skeleton;
