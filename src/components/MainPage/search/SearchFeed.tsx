'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SearchFeedItem from './SearchFeedItem';
import axios from 'axios';
import { TableFeedType } from '@/types/mainType';
import SkeletonSearchItem from '../Skeleton/SkeletonSearchItem';

type searchProps = {
  searchValue: string;
};

function SearchFeed({ searchValue }: searchProps) {
  const [searchFeedItems, setSearchFeedItems] = useState<TableFeedType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortedItems, setSortItems] = useState<TableFeedType[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  useEffect(() => {
    searchFeedData();
  }, [searchValue]);
  const searchFeedData = async () => {
    const res = await axios.get('/api/supabase-searchfeed', {
      params: {
        searchValue,
      },
    });
    const Feeditems = res.data.data as TableFeedType[];

    setSearchFeedItems(Feeditems);
    setIsLoading(false);
  };
  const handleAttractionsClick = async () => {
    const sortedRes = await axios.post('/api/supabase-sortedfeed', {
      title: '여행',
      searchValue,
    });
    const sortedarrs = sortedRes.data.data as TableFeedType[];
    setSortItems(sortedarrs);
    setIsSorted(false);
  };
  const handleCultureClick = async () => {
    const sortedRes = await axios.post('/api/supabase-sortedfeed', {
      title: '문화',
      searchValue,
    });
    const sortedarrs = sortedRes.data.data as TableFeedType[];
    setSortItems(sortedarrs);
    setIsSorted(false);
  };

  const handleRestaurantClick = async () => {
    const sortedRes = await axios.post('/api/supabase-sortedfeed', {
      title: '맛집',
      searchValue,
    });
    const sortedarrs = sortedRes.data.data as TableFeedType[];
    setSortItems(sortedarrs);
    setIsSorted(false);
  };

  const handleFestivalClick = async () => {
    const sortedRes = await axios.post('/api/supabase-sortedfeed', {
      title: '축제',
      searchValue,
    });
    const sortedarrs = sortedRes.data.data as TableFeedType[];
    setSortItems(sortedarrs);
    setIsSorted(false);
  };

  return (
    <>
      <div className="flex w-full border">
        <div className="grow">정렬</div>
        <div className="grow" onClick={handleAttractionsClick}>
          관광명소
        </div>
        <div className="grow" onClick={handleCultureClick}>
          문화시설
        </div>
        <div className="grow" onClick={handleRestaurantClick}>
          맛집
        </div>
        <div className="grow" onClick={handleFestivalClick}>
          행사
        </div>
      </div>
      <div className="w-full px-5 py-5">
        <div className="w-full rounded-lg bg-[#FFF4F0] flex">
          <div>
            <Image src="/Save.png" alt="피드아이콘" width={20} height={20} />
          </div>
          <div>
            <h2>피드</h2>
            <p>사람들끼리 공유한 모든 여행 꿀팁을 볼 수 있어요</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonSearchItem key={index} />
            ))
          : isSorted
          ? searchFeedItems.map((item) => (
              <SearchFeedItem item={item} key={item.id} />
            ))
          : sortedItems.map((item) => (
              <SearchFeedItem item={item} key={item.id} />
            ))}
      </div>
    </>
  );
}
export default SearchFeed;
