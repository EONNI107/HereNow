'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchForm from '../MainPage/SearchElements/SearchForm';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import WebHeader from '@/app/(webmain)/_componets/WebHeader';

function HeaderMain() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

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
  if (typeof window !== 'undefined') {
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
                    className="absolute left-1/2 transform -translate-x-1/2 font-['양진체'] text-blue4 text-xl cursor-pointer"
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
  if (typeof window === 'undefined') return;
}

export default HeaderMain;
