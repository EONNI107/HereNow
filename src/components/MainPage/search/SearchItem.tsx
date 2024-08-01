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
    const firstdata = resDatas[0];
    setResData(firstdata);
    setIsShow(false);
  };
  const handleCultureClick = () => {
    const firstdata = resDatas[1];
    setResData(firstdata);
    setIsShow(false);
  };
  const handleRestaurantClick = () => {
    const firstdata = resDatas[2];
    setResData(firstdata);
    setIsShow(false);
  };
  const handleFestivalClick = () => {
    const firstdata = resDatas[3];
    setResData(firstdata);
    setIsShow(false);
  };

  const handleClick = (contentid: string) => {
    router.push(`/local/details/${contentid}`);
  };
  return (
    <>
      <div className="flex w-full border">
        <div className="shrink-0 px-1 py-1">정렬</div>
        <div className="flex border w-full items-center">
          <div
            className="w-full flex justify-center"
            onClick={handleAttractionsClick}
          >
            관광명소
          </div>
          <div
            className="w-full flex justify-center"
            onClick={handleCultureClick}
          >
            문화시설
          </div>
          <div
            className="w-full flex justify-center"
            onClick={handleRestaurantClick}
          >
            맛집
          </div>
          <div
            className="w-full flex justify-center"
            onClick={handleFestivalClick}
          >
            행사
          </div>
        </div>
      </div>
      <div className="w-full px-5 py-5">
        <div className="w-full rounded-lg bg-[#FFF4F0] flex">
          <div>
            <Image src="/Event.png" alt="행사아이콘" width={20} height={20} />
          </div>
          <div>
            <h2>행사</h2>
            <p>{searchValue}의 가볼만한 곳을 찾아드릴게요!</p>
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
                className="w-full flex gap-3"
                onClick={() => handleClick(item.contentid)}
              >
                <div className="w-[100px] h-[100px] relative">
                  <Image
                    src={item.firstimage}
                    alt="이미지"
                    fill
                    className="rounded-lg border"
                  />
                </div>
                <div className="flex justify-between w-[300px] items-center px-4">
                  <p>{item.title}</p>
                  <div>
                    <HeartIcon className="w-4 h-4" />
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
                className="w-full flex gap-3"
                onClick={() => handleClick(item.contentid)}
              >
                <div className="w-[100px] h-[100px] relative">
                  <Image
                    src={item.firstimage}
                    alt="이미지"
                    fill
                    className="rounded-lg border"
                  />
                </div>
                <div className="flex justify-between w-[300px] items-center px-4">
                  <p>{item.title}</p>
                  <div>
                    <Image
                      src="/heart.png"
                      alt="좋아요"
                      width={20}
                      height={20}
                    />
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
