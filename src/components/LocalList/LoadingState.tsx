import React from 'react';
import SkeletonCard from './SkeletonCard';

type LoadingStateProps = {
  isPending?: boolean;
  error?: Error | null;
};

function LoadingState({
  isPending = false,
  error = null,
}: LoadingStateProps): React.ReactElement | null {
  if (isPending) {
    return (
      <div className="max-w-md mx-auto">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return <div>에러가 발생했습니다. {error.message}</div>;
  }

  return null;
}

export default LoadingState;
