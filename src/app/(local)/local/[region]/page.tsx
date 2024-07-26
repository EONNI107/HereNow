'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import ContentTypeFilter from '@/components/LocalList/ContentTypeFilter';
import SkeletonCard from '@/components/LocalList/SkeletonCard';
import { Item } from '@/types/localList';
import {
  getRegionNameKorean,
  getRegionNameEnglish,
} from '@/utils/getRegionName';
import { getSigunguName } from '@/utils/getSigunguName';
import { region } from '@/data/region.json';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
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
        contentType === '15'
          ? `/api/local-event/${params.region}?pageNo=${pageParam}`
          : `/api/local-list/${params.region}?pageNo=${pageParam}&contentTypeId=${contentType}`,
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

  const defaultImage = '/default-image.png';
  const selectedRegion = region.find(
    (r) => r.ename.toLowerCase() === params.region.toLowerCase(),
  );

  if (isPending) {
    return (
      <div className="max-w-md mx-auto">
        <div className="relative h-48 mb-4 bg-gray-200 animate-pulse"></div>

        <div className="h-10 bg-gray-200 mb-4 animate-pulse"></div>

        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div>에러가 발생했습니다. {error.message}</div>;

  return (
    <div className="max-w-md mx-auto">
      {/* 상단 이미지 */}
      <div className="relative h-48 mb-4">
        <Image
          src="/busan-bridge.jpg"
          alt={`${getRegionNameKorean(params.region)} 이미지`}
          fill={true}
          priority={true}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">
            {getRegionNameEnglish(params.region).toUpperCase()}
          </h1>
        </div>
      </div>

      <ContentTypeFilter
        selectedContentType={contentType}
        onContentTypeChange={handleContentTypeChange}
      />

      {data && data.localList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {data.localList.map((item) => (
            <Link
              href={`/local/details/${item.contentid}`}
              key={item.contentid}
              className="border rounded-lg overflow-hidden shadow-lg relative"
            >
              <div className="relative">
                <Image
                  src={item.firstimage || defaultImage}
                  width={300}
                  height={200}
                  alt={item.title}
                  className="object-cover w-full h-48"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-1/2 flex flex-col justify-end items-center p-4">
                  <p className="text-sm text-white mb-1 text-center">
                    {getRegionNameKorean(params.region)}{' '}
                    {getSigunguName(
                      selectedRegion?.code || '',
                      item.sigungucode,
                    )}
                  </p>
                  <h2 className="text-xl font-bold text-white text-center">
                    {item.title}
                  </h2>
                </div>
              </div>
            </Link>
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
