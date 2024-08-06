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
      classname: 'border-blue4 bg-blue0 text-main',
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
      classname: 'border-blue4 bg-blue0 text-main',
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
      classname: 'border-blue4 bg-blue0 text-main',
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
      classname: 'border-blue4 bg-blue0 text-main',
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
      <div className="flex w-full py-2 px-4">
        <div className="flex w-full items-center gap-3">
          <div
            className={`py-1 cursor-pointer w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '여행'
                ? clickClass.classname
                : 'border-sub2 bg-white text-sub1'
            }`}
            onClick={handleAttractionsClick}
          >
            관광명소
          </div>
          <div
            className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '문화'
                ? clickClass.classname
                : 'border-sub2 bg-white text-sub1'
            }`}
            onClick={handleCultureClick}
          >
            문화시설
          </div>
          <div
            className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '맛집'
                ? clickClass.classname
                : 'border-sub2 bg-white text-sub1'
            } `}
            onClick={handleRestaurantClick}
          >
            맛집
          </div>
          <div
            className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '행사'
                ? clickClass.classname
                : 'border-sub2 bg-white text-sub1'
            } `}
            onClick={handleFestivalClick}
          >
            행사
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col py-[13px] px-4 gap-4 bg-gray0">
        <div className="px-4 py-2 w-full rounded-lg bg-orange0 h-[72px]">
          <div className="w-full flex h-full gap-[7px]">
            <div className="flex w-[35px] h-[25px] items-center">
              <Image
                src="/Save.png"
                alt="피드아이콘"
                width={20}
                height={20}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-lg">피드</h2>
              <p className="text-sm">
                사람들끼리 공유한 모든 여행 꿀팁을 볼 수 있어요
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
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
      </div>
    </>
  );
}
export default SearchFeed;
