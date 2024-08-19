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
    <div className="lg:container xl:max-w-6xl px-4">
      <div className="mb-4 xl:bg-gray0 xl:p-4 xl:rounded-lg xl:border xl:border-gray8">
        <h2 className="hidden xl:block text-[20px] font-bold mb-2 text-center">
          빠르게 보고싶은 글이 있나요?
        </h2>
        <div className="flex space-x-4 xl:justify-center xl:items-center">
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="p-2 border rounded w-full xl:w-[500px]"
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
            className="p-2 border rounded w-full xl:w-auto"
          >
            <option value="latest">최신순</option>
            <option value="mostLikes">찜한순</option>
            <option value="mostComments">댓글순</option>
          </select>
        </div>
      </div>
      <div className="hidden xl:block text-center my-8">
        <h3 className="text-[32px] text-blue4 font-semibold mb-3">
          로컬들이 공유하는 피드는?
        </h3>
        <p className="text-[20px] text-sub1 font-medium mb-4">
          로컬들이 몰래 알려주는 장소를 찾아보세요
        </p>
      </div>
      <div className="bg-gray0 p-4 xl:bg-white">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-x-6 xl:gap-y-16">
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
