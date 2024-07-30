'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { searchApi } from '../api/searchApi';
import { SearchedType } from '@/app/search-page/page';
import { useRouter } from 'next/navigation';
import SkeletonItem from '../Skeleton/SkeletonItem';
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
    setIsShow(false);
    const firstdata = resDatas[0];
    setResData(firstdata);
  };
  const handleCultureClick = () => {
    setIsShow(false);
    const firstdata = resDatas[1];
    setResData(firstdata);
  };
  const handleRestaurantClick = () => {
    setIsShow(false);
    const firstdata = resDatas[2];
    setResData(firstdata);
  };
  const handleFestivalClick = () => {
    setIsShow(false);
    const firstdata = resDatas[3];
    setResData(firstdata);
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
        {isShow ? (
          isSkeleton ? (
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonItem key={index} />
            ))
          ) : (
            <>
              {searchData?.map((item) => (
                <div key={item.contentid} className="w-full flex gap-3">
                  <Image
                    src={item.firstimage}
                    alt="이미지"
                    width={100}
                    height={100}
                  />
                  <p className="">{item.title}</p>
                  <div className="">
                    <Image
                      src="/heart.png"
                      alt="좋아요"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              ))}
            </>
          )
        ) : isSkeleton ? (
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonItem key={index} />
          ))
        ) : (
          <>
            {resData?.map((i) => (
              <div
                key={i.contentid}
                className="w-full flex gap-3"
                onClick={() => handleClick(i.contentid)}
              >
                <Image
                  src={i.firstimage}
                  alt="이미지"
                  width={100}
                  height={100}
                />
                <p className="">{i.title}</p>
                <div className="">
                  <Image src="/heart.png" alt="좋아요" width={20} height={20} />
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
