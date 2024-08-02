import { ReactNode } from 'react';

type LocalDetailsSkeletonProps = {
  height?: string;
  children?: ReactNode;
};

function LocalDetailsSkeleton({
  height = 'h-full',
  children,
}: LocalDetailsSkeletonProps) {
  return (
    <div className={`bg-gray-300 animate-pulse rounded-md p-5 ${height}`}>
      {children}
    </div>
  );
}

export default LocalDetailsSkeleton;
