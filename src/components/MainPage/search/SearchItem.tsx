'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { searchApi } from '../api/searchApi';
import { SearchedType } from '@/app/search-page/page';
import { useRouter } from 'next/navigation';
import SkeletonSearchItem from '../Skeleton/SkeletonSearchItem';
import { HeartIcon } from '@heroicons/react/24/outline';
type SearchItemProps = {
  searchData: SearchedType[];
  searchValue: string;
};
function SearchItem({ searchData, searchValue }: SearchItemProps) {
  const [resData, setResData] = useState<SearchedType[]>([]);
  const [resDatas, setResDatas] = useState<SearchedType[][]>([]);
  const [isShow, setIsShow] = useState<boolean>(true);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  const [clickClass, setClickClass] = useState<{
    title: string;
    classname: string;
  }>({
    title: '',
    classname: '',
  });
  const router = useRouter();
  useEffect(() => {
    const datas = async () => {
      const res: SearchedType[] = await searchApi(
        searchValue,
        '/api/search',
        12,
      );
      const res2: SearchedType[] = await searchApi(
        searchValue,
        '/api/search',
        14,
      );
      const res3: SearchedType[] = await searchApi(
        searchValue,
        '/api/search',
        39,
      );
      const res4: SearchedType[] = await searchApi(
        searchValue,
        '/api/search',
        15,
      );
      const resarrs = [res, res2, res3, res4];
      setResDatas(resarrs);
      setIsSkeleton(false);
    };
    datas();
  }, [searchValue]);

  const handleAttractionsClick = () => {
    setClickClass({
      title: '여행',
      classname: 'border-[#118DFF] bg-[#DBEEFF] text-[#111111]',
    });
    const firstdata = resDatas[0];
    setResData(firstdata);
    setIsShow(false);
  };
  const handleCultureClick = () => {
    setClickClass({
      title: '문화',
      classname: 'border-[#118DFF] bg-[#DBEEFF] text-[#111111]',
    });
    const firstdata = resDatas[1];
    setResData(firstdata);
    setIsShow(false);
  };
  const handleRestaurantClick = () => {
    setClickClass({
      title: '맛집',
      classname: 'border-[#118DFF] bg-[#DBEEFF] text-[#111111]',
    });
    const firstdata = resDatas[2];
    setResData(firstdata);
    setIsShow(false);
  };
  const handleFestivalClick = () => {
    setClickClass({
      title: '행사',
      classname: 'border-[#118DFF] bg-[#DBEEFF] text-[#111111]',
    });
    const firstdata = resDatas[3];
    setResData(firstdata);
    setIsShow(false);
  };

  const handleClick = (contentid: string) => {
    router.push(`/local/details/${contentid}`);
  };
  return (
    <>
      <div className="flex w-full pt-4 px-4">
        <div className="flex w-full items-center gap-3">
          <div
            className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
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
            }`}
            onClick={handleRestaurantClick}
          >
            맛집
          </div>
          <div
            className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
              clickClass.title === '행사'
                ? clickClass.classname
                : 'border-[#7D8591] bg-white text-[#505050]'
            }`}
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
              src="/Event.png"
              alt="행사아이콘"
              width={30}
              height={25}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">행사</h2>
            <p className="text-sm">
              {searchValue}의 가볼만한 곳을 찾아드릴게요!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {isSkeleton ? (
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonSearchItem key={index} />
          ))
        ) : isShow ? (
          <>
            {' '}
            {searchData?.map((item) => (
              <div
                key={item.contentid}
                className="w-full flex gap-3 cursor-pointer"
                onClick={() => handleClick(item.contentid)}
              >
                <div className="w-[100px] h-[100px]">
                  <Image
                    src={item.firstimage}
                    alt="이미지"
                    width={100}
                    height={100}
                    className="rounded-lg border w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between w-[300px] items-center px-4 text-[#000] font-semibold text-lg">
                  <p>{item.title}</p>
                  <div>
                    <HeartIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {' '}
            {resData?.map((item) => (
              <div
                key={item.contentid}
                className="w-full flex gap-3 cursor-pointer"
                onClick={() => handleClick(item.contentid)}
              >
                <div className="w-[100px] h-[100px]">
                  <Image
                    src={item.firstimage}
                    alt="이미지"
                    width={100}
                    height={100}
                    className="rounded-lg border w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between w-[300px] items-center px-4  text-[#000] font-semibold text-lg">
                  <p>{item.title}</p>
                  <div>
                    <HeartIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
export default SearchItem;
