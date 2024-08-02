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
  const [clickClass, setClickClass] = useState<{
    title: string;
    classname: string;
  }>({
    title: '',
    classname: '',
  });
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
    setClickClass({
      title: '여행',
      classname: 'border-[#118DFF] bg-[#DBEEFF] text-[#111111]',
    });

    const sortedRes = await axios.post('/api/supabase-sortedfeed', {
      title: '여행',
      searchValue,
    });
    const sortedarrs = sortedRes.data.data as TableFeedType[];
    setSortItems(sortedarrs);
    setIsSorted(false);
  };
  const handleCultureClick = async () => {
    setClickClass({
      title: '문화',
      classname: 'border-[#118DFF] bg-[#DBEEFF] text-[#111111]',
    });
    const sortedRes = await axios.post('/api/supabase-sortedfeed', {
      title: '문화',
      searchValue,
    });
    const sortedarrs = sortedRes.data.data as TableFeedType[];
    setSortItems(sortedarrs);
    setIsSorted(false);
  };

  const handleRestaurantClick = async () => {
    setClickClass({
      title: '맛집',
      classname: 'border-[#118DFF] bg-[#DBEEFF] text-[#111111]',
    });
    const sortedRes = await axios.post('/api/supabase-sortedfeed', {
      title: '맛집',
      searchValue,
    });
    const sortedarrs = sortedRes.data.data as TableFeedType[];
    setSortItems(sortedarrs);
    setIsSorted(false);
  };

  const handleFestivalClick = async () => {
    setClickClass({
      title: '행사',
      classname: 'border-[#118DFF] bg-[#DBEEFF] text-[#111111]',
    });
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
      <div className="flex w-full pt-4 px-4">
        <div className="flex w-full items-center gap-3">
          <div
            className={`py-1 cursor-pointer w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '여행'
                ? clickClass.classname
                : 'border-[#7D8591] bg-white text-[#505050]'
            }`}
            onClick={handleAttractionsClick}
          >
            관광명소
          </div>
          <div
            className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '문화'
                ? clickClass.classname
                : 'border-[#7D8591] bg-white text-[#505050]'
            }`}
            onClick={handleCultureClick}
          >
            문화시설
          </div>
          <div
            className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '맛집'
                ? clickClass.classname
                : 'border-[#7D8591] bg-white text-[#505050]'
            } `}
            onClick={handleRestaurantClick}
          >
            맛집
          </div>
          <div
            className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '행사'
                ? clickClass.classname
                : 'border-[#7D8591] bg-white text-[#505050]'
            } `}
            onClick={handleFestivalClick}
          >
            행사
          </div>
        </div>
      </div>
      <div className="w-full px-5 py-5">
        <div className="pl-4 py-3 w-full rounded-lg bg-[#FFF4F0] flex gap-2">
          <div className="mt-[3px] flex w-[30px] h-[25px] items-center">
            <Image
              src="/Save.png"
              alt="피드아이콘"
              width={30}
              height={25}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">피드</h2>
            <p className="text-sm">
              사람들끼리 공유한 모든 여행 꿀팁을 볼 수 있어요
            </p>
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
