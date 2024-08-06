'use client';

import useLocalList from '@/hooks/useLocalList';
import { useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import LocalListItem from './LocalListItem';
import ContentTypeFilter from './ContentTypeFilter';
import LoadingState from './LoadingState';
import SkeletonCard from './SkeletonCard';
import { Item } from '@/types/localList';

function LocalListPage({ region }: { region: string }) {
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
    <div>
      <ContentTypeFilter
        selectedContentType={contentType}
        onContentTypeChange={setContentType}
      />
      <div className="pt-5 bg-gray0">
        {isPending ? (
          <div className="grid grid-cols-1 gap-4 justify-items-center">
            {[...Array(5)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          data && (
            <div className="grid grid-cols-1 gap-4 justify-items-center">
              {data.localList.map((item: Item) => (
                <LocalListItem
                  key={item.contentid}
                  item={item}
                  region={region}
                />
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
    </div>
  );
}

export default LocalListPage;
