'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import FeedListItem from '@/components/FeedList/FeedListItem';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Feed } from '@/types/feed';

const FEEDS_PER_PAGE = 4;

type FeedListClientProps = {
  initialFeeds: Feed[];
};

function FeedListClient({ initialFeeds }: FeedListClientProps) {
  const supabase = createClient();
  const { ref, inView } = useInView();

  const fetchFeeds = async ({ pageParam = 1 }) => {
    const { data, error } = await supabase
      .from('Feeds')
      .select(
        `*, Users(profileImage, nickname), FeedLikes(id), FeedComments(id)`,
      )
      .range(pageParam * FEEDS_PER_PAGE, (pageParam + 1) * FEEDS_PER_PAGE - 1);

    if (error) throw error;
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: fetchFeeds,
    initialPageParam: 1,
    initialData: { pages: [initialFeeds], pageParams: [0] },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === FEEDS_PER_PAGE ? allPages.length : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">{/* 드롭다운 구현 */}</div>
      <div className="grid grid-cols-1 gap-4">
        {data.pages.map((page, i) => (
          <div key={i}>
            {page.map((feed) => (
              <FeedListItem
                key={feed.id}
                feed={feed}
                likesCount={feed.FeedLikes.length}
                commentsCount={feed.FeedComments.length}
              />
            ))}
          </div>
        ))}
      </div>
      <div ref={ref} className="text-[#767676] text-center py-4">
        {isFetchingNextPage
          ? '로딩 중...'
          : hasNextPage
          ? '더 보기'
          : '더 이상 보여줄 피드가 없네요!'}
      </div>
    </div>
  );
}

export default FeedListClient;
