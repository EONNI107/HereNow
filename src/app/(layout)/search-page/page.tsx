'use client';

import { searchApi } from '@/components/MainPage/api/searchApi';
import SearchFeed from '@/components/MainPage/Search/SearchFeed';
import SearchItem from '@/components/MainPage/Search/SearchItem';
import { NearbyPlace } from '@/types/localDetails';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export type SearchedType = Omit<NearbyPlace, 'dist'>;

function SeachDetailPage() {
  const [searchData, setSearchData] = useState<SearchedType[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isBorderShow, setIsBorderShow] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('q') as string;

  const handleFeedClick = () => {
    setIsBorderShow(true);
    setIsChange(false);
  };
  const handleFestivalClick = () => {
    setIsBorderShow(false);
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full text-[18px] font-normal text-sub2 bg-[#FFF]">
        <div
          onClick={handleFeedClick}
          className={`cursor-pointer py-4 px-3 flex justify-center w-full ${
            isBorderShow && 'border-b-[3px] text-main border-b-blue4'
          }`}
        >
          피드
        </div>
        <div
          onClick={handleFestivalClick}
          className={`cursor-pointer py-4 px-3 flex justify-center w-full ${
            !isBorderShow && 'border-b-[3px] text-main border-b-blue4'
          }`}
        >
          로컬
        </div>
      </div>
      {isChange ? (
        <>
          <SearchItem searchValue={searchValue} />
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
