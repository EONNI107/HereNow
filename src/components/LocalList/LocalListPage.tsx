'use client';

import useLocalList from '@/hooks/useLocalList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import LocalListItem from './LocalListItem';
import ContentTypeFilter from './ContentTypeFilter';
import RegionHeader from './RegionHeader';
import LoadingState from './LoadingState';
import SkeletonCard from './SkeletonCard';
import { Item } from '@/types/localList';

function LocalListPage({ region }: { region: string }) {
  const router = useRouter();
  const [contentType, setContentType] = useState('12');
  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLocalList(region, contentType);

  if (error) {
    return <LoadingState error={error} />;
  }

  return (
    <div className="max-w-md mx-auto my-4">
      <RegionHeader region={region} />
      <ContentTypeFilter
        selectedContentType={contentType}
        onContentTypeChange={setContentType}
      />
      {isPending ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        data && (
          <div className="grid grid-cols-1 gap-4">
            {data.localList.map((item: Item) => (
              <LocalListItem key={item.contentid} item={item} region={region} />
            ))}
          </div>
        )
      )}
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

export default LocalListPage;
