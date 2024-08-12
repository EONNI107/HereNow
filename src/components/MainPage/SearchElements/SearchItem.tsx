import React, { useState, useEffect } from 'react';
import SearchFilterItem from './SearchFilterItem';
import { searchApi } from '@/components/MainPage/api/searchApi';
import SkeletonSearchItem from '@/components/MainPage/Skeleton/SkeletonSearchItem';
import SearchIntroduction from '@/components/MainPage/SearchElements/SearchIntroduction';
import { SearchedType } from '@/app/(layout)/search-page/page';

type SearchItemProps = {
  searchValue: string;
};

const SearchItem = ({ searchValue }: SearchItemProps) => {
  const [resData, setResData] = useState<SearchedType[]>([]);
  const [isShow, setIsShow] = useState<boolean>(true);
  const [basicData, setBasicData] = useState<SearchedType[]>([]);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  const [clickClass, setClickClass] = useState<{
    title: string;
    classname: string;
  }>({
    title: '',
    classname: '',
  });

  useEffect(() => {
    const fetchBasicData = async () => {
      const res = await searchApi(searchValue, '/api/search');
      setBasicData(res);
      setIsSkeleton(false);
    };
    fetchBasicData();
  }, [searchValue]);

  const handleCategoryClick = async (title: string, apiType: number) => {
    const res: SearchedType[] = await searchApi(
      searchValue,
      '/api/search',
      apiType,
    );
    setResData(res);
    setIsShow(false);
    setClickClass({
      title,
      classname: 'border-blue4 bg-blue0 text-main',
    });
  };

  const categories = [
    { title: '관광명소', apiType: 12 },
    { title: '문화시설', apiType: 14 },
    { title: '맛집', apiType: 39 },
    { title: '행사', apiType: 15 },
  ];

  return (
    <>
      <div className="flex w-full py-2 px-4 bg-white">
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
                handleCategoryClick(category.title, category.apiType)
              }
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col py-[13px] px-4 gap-4 bg-gray0">
        <SearchIntroduction searchValue={searchValue} />
        <div className="w-full flex flex-col gap-4">
          {isSkeleton
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonSearchItem key={index} />
              ))
            : isShow
            ? basicData?.map((item) => (
                <SearchFilterItem item={item} key={item.contentid} />
              ))
            : resData?.map((item) => (
                <SearchFilterItem item={item} key={item.contentid} />
              ))}
        </div>
      </div>
    </>
  );
};

export default SearchItem;
