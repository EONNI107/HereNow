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
import regionData from '@/data/region.json';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

type LocalListData = {
  localList: Item[];
  totalPage: number;
};

function LocalListPage({ params }: { params: { region: string } }) {
  const router = useRouter();
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

  const regionImages: { [key: string]: string } = {
    seoul: '/Seoul.jpg',
    busan: '/Busan.jpg',
    incheon: '/Incheon.jpg',
    daejeon: '/Daejeon.jpg',
    daegu: '/Daegu.jpg',
    gwangju: '/Gwangju.jpg',
    sejong: '/Sejong.jpg',
    ulsan: '/Ulsan.jpg',
    jejudo: '/Jeju.jpg',
    gyeonggido: '/Gyeonggi.jpg',
    gangwondo: '/Gangwon.jpg',
    chungcheongbukdo: '/Chungbuk.jpg',
    chungcheongnamdo: '/Chungnam.jpg',
    gyeongsangbukdo: '/Gyeongbuk.jpg',
    gyeongsangnamdo: '/Gyeongnam.jpg',
    jeollabukdo: '/Jeonbuk.jpg',
    jeollanamdo: '/Jeonnam.jpg',
  };
  const normalizedRegion = params.region.toLowerCase().replace(/-/g, '');
  const selectedImage = regionImages[normalizedRegion];
  const defaultImage = '/No_Img.jpg';
  const selectedRegion = regionData.region.find(
    (r) => r.ename.toLowerCase() === params.region.toLowerCase(),
  );

  useEffect(() => {
    if (data && data.localList.length === 0) {
      router.push('/404');
    }
  }, [data, router]);

  if (isPending) {
    return (
      <div className="max-w-md mx-auto">
        <div className="relative h-48 mb-4">
          <Image
            src={selectedImage}
            alt={`${getRegionNameKorean(params.region)} 이미지`}
            width={300}
            height={200}
            priority={true}
            className="object-cover w-full h-48"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <h1 className="font-pretendard font-semibold text-[28px] text-white">
              {getRegionNameEnglish(params.region).toUpperCase()}
            </h1>
          </div>
        </div>

        <ContentTypeFilter
          selectedContentType={contentType}
          onContentTypeChange={handleContentTypeChange}
        />

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
      <div className="relative h-48 mb-4">
        <Image
          src={selectedImage}
          alt={`${getRegionNameKorean(params.region)} 이미지`}
          width={300}
          height={200}
          priority={true}
          className="object-cover w-full h-48"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <h1 className="font-pretendard font-semibold text-[28px] text-white">
            {getRegionNameEnglish(params.region).toUpperCase()}
          </h1>
        </div>
      </div>

      <ContentTypeFilter
        selectedContentType={contentType}
        onContentTypeChange={handleContentTypeChange}
      />

      {data && data.localList.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {data.localList.map((item) => (
            <Link
              href={`/local/details/${item.contentid}`}
              key={item.contentid}
              className="border rounded-3xl overflow-hidden shadow-xl relative"
            >
              <div className="relative h-48">
                <Image
                  src={item.firstimage || defaultImage}
                  width={300}
                  height={200}
                  alt={item.title}
                  className="object-cover w-full h-48"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-4">
                  <p className="font-pretendard font-regular text-sm text-white">
                    {getRegionNameKorean(params.region)}{' '}
                    {getSigunguName(
                      selectedRegion?.code || '',
                      item.sigungucode,
                    )}
                  </p>
                  <h2 className="font-pretendard font-semibold text-lg text-white mb-1">
                    {item.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
