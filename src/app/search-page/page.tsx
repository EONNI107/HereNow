'use client';

import { searchApi } from '@/components/MainPage/api/searchApi';
import SearchFeed from '@/components/MainPage/search/SearchFeed';
import SearchItem from '@/components/MainPage/search/SearchItem';
import { itemtype } from '@/types/maintype';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export type searchedtype = Omit<itemtype, 'dist'>;

export default function SeachDetailPage() {
  const [searchdata, setSearchdata] = useState<searchedtype[]>([]);
  const [ischange, setIschange] = useState<boolean>(false);
  const searchparams = useSearchParams();
  const searchValue = searchparams.get('q') as string;

  const handleFeedClick = () => {
    setIschange(false);
  };
  const handleFestivalClick = () => {
    setIschange(true);
  };
  useEffect(() => {
    const searched = async () => {
      const res: searchedtype[] = await searchApi(searchValue, '/api/search');
      // ui저장 state
      setSearchdata(res);
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

      {ischange ? (
        <>
          <SearchItem searchdata={searchdata} searchValue={searchValue} />
        </>
      ) : (
        <>
          <SearchFeed />
        </>
      )}
    </div>
  );
}
