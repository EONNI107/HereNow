'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import SearchForm from '@/components/MainPage/SearchElements/SearchForm';
import WebHeader from '@/app/(webmain)/_componets/WebHeader';

function HeaderLayout() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // 윈도우 창의 크기를 감지하는 함수
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1240);
    };

    // 컴포넌트가 처음 마운트 될 때와 창 크기 변화 시에 실행
    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const [isBackground, setIsBackground] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const searchParams = params.get('q');
  const isMainPage = pathname === '/';
  const handleBack = () => {
    if (pathname === '/feed') {
      return router.push('/');
    }
    if (pathname.startsWith('/feed-detail/')) {
      return router.push('/feed');
    }
    router.back();
  };
  const handleShow = () => {
    setIsBackground(!isBackground);
    router.refresh();
  };
  return (
    <>
      {isMobile ? (
        <header className="bg-white fixed z-10 right-0 p-1 w-full left-0 mx-auto">
          {isBackground ? (
            <div className="flex justify-center bg-white h-screen">
              <SearchForm setIsbg={setIsBackground} />
              <button
                className="absolute top-3 right-2"
                onClick={() => setIsBackground(!isBackground)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center h-[50px]">
              {!isMainPage && (
                <button onClick={handleBack}>
                  <ChevronLeftIcon className="w-6 h-6 ml-4" />
                </button>
              )}

              {searchParams ? (
                <p className="absolute left-1/2 transform -translate-x-1/2 font-['양진체'] text-blue4 text-xl">
                  {searchParams}
                </p>
              ) : (
                <p
                  onClick={() => {
                    router.push('/');
                  }}
                  className="absolute left-1/2 transform -translate-x-1/2 font-['양진체'] text-blue4 text-xl pb-2 cursor-pointer"
                >
                  지금,여기
                </p>
              )}

              <button
                onClick={handleShow}
                className="absolute right-2 z-10 mr-4"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            </div>
          )}
        </header>
      ) : (
        <WebHeader />
      )}
    </>
  );
}
export default HeaderLayout;
