'use client';

import useLocalList from '@/hooks/useLocalList';
import { useState } from 'react';
import InfiniteScroll from '@/components/LocalList/InfiniteScroll';
import LocalListItem from '@/components/LocalList/LocalListItem';
import ContentTypeFilter from '@/components/LocalList/ContentTypeFilter';
import LoadingState from '@/components/LocalList/LoadingState';
import SkeletonCard from '@/components/LocalList/SkeletonCard';
import { Item } from '@/types/localList';
import { getRegionNameKorean } from '@/utils/getRegionName';
import regionData from '@/data/regions.json';

function LocalListPage({ region }: { region: string }) {
  const [contentType, setContentType] = useState('12');
  const [area, setArea] = useState('');
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

  const areas = regionData.region.find((area) => area.ename === region);

  console.log(area);
  const filteredList = data?.localList.filter((item: Item) =>
    item.addr1.includes(area),
  );

  return (
    <div>
      <ContentTypeFilter
        selectedContentType={contentType}
        onContentTypeChange={setContentType}
      />
      <div className="flex justify-center">
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="p-2 border border-gray3 rounded"
        >
          <option value="">모든 지역</option>
          {areas?.sigungu.map((a) => (
            <option key={a.code} value={a.code}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden xl:block text-center my-8">
        <h3 className="text-[32px] text-blue4 font-semibold mb-3">
          {getRegionNameKorean(region)} 주변에 갈만한 곳은?
        </h3>
        <p className="text-[20px] text-sub1 font-medium mb-4">
          지금, 여기에서만 알려주는 장소를 찾아보세요
        </p>
      </div>
      <div className="flex justify-center">
        <div className="pt-5 bg-gray0 xl:bg-white xl:max-w-[1240px]">
          {isPending ? (
            <div className="grid grid-cols-1 gap-4 justify-items-center xl:grid-cols-2 xl:gap-8 xl:justify-items-stretch xl:px-4">
              {[...Array(5)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            data && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8 xl:px-4">
                {filteredList?.map((item: Item) => (
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
    </div>
  );
}

export default LocalListPage;
