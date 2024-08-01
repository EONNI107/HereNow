'use client';

import { searchApi } from '@/components/MainPage/api/searchApi';
import SearchFeed from '@/components/MainPage/search/SearchFeed';
import SearchItem from '@/components/MainPage/search/SearchItem';
import { NearbyPlace } from '@/types/localDetails';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export type SearchedType = Omit<NearbyPlace, 'dist'>;

function SeachDetailPage() {
  const [searchData, setSearchData] = useState<SearchedType[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('q') as string;

  const handleFeedClick = () => {
    setIsChange(false);
  };
  const handleFestivalClick = () => {
    setIsChange(true);
  };
  useEffect(() => {
    const searched = async () => {
      const res: SearchedType[] = await searchApi(searchValue, '/api/search');
      setSearchData(res);
    };
    searched();
  }, [searchValue]);

  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
      <div className="flex w-full">
        <div onClick={handleFeedClick} className="flex justify-center w-full">
          피드
        </div>
        <div
          onClick={handleFestivalClick}
          className="flex justify-center w-full"
        >
          행사
        </div>
      </div>

      {isChange ? (
        <>
          <SearchItem searchData={searchData} searchValue={searchValue} />
        </>
      ) : (
        <>
          <SearchFeed searchValue={searchValue} />
        </>
      )}
    </div>
  );
}
export default SeachDetailPage;
