'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useSearchStore } from './searchStore';
import { useRouter } from 'next/navigation';

function WebRecentSearch() {
  const router = useRouter();

  const { storgeData, removeFromStorage, setIsbg } = useSearchStore();

  const handleClose = (i: string) => {
    removeFromStorage(i);
  };

  const originalData = storgeData.filter(
    (item, index, arr) => arr.indexOf(item) === index,
  );

  const handleMoveClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    router.push(`/search-page?q=${target.innerHTML}`);
    setIsbg(false);
  };
  return (
    <div className="w-full h-screen fixed top-[78px] pt-[70px] px-[340px] bg-gray-500">
      <div className="w-[1240px] flex flex-col gap-12">
        <div className="flex justify-between">
          <p className="text-[32px]">최근검색어</p>
          <button onClick={() => setIsbg(false)}>
            <XMarkIcon className="w-10 h-10" />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap justify-start">
          {originalData.map((item, index) => {
            if (item === '') {
              return null;
            }
            return (
              <div
                key={index}
                className="flex border-[2px] rounded-2xl px-3 py-1 mb-1 gap-2 hover:border-blue4 hover:bg-blue0 hover:text-main"
              >
                <li
                  className="list-none cursor-pointer "
                  onClick={handleMoveClick}
                >
                  {item}
                </li>
                <button onClick={() => handleClose(item)}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WebRecentSearch;
