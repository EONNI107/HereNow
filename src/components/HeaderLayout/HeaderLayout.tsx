'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchForm from '../MainPage/search/SearchForm';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

function HeaderLayout() {
  const [isBackground, setIsBackground] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const searchParams = params.get('q');
  const isMainPage = pathname === '/';
  const handleBack = () => {
    if (pathname === '/') {
      return;
    }
    router.back();
  };
  const handleShow = () => {
    setIsBackground(!isBackground);
    router.refresh();
  };
  return (
    <header className="bg-white fixed z-10 right-0 max-w-[375px] w-full left-0 mx-auto">
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
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          )}

          {searchParams ? (
            <p className="absolute left-1/2 transform -translate-x-1/2 font-['양진체'] text-[#118DFF] text-xl">
              {searchParams}
            </p>
          ) : (
            <p
              onClick={() => {
                router.push('/');
              }}
              className="absolute left-1/2 transform -translate-x-1/2 font-['양진체'] text-[#118DFF] text-xl pb-2 cursor-pointer"
            >
              지금,여기
            </p>
          )}

          <button onClick={handleShow} className="absolute right-2 z-10">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </header>
  );
}
export default HeaderLayout;
