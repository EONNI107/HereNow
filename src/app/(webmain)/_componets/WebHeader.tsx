import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

function WebHeader() {
  return (
    <div className="w-full flex justify-center items-center py-4 px-[340px]">
      <div className="flex gap-x-[90px] w-[1240px]">
        <div className="grow-0 font-medium text-4xl flex justify-center items-center">
          지금,여기
        </div>
        <div className="grow relative py-3.5 px-6 rounded-3xl bg-[#F2F1FA]">
          <input
            type="text"
            placeholder="검색창"
            className="w-full bg-[#F2F1FA]"
          />
          <button className="absolute top-4 right-5 w-4 h-4 ">
            <MagnifyingGlassIcon className="w-full h-full" />
          </button>
        </div>
        <div className="grow-0 flex justify-center items-center">
          <button className="py-2 px-4 bg-[#CACACA]">시작하기</button>
        </div>
      </div>
    </div>
  );
}

export default WebHeader;
