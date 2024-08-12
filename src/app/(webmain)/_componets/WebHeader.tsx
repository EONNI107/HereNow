'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useEffect } from 'react';
import { useSearchStore } from './searchStore';
import WebRecentSearch from './WebRecentSearch';
import { useRouter } from 'next/navigation';

function WebHeader() {
  const router = useRouter();

  const {
    setIsbg,
    isbg,
    inputValue,
    setInputValue,
    initializeStorage,
    addToStorage,
  } = useSearchStore();
  useEffect(() => {
    initializeStorage();
  }, [initializeStorage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    router.push(`/search-page?q=${inputValue}`);
    setIsbg(false);
    addToStorage();
    setInputValue('');
  };
  return (
    <div className="w-full py-4 px-[314px] flex justify-center fixed right-0 left-0 mx-auto z-10 box-shadow bg-[#fff]">
      <div className="flex gap-x-[90px] min-w-[1293px] h-[46px]">
        <div className="grow-0 font-medium text-[36px] flex justify-center items-center">
          <p className="font-[양진체] text-blue4">지금,여기</p>
        </div>
        <form
          onClick={() => setIsbg(true)}
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
          className="grow py-3.5 px-6 rounded-3xl bg-[#ecedef] flex justify-between gap-[240px]"
        >
          <input
            type="text"
            placeholder="검색창"
            className="w-full bg-[#ecedef] h-[18px]"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button>
            <MagnifyingGlassIcon className="w-4 h-4 text-gray8" />
          </button>
        </form>
        <div className="grow-0 flex justify-center items-center">
          <button className="py-2 px-4 bg-orange3 rounded-lg text-base font-semibold leading-[150%] text-gray0">
            시작하기
          </button>
        </div>
      </div>
      {isbg && <WebRecentSearch />}
    </div>
  );
}

export default WebHeader;
