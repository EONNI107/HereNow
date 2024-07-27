'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import SearchForm from '../MainPage/search/SearchForm';

export default function LayoutHeader() {
  const [isbg, setIsbg] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleback = () => {
    if (pathname === '/') {
      return;
    }
    router.back();
  };
  const handleShow = () => {
    setIsbg(!isbg);
  };
  return (
    <header className="fixed z-10 right-0 max-w-[400px] w-full left-0 mx-auto">
      {isbg ? (
        <div className="flex justify-center items-center bg-[#fff]">
          <SearchForm setIsbg={setIsbg} />
          <button className="" onClick={() => setIsbg(!isbg)}>
            x
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-between h-[29px]">
          <button onClick={handleback}>
            <Image
              src="/chevron-left.png"
              alt="뒤로가기"
              width={30}
              height={30}
            />
          </button>
          <h1>지금,여기</h1>
          <button onClick={handleShow}>
            <Image src="/search.png" alt="검색아이콘" width={20} height={20} />
          </button>
        </div>
      )}
    </header>
  );
}
