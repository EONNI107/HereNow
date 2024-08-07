'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SkeletonSearchItem from '@/components/MainPage/Skeleton/SkeletonSearchItem';
import SearchIntroduction from '@/components/MainPage/SearchElements/SearchIntroduction';
import { TableFeedType } from '@/types/mainTypes';
import { showToast } from '@/utils/toastHelper';
import SearchFeedItem from '@/components/MainPage/SearchElements/SearchFeedItem';

type searchProps = {
  searchValue: string;
};

const SearchFeed = ({ searchValue }: searchProps) => {
  const [searchFeedItems, setSearchFeedItems] = useState<TableFeedType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortedItems, setSortedItems] = useState<TableFeedType[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [clickClass, setClickClass] = useState<{
    title: string;
    classname: string;
  }>({
    title: '',
    classname: '',
  });

  useEffect(() => {
    const searchFeedData = async () => {
      try {
        const res = await axios.get('/api/supabase-searchfeed', {
          params: {
            searchValue,
          },
        });
        setSearchFeedItems(res.data.data as TableFeedType[]);
      } catch (error) {
        showToast('error', '피드를 불러오는데 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    searchFeedData();
  }, [searchValue]);

  const handleCategoryClick = async (category: string, title: string) => {
    setClickClass({
      title,
      classname: 'border-blue4 bg-blue0 text-main',
    });

    try {
      const sortedRes = await axios.post('/api/supabase-sortedfeed', {
        title: category,
        searchValue,
      });
      setSortedItems(sortedRes.data.data as TableFeedType[]);
    } catch (error) {
      showToast('error', '카테고리 피드를 불러오는데 오류가 발생했습니다.');
    } finally {
      setIsSorted(false);
    }
  };

  const categories = [
    { title: '관광명소', label: '관광명소' },
    { title: '문화시설', label: '문화시설' },
    { title: '맛집', label: '맛집' },
    { title: '행사', label: '행사' },
  ];

  return (
    <>
      <div className="flex w-full py-2 px-4 bg-[#FFF]">
        <div className="flex w-full items-center gap-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className={`py-1 cursor-pointer w-full flex justify-center rounded-2xl border-[2px] ${
                clickClass.title === category.title
                  ? clickClass.classname
                  : 'border-sub2 bg-white text-sub1'
              }`}
              onClick={() =>
                handleCategoryClick(category.title, category.label)
              }
            >
              {category.label}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col py-[13px] px-4 gap-4 bg-gray0">
        <SearchIntroduction isIntroduce={false} />
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
};

export default SearchFeed;
