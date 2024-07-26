'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import ContentTypeFilter from '@/components/LocalList/ContentTypeFilter';
import { Item } from '@/types/localList';
import { getRegionName } from '@/utils/getRegionName';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

type LocalListData = {
  localList: Item[];
  totalPage: number;
};

function LocalListPage({ params }: { params: { region: string } }) {
  const [contentType, setContentType] = useState('12');

  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<LocalListData, Error, LocalListData, string[], number>({
    queryKey: ['localList', params.region, contentType],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get<LocalListData>(
        `/api/local-list/${params.region}?pageNo=${pageParam}&contentTypeId=${contentType}`,
      );

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage, lastPageParam) => {
      return lastPageParam === lastPage.totalPage
        ? undefined
        : lastPageParam + 1;
    },
    select: (data) => ({
      localList: data.pages.flatMap((page) => page.localList),
      totalPage: data.pages[0].totalPage,
    }),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const handleContentTypeChange = (newContentType: string) => {
    setContentType(newContentType);
  };

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다. {error.message}</div>;

  const defaultImage = '/default-image.png';
  const regionName = getRegionName(params.region);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{regionName}의 정보 리스트</h1>
      <ContentTypeFilter
        selectedContentType={contentType}
        onContentTypeChange={handleContentTypeChange}
      />

      {data && data.localList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {data.localList.map((item) => (
            <div
              key={item.contentid}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={item.firstimage || defaultImage}
                width={300}
                height={200}
                alt="지역 관광 정보 이미지"
                className="object-cover w-full h-48"
                priority
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p>{item.addr1}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
      {hasNextPage && <div ref={ref} className="h-10" />}
      {isFetchingNextPage && hasNextPage && (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      {!hasNextPage && <p>모든 데이터를 불러왔습니다.</p>}
    </div>
  );
}

export default LocalListPage;
