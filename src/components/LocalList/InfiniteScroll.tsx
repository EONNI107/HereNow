import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '@/components/LoadingSpinner';

function InfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  return (
    <>
      {hasNextPage && <div ref={ref} className="h-10" />}
      {isFetchingNextPage && hasNextPage && (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}

export default InfiniteScroll;
