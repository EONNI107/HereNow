'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchForm from '../MainPage/search/SearchForm';

function LayoutHeader() {
  const [isBackground, setIsBackground] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const searchParams = params.get('q');
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
    <header className="fixed z-10 right-0 max-w-[400px] w-full left-0 mx-auto">
      {isBackground ? (
        <div className="flex justify-center items-center bg-[#fff]">
          <SearchForm setIsbg={setIsBackground} />
          <button className="" onClick={() => setIsBackground(!isBackground)}>
            x
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-between items-center h-[40px]">
          <button onClick={handleBack}>
            <Image
              src="/chevron-left.png"
              alt="뒤로가기"
              width={30}
              height={30}
            />
          </button>

          {searchParams ? (
            <p>{searchParams}</p>
          ) : (
            <p className="font-['양진체'] text-[#118DFF] text-xl">여기,어때</p>
          )}

          <button onClick={handleShow}>
            <Image src="/search.png" alt="검색아이콘" width={20} height={20} />
          </button>
        </div>
      )}
    </header>
  );
}
export default LayoutHeader;
