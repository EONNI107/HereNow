'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import FeedListItem from '@/components/FeedList/FeedListItem';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useState } from 'react';
import { Feed } from '@/types/feed';
import regionData from '@/data/regions.json';
import LoadingSpinner from '@/components/LoadingSpinner';
import { showToast } from '@/utils/toastHelper';
import { PostgrestError } from '@supabase/supabase-js';

const FEEDS_PER_PAGE = 4;

type FeedListClientProps = {
  initialFeeds: Feed[];
  SupabaseError: PostgrestError | null;
  userId: string | null;
};

function FeedListClient({
  initialFeeds,
  SupabaseError,
  userId,
}: FeedListClientProps) {
  const supabase = createClient();
  const { ref, inView } = useInView();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    if (SupabaseError) {
      showToast('error', '피드 목록을 불러오는 중 오류가 발생했습니다.');
    }
  }, [SupabaseError]);

  const fetchFeeds = async ({ pageParam = 1 }) => {
    let query = supabase
      .from('Feeds')
      .select(
        `*, Users(profileImage, nickname), FeedLikes(id), FeedComments(id)`,
      );

    if (sortOption === 'latest') {
      query = query.order('createdAt', { ascending: false });
    }

    query = query.range(
      pageParam * FEEDS_PER_PAGE,
      (pageParam + 1) * FEEDS_PER_PAGE - 1,
    );

    if (selectedRegion) {
      query = query.eq('region', selectedRegion);
    }

    const { data, error } = await query;

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
    refetch,
  } = useInfiniteQuery({
    queryKey: ['feeds', selectedRegion, sortOption],
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

  useEffect(() => {
    refetch();
  }, [selectedRegion, refetch]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const sortedFeeds = useMemo(() => {
    if (!data) return [];

    const allFeeds = data.pages.flatMap((page) => page);

    switch (sortOption) {
      case 'mostLikes':
        return [...allFeeds].sort(
          (a, b) => b.FeedLikes.length - a.FeedLikes.length,
        );
      case 'mostComments':
        return [...allFeeds].sort(
          (a, b) => b.FeedComments.length - a.FeedComments.length,
        );
      default:
        return allFeeds;
    }
  }, [data, sortOption]);

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex space-x-4 ml-4">
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className="p-2 border rounded"
        >
          <option value="">모든 지역</option>
          {regionData.region.map((r) => (
            <option key={r.code} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="latest">최신순</option>
          <option value="mostLikes">찜한순</option>
          <option value="mostComments">댓글순</option>
        </select>
      </div>

      <div className="bg-gray0 p-4">
        <div className="grid grid-cols-1 gap-4">
          {sortedFeeds.map((feed) => (
            <FeedListItem
              key={feed.id}
              feed={feed}
              likesCount={feed.FeedLikes.length}
              commentsCount={feed.FeedComments.length}
              userId={userId}
            />
          ))}
        </div>
        <div ref={ref} className="text-sub2 text-center py-4">
          {isFetchingNextPage ? (
            <LoadingSpinner />
          ) : hasNextPage ? (
            '더 보기'
          ) : (
            '더 이상 보여줄 피드가 없어요!'
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedListClient;
