'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchItem from '../MainPage/SearchElements/SearchItem';
import SearchFeed from '../MainPage/SearchElements/SearchFeed';
import WebSearchPage from '@/app/(webmain)/websearch-page/page';
import { NearbyPlace } from '@/types/localDetails';
export type SearchedType = Omit<NearbyPlace, 'dist'>;

function SearchMain() {
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isBorderShow, setIsBorderShow] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('q') as string;
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1000);

  const handleFeedClick = () => {
    setIsBorderShow(true);
    setIsChange(false);
  };
  const handleFestivalClick = () => {
    setIsBorderShow(false);
    setIsChange(true);
  };
  useEffect(() => {
    // 윈도우 창의 크기를 감지하는 함수
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    // 컴포넌트가 처음 마운트 될 때와 창 크기 변화 시에 실행
    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);
  if (typeof window !== 'undefined') {
    return (
      <>
        {isMobile ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full text-[18px] font-normal text-sub2 bg-white">
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
        ) : (
          <WebSearchPage />
        )}
      </>
    );
  }
  if (typeof window === 'undefined') return;
}

export default SearchMain;
